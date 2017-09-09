import React from 'react'
import { Container, List, Input } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP } from './PageAssets'
import AddPartnerForm from './AddPartnerForm'
import DeleteRecordButton from './DeleteRecordButton'

class SavedFiles extends React.Component {
  state = {
    records: [],
    search: '',
    userId: ''
  }

  grabSavedFiles = (props) => {
    this.setState({
      userId: this.props.auth.user.id
    })
    const options = {
      "method": "get",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/users/${this.props.auth.user.id}/created_records`, options)
      .then(resp => resp.json())
      .then(json => this.setState({
        records: [...json]
      }))
  }

  deleteRecord = (fileId) => {
    const options = {
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/records/${fileId}`, options)
      .then(resp => resp.json())
      .then(json => this.grabSavedFiles())
  }

  componentDidMount(){
    this.grabSavedFiles()
  }

  updateSearch = (event, data) => {
    this.setState({
      search: data.value
    })
  }

  render(){
    return(
      <div className='savedFiles'>
        <Container>
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
                      <List.Description>Last updated {file.updated_at}</List.Description>
                    </List.Content>
                  </NavLink>
                  <DeleteRecordButton recordId={file.id} deleteRecord={this.deleteRecord} />
                </List.Item>
              )
            })}
          </List>
        </Container>
      </div>
    )
  }
}

export default SavedFiles
