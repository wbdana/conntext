import React from 'react'
import { List, Image, Input } from 'semantic-ui-react'

class UserDirectory extends React.Component {
  state = {
    users: [],
    search: ''
  }

  grabUsers = () => {
    const options = {
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch('http://localhost:3000/api/v1/users', options)
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
    }, ()=>{console.log(this.state.search)})
  }

  listUsers = () => {
    this.state.users.map( user => {
      return(
        <List.Item>
          <Image src={user.profile_image_url} />
          <List.Content>
            <List.Header as='a'>{user.username}</List.Header>
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    return(
      <div className='userDirectory'>
        <Input
          placeholder='Search users...'
          onChange={this.updateSearch}
          value={this.state.search}
        />
        <List>
          {this.listUsers()}
        </List>
      </div>
    )
  }
}

export default UserDirectory
