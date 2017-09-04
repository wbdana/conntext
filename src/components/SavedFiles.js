import React from 'react'
import { List, Input, Button } from 'semantic-ui-react'
import { Redirect, Link, NavLink } from 'react-router-dom'
import { APIURL, TSP, FSP } from './PageAssets'

class SavedFiles extends React.Component {
  state = {
    records: [],
    recordsUsers: [],
    search: '',
    userId: ''
  }

  grabSavedFiles = (props) => {
    console.log(this.props.auth.user.id)
    this.setState({
      userId: this.props.auth.user.id
    })
    const userId = this.props.auth.user.id
    const options = {
      "method": "get",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/users/${this.state.userId}/created_records`, options)
      .then(resp => resp.json())
      .then(json => console.log(json))
      // .then(json => {this.setState({
      //   records: [...json.records],
      //   recordsUsers: [...json.records_users]
      // })})
  }

  componentDidMount(){
    this.grabSavedFiles()
  }

  updateSearch = (event, data) => {
    this.setState({
      search: data.value
    })
  }

  getFileExtension = (file) => {
    switch (file.language) {
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

  render(){
    return(
      <div className='savedFiles'>
        <TSP />
        <Input
          placeholder='Search records...'
          onChange={this.updateSearch}
          value={this.state.search}
        />
        <TSP />
        <List divided relaxed link>
          <Button onClick={this.grabSavedFiles} />
          {this.state.records.filter(file => {return file.name.includes(this.state.search)}).map( (file, index) => {
            return(
              <List.Item key={index}>
                <NavLink to={`/editor/${file.id}`}>
                  <List.Icon name='github' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header  id={file.id}>{`${file.name}${this.getFileExtension(file)}`}</List.Header>
                    <List.Description>Last updated {file.updated_at}</List.Description>
                  </List.Content>
                </NavLink>
              </List.Item>
            )
          })}
        </List>
      </div>
    )
  }

}

export default SavedFiles
