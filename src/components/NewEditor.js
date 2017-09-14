import React from 'react'
// import brace from 'brace'
import { Redirect } from 'react-router-dom'
import AceEditor from 'react-ace'
import SelectLanguage from './SelectLanguage'
import { Grid, Segment, Container, Input, Button } from 'semantic-ui-react'
import { APIURL, FSP } from './PageAssets'


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

class NewEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      content: '',
      language: 'ruby',
      recordId: '',
      owner_id: this.props.auth.user.id,
      redirect: false
    }
  }

  componentWillMount() {
    this.props.redirectReset()
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
  }

  updateLanguage = (newLanguage) => {
    this.setState({
      language: newLanguage
    })
  }

  componentWillUnmount() {
    this.props.resetRecord()
    this.newRecord()
  }

  newRecord = (event) => {
    this.setState({
      name: '',
      content: '## Code',
      language: 'ruby',
      recordId: '',
      redirect: false
    })
  }

  handleNewSubmit = (event) => {
    const options = {
      "method": "post",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(this.state)
    }
    fetch(`${APIURL()}/records`, options)
      .then(resp => resp.json())
      .then(json => this.setState({
        recordId: json.record.id,
        redirect: true
      }))
  }

  render() {
    return(
      <div className="newEditor">
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
            <Grid.Column width={4}>
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
                  <Button.Group>
                    <Button color='grey' basic animated='fade' width="50%" onClick={this.newRecord}>
                      <Button.Content visible>
                        Clear All
                      </Button.Content>
                      <Button.Content hidden>
                        No undo!
                      </Button.Content>
                    </Button>
                    <Button.Or/>
                    <Button color='blue' basic animated='fade' width="50%" onClick={this.handleNewSubmit}>
                      <Button.Content visible>
                        Save as New File
                      </Button.Content>
                      <Button.Content hidden>
                        {this.state.name}
                      </Button.Content>
                    </Button>
                  </Button.Group>
                  <FSP/><FSP/><FSP/><FSP/><FSP/><FSP/><br/><br/><br/>
                </Container>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
          {this.state.redirect === true && <Redirect to={`/editor/${this.state.recordId}`} />}
      </div>
    )
  }
}

export default NewEditor
