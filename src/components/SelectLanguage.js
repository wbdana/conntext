import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class SelectLanguage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: this.props.language
    }
  }

  updateLanguage = (event, data) => {
    this.setState({
      language: data.value
    })
    this.props.updateLanguage(data.value)
  }

  languagePlaceholder = () => {
    if (this.props.language !== "") {
      switch (this.props.language) {
        case 'ruby':
          return 'Ruby'
        case 'javascript':
          return 'JavaScript'
        case 'python':
          return 'Python'
        case 'csharp':
          return 'C#'
        case 'xml':
          return 'XML'
        case 'markdown':
          return 'MarkDown'
        case 'css':
          return 'CSS'
        case 'html':
          return 'HTML'
        default:
          return '.??'
      }
    } else {
      return 'Select Language (Currently Ruby)'
    }

  }

  render() {
    const languageOptions = [
          { key: 'Ruby', text: 'Ruby', value: 'ruby' },
          { key: 'JavaScript', text: 'JavaScript', value: 'javascript' },
          { key: 'Python', text: 'Python', value: 'python' },
          { key: 'C#', text: 'C#', value: 'csharp' },
          { key: 'XML', text: 'XML', value: 'xml' },
          { key: 'MySQL', text: 'MySQL', value: 'mysql' },
          { key: 'Markdown', text: 'Markdown', value: 'markdown' },
          { key: 'CSS', text: 'CSS', value: 'css' },
          { key: 'HTML', text: 'HTML', value: 'html' }
    ]
    return(
      <div className="SelectLanguageDropdown">
        <br/>
        <Dropdown
          onChange={this.updateLanguage}
          button
          className='icon'
          fluid
          selection
          labeled
          icon='world'
          options={languageOptions}
          placeholder={this.languagePlaceholder()}
        />
      </div>
    )
  }
}

export default SelectLanguage
