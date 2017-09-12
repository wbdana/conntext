import React from 'react'
import { Container, List, Image, Grid, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP } from './PageAssets'
import UserCable from './UserCable'

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
      }))
  }

  componentDidMount(){
    this.grabUserData()
  }

  render() {
    return(
      <div className="homepage">
        <Container>
          <TSP/>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={4}>
                <Image src={this.state.user.profile_image_url} />
              </Grid.Column>
              <Grid.Column width={6}>
                <TSP/>
                <Header size='medium'>Welcome to Connected Text, {this.state.user.email}</Header>
                <List divided relaxed link>
                {this.state.createdRecords.map((file, index)=>{
                  return(
                    <List.Item key={index}>
                      <NavLink to={`editor/${file.id}`}>
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                          <List.Header>
                            {file.name}
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
                <Header size='medium'></Header>
                <Header size='small'>Shared Files</Header>
                <List divided relaxed link>
                {this.state.partnerRecords.map((file, index)=>{
                  return(
                    <List.Item key={index}>
                      <NavLink to={`editor/${file.id}`}>
                        <List.Icon name='github' size='large' verticalAlign='middle' />
                        <List.Content>
                          <List.Header>
                            {file.name}
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
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default Home
