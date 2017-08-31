import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

class TextEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = (editorState) => this.setState({editorState}, () => {console.log(this.state.editorState)})
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  render() {
    return(
      <Editor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} />
    )
  }
}

export default TextEditor