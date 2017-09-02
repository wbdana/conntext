import React from 'react'
import { List, Image, Input, Card } from 'semantic-ui-react'
import { APIURL } from './PageAssets'

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


  // {this.state.users.filter( user => {return user.username.includes(this.state.search)}).map( (user, index) => {
  //   return(
  //     <Card key={index}>
  //       <Image src={user.profile_image_url} size='small' />
  //       <Card.Content>
  //         <Card.Header>
  //           {user.username}
  //         </Card.Header>
  //       </Card.Content>
  //     </Card>
  //   )
  // })}

  render() {
    return(
      <div className='userDirectory'>
        <br/>
        <Input
          placeholder='Search users...'
          onChange={this.updateSearch}
          value={this.state.search}
        />
        <br/><br/><br/>
        <Card.Group itemsPerRow={9}>
        {this.state.users.filter( user => {return user.username !== null} ).filter( user => {return user.username.includes(this.state.search)}).map( (user, index) => {
          return(
            <Card key={index}>
              <Image src={user.profile_image_url} size='small' />
              <Card.Content>
                <Card.Header>
                  {user.username}
                </Card.Header>
              </Card.Content>
            </Card>
          )
        })}
        </Card.Group>
      </div>
    )
  }
}

export default UserDirectory
