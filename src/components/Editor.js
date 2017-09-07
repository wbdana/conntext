import React from 'react'
// import brace from 'brace'
import AceEditor from 'react-ace'
import SelectLanguage from './SelectLanguage'
import RecordCable from './RecordCable'
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
      owner_id: ''
    }
  }

  manualFetch = () => {
    console.log('manualFetch')
    fetch(`${APIURL()}/records/${window.location.href.match(/\d+$/)[0]}`)
      .then(resp => resp.json())
      .then(json => {this.setState({
        name: json.name,
        content: json.content,
        language: json.language,
        recordId: json.id,
        owner_id: json.owner_id
      }
    )})
  }

  componentWillMount() {
    console.log('WillMount!')
    this.manualFetch()
    this.props.redirectReset()
  }

  componentWillUnmount(){
    this.props.resetRecord()
    this.setState({
      name: '',
      content: '',
      language: '',
      recordId: ''
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
  }

  broadcast = () => {
    const options = {
      "method": "get",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        name: this.state.name,
        content: this.state.content,
        language: this.state.language,
        recordId: this.state.recordId
      })
    }
    console.log(`${APIURL()}/records/${this.state.recordId}/broadcast`, options)
    fetch(`${APIURL()}/records/${this.state.recordId}/broadcast`, options)
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  updateLanguage = (newLanguage) => {
    this.setState({
      language: newLanguage
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
      .then(json => this.setState({
        name: json.name,
        content: json.content,
        language: json.language,
        recordId: json.id
      }))
  }

  showUpdateButton = () => {
    if (this.state.recordId !== '') {
      return(
        <Button animated='fade' width="50%" onClick={this.handleUpdateSubmit}>
          <Button.Content visible>
            Update Saved File
          </Button.Content>
          <Button.Content hidden>
            {this.state.name + this.getFileExtension()}
          </Button.Content>
        </Button>
      )
    }
  }

  updateWSContent = (record) => {
    console.log(record)
    this.setState({
      content: record.content
    })
  }

  render() {
    console.log('Rendering!')
    console.log(this.state.content)
    return(
      <div className="Editor">

        <RecordCable
          data-cableApp={this.props['data-cableApp']}
          data-recordId={this.props.activeRecord.recordId}
          updateWSContent={this.updateWSContent}
        />

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

        <Button animated='fade' width="50%" onClick={this.newRecord}>
          <Button.Content visible>
            New File
          </Button.Content>
          <Button.Content hidden>
            Did you save your changes?
          </Button.Content>
        </Button>

        <Button animated='fade' width="50%" onClick={this.handleNewSubmit}>
          <Button.Content visible>
            Save as New File
          </Button.Content>
          <Button.Content hidden>
            {this.state.name + this.getFileExtension()}
          </Button.Content>
        </Button>

        <Button animated='fade' width="50%" onClick={this.handleUpdateSubmit}>
          <Button.Content visible>
            Update Saved File
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
          defaultValue={this.state.content}
          value={this.state.content}
          editorProps={{$blockScrolling: Infinity}}
          keyboardHandler="vim"
          width="50%"
        />
      </div>
    )
  }
}

export default Editor
