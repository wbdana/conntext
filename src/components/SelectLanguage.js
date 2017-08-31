import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class SelectLanguage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: this.props.mode
    }
  }

  updateMode = (event, data) => {
    this.setState({
      mode: data.value
    })
    this.props.updateMode(data.value)
  }

  render() {
    const languageOptions = [
          { key: 'Ruby', text: 'Ruby', value: 'ruby' },
          { key: 'JavaScript', text: 'JavaScript', value: 'javascript' },
          { key: 'Python', text: 'Python', value: 'python' },
          { key: 'Django', text: 'Django', value: 'django' },
          { key: 'SQL', text: 'SQL', value: 'sql' },
          { key: 'Markdown', text: 'Markdown', value: 'markdown' },
          { key: 'Brainfuck', text: 'Brainfuck', value: 'brainfuck' }
    ]
    return(
      <div className="SelectLanguageDropdown">
        <br/>
        <Dropdown
          onChange={this.updateMode}
          button
          className='icon'
          fluid
          selection
          labeled
          icon='world'
          options={languageOptions}
          placeholder='Ruby'
        />
      </div>
    )
  }
}

export default SelectLanguage
