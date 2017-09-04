import React from 'react'
import { Image, Grid, Header, List } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP, FSP } from './PageAssets'

class UserShowPage extends React.Component {
  state = {
    user: {},
    createdRecords: [],
    partnerRecords: []
  }

  grabUserData = (props) => {
    const options = {
      "method": "get",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/users/${window.location.href.match(/\d+$/)[0]}`, options)
      .then(resp => resp.json())
      .then(json => this.setState({
        user: json.user,
        createdRecords: json.created_records,
        partnerRecords: json.partner_records
      }, ()=>{console.log(this.state)}))
  }

  componentWillMount(){
    this.grabUserData()
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

  render() {
    return(
      <div className="userShowPage">
        <Grid>
          <Grid.Column width={4}>
            <Image src={this.state.user.profile_image_url} />
          </Grid.Column>
          <Grid.Column width={6}>
            <TSP/>
            <Header size='medium'>{this.state.user.email}</Header>
            <Header size='small'>Created Files</Header>
              <List divided relaxed link>
                {this.state.createdRecords.map( (file, index) => {
                  <List.Item key={index}>
                    <NavLink to={`/editor/${file.id}`}>
                      <List.Icon name='github' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header  id={file.id}>{`${file.name}${this.getFileExtension(file)}`}</List.Header>
                        <List.Description>Last updated {file.updated_at}</List.Description>
                      </List.Content>
                    </NavLink>
                  </List.Item>
                })}
              </List>
          </Grid.Column>
          <Grid.Column width={6}>
            <FSP/>
            <Header size='small'>Partner Files</Header>
              <List divided relaxed link>
                {this.state.partnerRecords.map( (file, index) => {
                  <List.Item key={index}>
                    <NavLink to={`/editor/${file.id}`}>
                      <List.Icon name='github' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header  id={file.id}>{`${file.name}${this.getFileExtension(file)}`}</List.Header>
                        <List.Description>Last updated {file.updated_at}</List.Description>
                      </List.Content>
                    </NavLink>
                  </List.Item>
                })}
              </List>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}


export default UserShowPage
