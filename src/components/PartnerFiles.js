import React from 'react'
import { Container, List, Input, Grid } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP } from './PageAssets'

class PartnerFiles extends React.Component {
  state = {
    records: [],
    search: '',
    userId: ''
  }

  addPartner = (partnerName, fileId) => {
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
  }

  grabPartnerFiles = (props) => {
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

  render(){
    return(
      <div className='partnerFiles'>
        <Container>
        <TSP />
        <Input
          fluid
          placeholder='Search files...'
          onChange={this.updateSearch}
          value={this.state.search}
        />
        <TSP />
          <List divided relaxed link>
            {this.state.records.filter(file => {return file.name.includes(this.state.search)}).map( (file, index) => {
              return(
                <List.Item key={index}>
                  <Grid>
                    <Grid.Row verticalAlign="middle">
                      <Grid.Column width={1}>
                        <NavLink to={`/editor/${file.id}`}>
                          <List.Icon name='github' size='huge' verticalAlign='middle' floated="center" />
                        </NavLink>
                      </Grid.Column>
                      <Grid.Column width={15}>
                        <NavLink to={`/editor/${file.id}`}>
                          <List.Content floated="left" >
                            <List.Header  id={file.id}>{file.name}</List.Header>
                            <List.Description>Last updated {file.updated_at}</List.Description>
                          </List.Content>
                        </NavLink>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </List.Item>
              )
            })}
          </List>
        </Container>
      </div>
    )
  }

}

export default PartnerFiles
