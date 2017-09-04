import React from 'react'
import { List, Image, Input, Card } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP, FSP } from './PageAssets'

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
      }, console.log(this.state)))
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
        <TSP />
        <Input
          placeholder='Search users...'
          onChange={this.updateSearch}
          value={this.state.search}
        />
        <TSP />
        <Card.Group itemsPerRow={9}>
        {this.state.users.filter( user => {return user.email.includes(this.state.search)}).map( (user, index) => {
          return(
            <Card key={index}>
              <NavLink to={`users/${user.id}`}>
                <Image src={user.profile_image_url} size='small' />
                <Card.Content>
                  <Card.Header>
                    {user.email}
                  </Card.Header>
                </Card.Content>
              </NavLink>
            </Card>
          )
        })}
        </Card.Group>
      </div>
    )
  }
}

export default UserDirectory
