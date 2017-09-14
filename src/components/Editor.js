import React from 'react'
import AceEditor from 'react-ace'
import { Redirect, NavLink } from 'react-router-dom'
import SelectLanguage from './SelectLanguage'
import RecordCable from './RecordCable'
import Messages from './Messages'
import AddPartnerForm from './AddPartnerForm'
import DeletePartnerButton from './DeletePartnerButton'
import { Container, Form, Grid, Icon, Input, Button, Segment, Card, Image } from 'semantic-ui-react'
import { APIURL } from './PageAssets'


// Import syntax highlights
import 'brace/mode/javascript'
import 'brace/mode/ruby'
import 'brace/mode/python'
import 'brace/mode/mysql'
import 'brace/mode/markdown'
import 'brace/mode/css'
import 'brace/mode/html'
import 'brace/mode/xml'
import 'brace/mode/csharp'


// Import themes
import 'brace/theme/github'
import 'brace/theme/terminal'
import 'brace/theme/solarized_dark'
import 'brace/theme/solarized_light'
import 'brace/theme/twilight'

class Editor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      content: '',
      language: 'ruby',
      recordId: '',
      owner_id: '',
      openCable: false,
      messages: [],
      inputContent: '',
      userId: this.props.auth.user.id,
      redirect: false,
      openAddPartner: false,
      partners: [],
      owner: {},
      renderUsers: false
    }
  }

  manualFetch = () => {
    fetch(`${APIURL()}/records/${window.location.href.match(/\d+$/)[0]}`)
      .then(resp => resp.json())
      .then(json => {this.setState({
        name: json.record.name,
        content: json.record.content,
        language: json.record.language,
        recordId: json.record.id,
        owner_id: json.record.owner_id,
        openCable: true,
        messages: json.messages,
        openAddPartner: true,
        partners: [...json.partners]
      }); return json})
      .then(json => {this.fetchOwner()})
  }

  fetchOwner = () => {
    fetch(`${APIURL()}/users/${this.state.owner_id}`)
      .then(resp => resp.json())
      .then(json => {this.setState({
        owner: json.user,
        renderUsers: true
      }, ()=>{setTimeout(console.log(this.state), 1500)})})
  }

  componentWillMount() {
    this.manualFetch()
    this.props.redirectReset()
  }

  componentWillUnmount(){
    this.props.resetRecord()
    this.setState({
      name: '',
      content: '',
      language: '',
      recordId: '',
      openCable: false,
      redirect: false,
      messages: []
    })
  }

  updateName = (event, data) => {
    this.setState({
      name: data.value
    })
  }

  updateContent = (newContent) => {
    this.setState({
      content: newContent
    })
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this._timeout = setTimeout(()=>{
      this._timeout = null;
      this.handleUpdateSubmit()
    }, 750)
  }

  updateLanguage = (newLanguage) => {
    this.setState({
      language: newLanguage
    })
  }

  // Redirect here is not working properly because Editor does not
  // unmount; temporarily re-routing redirect to /myfiles
  handleNewSubmit = (event) => {
    const obj = Object.assign({}, this.state, {owner_id: this.props.auth.user.id})
    const options = {
      "method": "post",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(obj)
    }
    fetch(`${APIURL()}/records`, options)
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        this.setState({
        name: json.record.name,
        language: json.record.language,
        owner_id: json.record.owner_id,
        messages: [],
        recordId: json.record.id,
        redirect: true
      })
    })
  }


  handleUpdateSubmit = () => {
    const updateState = {
      name: this.state.name,
      content: this.state.content,
      language: this.state.language,
      recordId: this.state.recordId
    }
    const options = {
      "method": "PATCH",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(updateState)
    }
    fetch(`${APIURL()}/records/${this.state.recordId}`, options)
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  updateWSContent = (data) => {
    this.setState({
      name: data.record.name,
      content: data.record.content,
      language: data.record.language,
      recordId: data.record.id,
      owner_id: data.record.owner_id,
      messages: [...data.messages],
      partners: [...data.partners]
    })
  }

  updateInputContent = (event, data) => {
    this.setState({
      inputContent: data.value
    })
  }

  sendMessage = () => {
    if (this.state.inputContent !== "") {
      const body = {
        record_id: this.state.recordId,
        content: this.state.inputContent,
        user_id: this.state.userId
      }
      const options = {
        "method": "post",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        },
        "body": JSON.stringify(body)
      }
      fetch(`${APIURL()}/messages`, options)
        .then(resp => resp.json())
        .then(json => this.setState({
          inputContent: ''
        }, console.log('Message sent!')))
    }
  }

  addPartner = (partnerName, fileId) => {
    const obj = {user_email: partnerName, file_id: fileId}
    const options = {
      "method": "post",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": localStorage.getItem('jwt')
      },
      "body": JSON.stringify(obj)
    }
    fetch(`${APIURL()}/records_users`, options)
      .then(resp => resp.json())
      .then(json => {
        if (json.status === 500) {
          alert('Could not find that user. Check the User Directory to confirm spelling!')
        } else {
          console.log(json)
        }
      })
      .catch(err => {alert('That user is already a collaborator on this file!')})
  }

  deletePartner = (userId, recordId) => {
    const obj = {user_id: userId, record_id: recordId}
    const options = {
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",
        "Authorization": localStorage.getItem('jwt')
      },
      "body": JSON.stringify(obj)
    }
    console.log(options)
    console.log(`${APIURL()}/records_users`)
    fetch(`${APIURL()}/records_users`, options)
      // .then(resp => resp.json())
      .then(json => {
        if (json.status === 500) {
          alert('Could not remove partner from this record.')
        } else {
          console.log(json)
        }
      })
  }

  render() {
    return(
      <div className="Editor">
        <Grid celled stretched>
          <Grid.Row>
            <Grid.Column width={12}>
              <AceEditor
                mode={this.state.language}
                theme="solarized_dark"
                onChange={this.updateContent}
                name="AceEditor"
                value={this.state.content}
                editorProps={{$blockScrolling: Infinity}}
                keyboardHandler="vim"
                width="100%"
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  behavioursEnabled: true,
                  wrapBehavioursEnabled: true,
                  autoScrollEditorIntoView: true
                }}
              />
            </Grid.Column>
            <Grid.Column className="scroller" width={4}>
              <Segment className="options">
                <Container>
                  <SelectLanguage
                    updateLanguage={this.updateLanguage}
                    language={this.state.language}
                  />

                  <br/>

                  <Input
                    placeholder='File name...' onChange={this.updateName} value={this.state.name}
                    fluid
                  />

                  <br/>

                  <Button color='blue' basic fluid animated='fade' width="50%" onClick={this.handleNewSubmit}>
                    <Button.Content visible>
                      <Icon name='fork' />Save as New File
                    </Button.Content>
                    <Button.Content hidden>
                      {this.state.name}
                    </Button.Content>
                  </Button>

                  <br/>

                  {this.state.openAddPartner === true && <div className="AddPartnerForm">
                    <AddPartnerForm fileId={this.state.recordId} addPartner={this.addPartner} />
                  </div>}

                </Container>
              </Segment>
              <Segment className="chatbox">
                <Container className="chatbox scroller">
                  <Messages messages={this.state.messages} />
                </Container>
                <Container id='messageform'>
                  <Form onSubmit={this.sendMessage}>
                    <Form.Input
                      onChange={this.updateInputContent}
                      value={this.state.inputContent}
                      action={<Button
                                color='blue'
                                basic
                                animated='fade'
                                size='small'
                                >
                                  <Button.Content visible>
                                    <Icon name='write' />Send
                                  </Button.Content>
                                  <Button.Content hidden>
                                    <Icon name='mail outline' />Send
                                  </Button.Content>
                                </Button>
                              } />
                  </Form>
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Card.Group itemsPerRow={7}>
                {this.state.renderUsers === true && <Card>
                  <NavLink to={`/users/${this.state.owner_id}`} exact>
                    <Image src={this.state.owner.profile_image_url} size='large' />
                    <Card.Content>
                      <Card.Header size='medium'>
                        Owner: {this.state.owner.email}
                      </Card.Header>
                    </Card.Content>
                  </NavLink>
                </Card>}
                {this.state.partners.map( (user, index) => {
                  return(
                    <Card key={index}>
                      <NavLink to={`/users/${user.id}`} exact>
                        <Image src={user.profile_image_url} size='large' />
                        <Card.Content>
                          <Card.Header size='medium'>
                            {user.email}
                          </Card.Header>
                        </Card.Content>
                      </NavLink>
                        <Card.Description>
                          <DeletePartnerButton recordId={this.state.recordId} userId={user.id} deletePartner={this.deletePartner} />
                        </Card.Description>
                    </Card>
                  )
                })}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>

          {this.state.redirect === true && <Redirect to={`/myfiles`} exact/>}

          {(this.state.openCable === true) && <RecordCable
            data-cableApp={this.props['data-cableApp']}
            data-recordId={this.props.activeRecord.recordId}
            updateWSContent={this.updateWSContent}
          />}

      </div>
    )
  }
}

export default Editor
