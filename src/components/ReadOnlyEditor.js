import React from 'react'
import AceEditor from 'react-ace'
import { Redirect, NavLink } from 'react-router-dom'
import SelectLanguage from './SelectLanguage'
import RecordCable from './RecordCable'
import Messages from './Messages'
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

class ReadOnlyEditor extends React.Component {
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
      renderUsers: false,
      failsafe: false
    }
  }

  manualFetch = () => {
    if (window.location.href.match(/\d+$/)) {
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
    } else {
      alert('Invalid route!')
      this.setState({
        failsafe: true
      })
    }
  }

  fetchOwner = () => {
    fetch(`${APIURL()}/users/${this.state.owner_id}`)
      .then(resp => resp.json())
      .then(json => {this.setState({
        owner: json.user,
        renderUsers: true
      }, ()=>{setTimeout(console.log(this.state), 1500)})})
  }

  componentDidMount() {
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
      .then(json => this.setState({
        recordId: json.record.id,
        redirect: true
      }))
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
                  autoScrollEditorIntoView: true,
                  readOnly: true
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

                  <br/>

                  <Button color='blue' basic fluid animated='fade' width="50%" onClick={this.handleNewSubmit}>
                    <Button.Content visible>
                      <Icon name='fork' />Save as New File
                    </Button.Content>
                    <Button.Content hidden>
                      {this.state.name}
                    </Button.Content>
                  </Button>

                </Container>
              </Segment>
              <Segment className="chatbox">
                <Container className="chatbox scroller">
                  <Messages messages={this.state.messages} />
                </Container>
                <Form onSubmit={this.sendMessage}>
                  <Form.Input onChange={this.updateInputContent} value={this.state.inputContent} type='text' />
                  <Form.Input type='submit' value='Send message' />
                </Form>
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
                    </Card>
                  )
                })}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>

          {this.state.redirect === true && <Redirect to={`/editor/${this.state.recordId}`} />}

          {(this.state.openCable === true) && <RecordCable
            data-cableApp={this.props['data-cableApp']}
            data-recordId={this.props.activeRecord.recordId}
            updateWSContent={this.updateWSContent}
          />}

          {this.state.failsafe === true && <Redirect to="/home" exact />}

      </div>
    )
  }
}

export default ReadOnlyEditor
