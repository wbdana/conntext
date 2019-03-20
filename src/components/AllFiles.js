import React from 'react'
import { List, Input } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP } from './PageAssets'
import AddPartnerForm from './AddPartnerForm'

class AllFiles extends React.Component {
  state = {
    records: [],
    recordsUsers: [],
    search: ''
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

  grabAllFiles = () => {
    const options = {
      "method": "get",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/records`, options)
      .then(resp => resp.json())
      .then(json => {this.setState({
        records: [...json.records],
        recordsUsers: [...json.records_users]
      })})
  }

  componentDidMount(){
    this.grabAllFiles()
  }

  updateSearch = (event, data) => {
    this.setState({
      search: data.value
    })
  }

  render(){
    return(
      <div className='allFiles'>
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
                    <List.Header  id={file.id}>{file.name}</List.Header>
                    <List.Description>
                      Last updated {file.updated_at}
                    </List.Description>
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

export default AllFiles
