import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import SelectLanguage from './SelectLanguage'
import { Input, Button, Icon } from 'semantic-ui-react'


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
    language: 'ruby'
  }

  updateName = (event, data) => {
    this.setState({
      name: data.value
    }, ()=>{console.log(data.value, this.state.name)})
  }

  updateContent = (newContent) => {
    this.setState({
      content: newContent
    }, ()=>{console.log(this.state.content)})
  }

  updateLanguage = (newLanguage) => {
    this.setState({
      language: newLanguage
    }, ()=>{console.log(this.state.language)})
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

  render() {
    return(
      <div className="Editor">

        <SelectLanguage
          updateLanguage={this.updateLanguage}
          language={this.state.language}
        />

        <br/>

        <Input placeholder='File name...' onChange={this.updateName} value={this.state.name} />

        <Button animated='fade'>
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
          theme="solarized_dark"
          onChange={this.updateContent}
          name="AceEditor"
          value={this.state.content}
          editorProps={{$blockScrolling: true}}
          keyboardHandler="vim"
          width="100%;"
          height="auto;"
        />
      </div>
    )
  }
}

export default Editor
