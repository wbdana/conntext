import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import SelectLanguage from './SelectLanguage'


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
    code: '## Code',
    mode: 'ruby'
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode
    }, ()=>{console.log(this.state.code)})
  }

  updateMode = (newMode) => {
    this.setState({
      mode: newMode
    })
  }

  render() {
    return(
      <div className="Editor">
        <SelectLanguage
          updateMode={this.updateMode}
          mode={this.state.mode}
        />
        <br/>
        <AceEditor
          mode={this.state.mode}
          theme="solarized_dark"
          onChange={this.updateCode}
          name="AceEditor"
          value={this.state.code}
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
