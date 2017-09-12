import React from 'react'
import { Container, Image, Input, Card } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP } from './PageAssets'
import DirectoryCable from './DirectoryCable'

class UserDirectory extends React.Component {
  state = {
    users: this.props.users,
    search: '',
    openCable: false
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
        users: [...json],
        openCable: true
      }, ()=>{this.props.initialUpdateUserDirectory([...json])}))
  }

  componentDidMount() {
    this.grabUsers()
  }

  updateSearch = (event, data) => {
    this.setState({
      search: data.value
    })
  }

  updateUserDirectory = (data) => {
    this.setState({
      users: [...data.users]
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
          <Card.Group itemsPerRow={4}>
          {this.state.users.filter( user => {return user.email.toLowerCase().includes(this.state.search.toLowerCase())}).map( (user, index) => {
            return(
              <Card key={index}>
                <NavLink to={`users/${user.id}`}>
                  <Image src={user.profile_image_url} size='large' />
                  <Card.Content>
                    <Card.Header size='medium' fluid>
                      {user.email}
                    </Card.Header>
                  </Card.Content>
                </NavLink>
              </Card>
            )
          })}
          </Card.Group>
        </Container>

        {this.state.openCable === true && <DirectoryCable data-cableApp={this.props['data-cableApp']} updateWSContent={this.props.updateWSContent} updateUserDirectory={this.updateUserDirectory} />}

      </div>
    )
  }
}

export default UserDirectory
