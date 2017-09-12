import React from 'react'
import { Container, Image, Input, Card } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP } from './PageAssets'

class UserDirectory extends React.Component {
  state = {
    users: [],
    search: ''
  }

  grabUsers = () => {
    const options = {
      "method": "get",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/users`, options)
      .then(resp => resp.json())
      .then(json => this.setState({
        users: [...json]
      }))
  }

  componentDidMount() {
    this.grabUsers()
  }

  updateSearch = (event, data) => {
    this.setState({
      search: data.value
    })
  }

  render() {
    return(
      <div className='userDirectory'>
        <Container>
          <TSP />
          <Input
            fluid
            placeholder='Search users...'
            onChange={this.updateSearch}
            value={this.state.search}
          />
          <TSP />
          <Card.Group itemsPerRow={7}>
          {this.state.users.filter( user => {return user.email.toLowerCase().includes(this.state.search.toLowerCase())}).map( (user, index) => {
            return(
              <Card key={index}>
                <NavLink to={`users/${user.id}`}>
                  <Image src={user.profile_image_url} size='large' />
                  <Card.Content>
                    <Card.Header size='medium'>
                      {user.email}
                    </Card.Header>
                  </Card.Content>
                </NavLink>
              </Card>
            )
          })}
          </Card.Group>
        </Container>
      </div>
    )
  }
}

export default UserDirectory
