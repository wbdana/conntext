import React from 'react'
import { List, Input, Button } from 'semantic-ui-react'
import { Redirect, Link, NavLink } from 'react-router-dom'
import { APIURL, TSP, FSP } from './PageAssets'
import AddPartnerForm from './AddPartnerForm'

class PartnerFiles extends React.Component {
  state = {
    records: [],
    search: '',
    userId: ''
  }

  addPartner = (partnerName, fileId) => {
    console.log(partnerName)
    console.log(fileId)
    const obj = {user_email: partnerName, file_id: fileId}
    const options = {
      "method": "post",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify(obj)
    }
    fetch(`${APIURL()}/records_users`, options)
      .then(resp => resp.json())
      .then(json => console.log(json))
    console.log(options)
    console.log(obj)
  }

  grabPartnerFiles = (props) => {
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
    fetch(`${APIURL()}/users/${this.props.auth.user.id}/partner_records`, options)
      .then(resp => resp.json())
      .then(json => this.setState({
        records: [...json]
      }))
  }

  componentDidMount(){
    this.grabPartnerFiles()
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
      <div className='partnerFiles'>
        <TSP />
        <Input
          placeholder='Search records...'
          onChange={this.updateSearch}
          value={this.state.search}
        />
        <TSP />
        <List divided relaxed link>
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
                <AddPartnerForm fileId={file.id} addPartner={this.addPartner} />
              </List.Item>
            )
          })}
        </List>
      </div>
    )
  }

}

export default PartnerFiles
