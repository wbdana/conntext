import React from 'react'
import { List } from 'semantic-ui-react'

class UserDirectory extends React.Component {
  state = {
    users: []
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
      .then(json => json.map( user => this.state.users.push(user)))
      .then(json => console.log(this.state.users))
  }

  componentDidMount() {
    this.grabUsers()
  }

  listUsers = () => {
    this.state.users.map( user => {
      return
    })
  }

  render() {
    return(
      <div />
    )
  }
}

export default UserDirectory
