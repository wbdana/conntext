import React from 'react'
import CodeMirror from 'react-codemirror'
import SelectLanguage from './SelectLanguage'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/ruby/ruby'
import 'codemirror/mode/python/python'
import 'codemirror/mode/django/django'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/brainfuck/brainfuck'


class CodeBox extends React.Component {
  state = {
    code: '## Code',
    mode: 'ruby'
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode
    })
  }

  updateMode = (newMode) => {
    this.setState({
      mode: newMode
    })
  }

  render() {
    var options = {
      lineNumbers: true,
      mode: this.state.mode,
      preserveScrollPosition: true,
      autoSave: true,
      autoFocus: true,
      lineWrapping: true,
    }
    return(
      <div className="CodeBox">
        <SelectLanguage updateMode={this.updateMode} mode={this.state.mode} />
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
      </div>
    )
  }
}

export default CodeBox
