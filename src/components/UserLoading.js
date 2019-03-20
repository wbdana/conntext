import React from 'react'
import { Header } from 'semantic-ui-react'

class UserLoading extends React.Component {


  componentDidMount(){
    this.props.grabViewUser()
  }

  render(){
    return(
      <div className="userLoading">
        <Header size='medium'>Loading...</Header>
      </div>
    )
  }
}

export default UserLoading
