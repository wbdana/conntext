import React from 'react'
import { List, Input } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { APIURL } from './PageAssets'

class AllFiles extends React.Component {
  state = {
    records: [],
    recordsUsers: [],
    search: ''
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
      // .then(json => console.log(json))
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

  handleClick = (event, data) => {
    const options = {
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/records/${event.target.id}`, options)
      .then(resp => resp.json())
      .then(json => {
        this.props.setActiveRecord(json)
      })
  }

  render(){
    return(
      <div className='allFiles'>
        <Input
          placeholder='Search records...'
          onChange={this.updateSearch}
          value={this.state.search}
        />
        <List divided relaxed link>
          {this.state.records.filter(file => {return file.name.includes(this.state.search)}).map( (file, index) => {
            return(
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a' onClick={this.handleClick} id={file.id}>{file.name}</List.Header>
                  <List.Description as='a'>Last updated {file.updated_at}</List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </div>
    )
  }

}

export default AllFiles
