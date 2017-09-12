import React from 'react'
import { Container, Form, Button, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { APIURL, TSP } from './PageAssets'

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    profile_image_url: '',
  }

  updateEmail = (event) => {
    this.setState({
      email: event.target.value.toLowerCase()
    })
  }

  updatePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  updatePicture = (event) => {
    this.setState({
      profile_image_url: event.target.value
    })
  }

  handleSubmit = (event) => {
    const options = {
      "method": "post",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(this.state)
    }
    fetch(`${APIURL()}/users`, options)
      .then(resp => resp.json())
      .then(json => {
        if(json.status === 200) {
          this.props.login({auth: {email: this.state.email, password: this.state.password}})
        } else {
          alert('Sorry, that username is already taken.')
        }
      })
  }

  render() {
    return(
      <Container id='signup'>
        <Header size='small'>Sign Up</Header>
        <Form id='signup' >
          <Form.Input label='Username' type='email' name='email' placeholder='Literally whatever you want' onChange={this.updateEmail} />
          <Form.Input label='Password' type='password' name='password' placeholder='Literally whatever you want' onChange={this.updatePassword} />
          <Form.Input label='Profile Picture Link' type='profile_image_url' name='profile_image_url' placeholder='Must be .gif, .jpg, or .png' onChange={this.updatePicture} />
        </Form>
        <TSP />
        <Button onClick={this.handleSubmit} animated='fade' size='huge' basic color='blue' id='signupbutton'>
          <Button.Content visible>
            Sign Up
          </Button.Content>
          <Button.Content hidden>
            I'm in!
          </Button.Content>
        </Button>
        <TSP />
        <div id='signupsmall'>Already a member? <NavLink to="/login" exact>Click here to login!</NavLink></div>
      </Container>
    )
  }
}

export default SignUp
