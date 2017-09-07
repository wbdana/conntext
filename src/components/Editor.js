import React from 'react'
// import brace from 'brace'
import AceEditor from 'react-ace'
import SelectLanguage from './SelectLanguage'
import RecordCable from './RecordCable'
import Messages from './Messages'
import { Input, Button } from 'semantic-ui-react'
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
      userId: this.props.auth.user.id
    }
  }

  manualFetch = () => {
    console.log('manualFetch')
    fetch(`${APIURL()}/records/${window.location.href.match(/\d+$/)[0]}`)
      .then(resp => resp.json())
      .then(json => {this.setState({
        name: json.record.name,
        content: json.record.content,
        language: json.record.language,
        recordId: json.record.id,
        owner_id: json.record.owner_id,
        openCable: true,
        messages: json.messages
      }
    )})
  }

  componentWillMount() {
    console.log('WillMount!')
    console.log(this.state)
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
      openCable: false
    })
  }

  getFileExtension = () => {
    switch (this.state.language) {
      case 'ruby':
        return '.rb'
      case 'javascript':
        return '.js'
      case 'python':
        return '.py'
      case 'csharp':
        return '.cs'
      case 'xml':
        return '.xml'
      case 'markdown':
        return '.md'
      case 'css':
        return '.css'
      case 'html':
        return '.html'
      default:
        return '.rb'
    }
  }

  updateName = (event, data) => {
    console.log(`Updating Name: ${data.value}`)
    this.setState({
      name: data.value
    })
  }

  updateContent = (newContent) => {
    this.setState({
      content: newContent
    })
    console.log(`Updating Content: ${this.state.content}`)
    this.handleUpdateSubmit()
  }

  updateLanguage = (newLanguage) => {
    console.log(`Updating Language: ${newLanguage}`)
    this.setState({
      language: newLanguage
    })
  }

  // This is a stupid button to have
  // in something that would ideally
  // auto-save any updates to an
  // already-saved file. Should remove
  // when RecordCable works properly
  newRecord = (event) => {
    this.setState({
      name: '',
      content: '## Code',
      language: 'ruby',
      recordId: ''
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
    console.log(`${APIURL()}/records`, options)
    fetch(`${APIURL()}/records`, options)
      .then(resp => resp.json())
      .then(json => console.log(json))
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
        "content-type":"application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(updateState)
    }
    fetch(`${APIURL()}/records/${this.state.recordId}`, options)
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  updateWSContent = (data) => {
    console.log(data)
    this.setState({
      name: data.record.name,
      content: data.record.content,
      language: data.record.language,
      recordId: data.record.id,
      owner_id: data.record.owner_id,
      messages: [...data.messages]
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
    console.log(body)
    console.log(options)
    fetch(`${APIURL()}/messages`, options)
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  render() {
    console.log('Rendering!')
    console.log(this.state.content)
    return(
      <div className="Editor">

        {(this.state.openCable === true) && <RecordCable
          data-cableApp={this.props['data-cableApp']}
          data-recordId={this.props.activeRecord.recordId}
          updateWSContent={this.updateWSContent}
        />}

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

        <Button animated='fade' width="50%" onClick={this.handleNewSubmit}>
          <Button.Content visible>
            Save as New File
          </Button.Content>
          <Button.Content hidden>
            {this.state.name + this.getFileExtension()}
          </Button.Content>
        </Button>

        <br/><br/>

        <AceEditor
          mode={this.state.language}
          theme="github"
          onChange={this.updateContent}
          name="AceEditor"
          value={this.state.content}
          editorProps={{$blockScrolling: Infinity}}
          keyboardHandler="vim"
          width="50%"
        />

        <div className="ChatBox">
          <Messages messages={this.state.messages} />
          <Input type='text' onChange={this.updateInputContent} />
          <Button onClick={this.sendMessage}>SEND</Button>
        </div>

      </div>
    )
  }
}

export default Editor
