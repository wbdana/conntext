import React from 'react'
import { List, Image, Grid, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP } from './PageAssets'

class Home extends React.Component {
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
    fetch(`${APIURL()}/users/${this.props.userId}`, options)
      .then(resp => resp.json())
      .then(json => this.setState({
        user: json.user,
        createdRecords: json.created_records,
        partnerRecords: json.partner_records
      }, ()=>{console.log(this.state)}))
  }

  componentDidMount(){
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
      <div className="home">
        <TSP/>
        <Grid>
          <Grid.Column width={4}>
            <Image src={this.state.user.profile_image_url} />
          </Grid.Column>
          <Grid.Column width={6}>
            <TSP/>
            <Header size='medium'>Welcome to Connected Text, {this.state.user.email}</Header>
            <Header size='small'>Created Files</Header>
            <List divided relaxed link>
            {this.state.createdRecords.map((file, index)=>{
              return(
                <List.Item key={index}>
                  <NavLink to={`editor/${file.id}`}>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                      <List.Header>
                        {`${file.name}${this.getFileExtension(file)}`}
                      </List.Header>
                      <List.Description>
                        Last updated {file.updated_at}
                      </List.Description>
                    </List.Content>
                  </NavLink>
                </List.Item>
              )
            })}
            </List>
          </Grid.Column>
          <Grid.Column width={6}>
            <TSP/>
            <Header size='medium'>Testing</Header>
            <Header size='small'>Partner Files</Header>
            <List divided relaxed link>
            {this.state.partnerRecords.map((file, index)=>{
              return(
                <List.Item key={index}>
                  <NavLink to={`editor/${file.id}`}>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                      <List.Header>
                        {`${file.name}${this.getFileExtension(file)}`}
                      </List.Header>
                      <List.Description>
                        Last updated {file.updated_at}
                      </List.Description>
                    </List.Content>
                  </NavLink>
                </List.Item>
              )
            })}
            </List>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Home
