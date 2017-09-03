import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import SelectLanguage from './SelectLanguage'
import { Input, Button, Icon } from 'semantic-ui-react'
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
  state = {
    name: '',
    content: '## Code',
    language: 'ruby',
    recordId: ''
  }

  propsCheck = () => {
    if (this.props.activeRecord) {
      this.setState({
        name: this.props.activeRecord.name,
        content: this.props.activeRecord.content,
        language: this.props.activeRecord.language,
        recordId: this.props.activeRecord.recordId
      })
    }
  }

  componentDidMount() {
    this.propsCheck()
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
        return '.??'
    }
  }

  handleSubmit = (event) => {
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

  render() {
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

        <Button animated='fade' fluid onClick={this.handleSubmit}>
          <Button.Content visible>
            Save File
          </Button.Content>
          <Button.Content hidden>
            {this.state.name + this.getFileExtension()}
          </Button.Content>
        </Button>

        <br/>

        <AceEditor
          mode={this.state.language}
          theme="github"
          onChange={this.updateContent}
          name="AceEditor"
          value={this.state.content}
          editorProps={{$blockScrolling: true}}
          keyboardHandler="vim"
          width="50%"
          height="80%;"
        />
      </div>
    )
  }
}

export default Editor
