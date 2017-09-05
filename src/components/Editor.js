import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import SelectLanguage from './SelectLanguage'
import { Input, Button, Icon } from 'semantic-ui-react'
import { APIURL, TSP, FSP } from './PageAssets'


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
  state = {
    name: this.props.activeRecord.name,
    content: this.props.activeRecord.content,
    language: this.props.activeRecord.language,
    recordId: this.props.activeRecord.recordId,
    owner_id: this.props.auth.user.id
  }

  propsCheck = () => {
    console.log('Props checking!')
    console.log(this.props)
    // this.setState({
    //   name: this.props.activeRecord.name,
    //   content: this.props.activeRecord.content,
    //   language: this.props.activeRecord.language,
    //   recordId: this.props.activeRecord.recordId
    // }, ()=>{
      if (this.state.recordId === "") {
        console.log('Fetching record!')
        this.props.getRecord(window.location.href.match(/\d+$/)[0])
      }

    // })
    console.log(this.state)
  }

  manualFetch = () => {
    fetch(`${APIURL()}/records/${window.location.href.match(/\d+$/)[0]}`)
      .then(resp => resp.json())
      .then(json => {this.setState({
        name: json.name,
        content: json.content,
        language: json.language,
        recordId: json.id
      }, ()=>{this.props.getRecord(this.state.recordId)})})
  }

  componentWillMount() {
    console.log('WillMounting!')
    if (window.location.href.match(/\d+$/)) {
      this.manualFetch()
    }
    // this.propsCheck()
    // console.log('Done with Props check!')
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

  handleUpdateSubmit = (event) => {
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

  render() {
    console.log('Rendering!')
    return(
      <div className="Editor">

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
          value={this.state.content}
          editorProps={{$blockScrolling: true}}
          keyboardHandler="vim"
          width="50%"
        />
      </div>
    )
  }
}

export default Editor
