import React from 'react'
import { Container, Form, Button, Header } from 'semantic-ui-react'
import { APIURL, TSP, FSP } from './PageAssets'

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    profile_image_url: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, ()=>{console.log(this.state)})
  }

  handleSubmit = () => {
    const options = {
      "method": "post",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(this.state)
    }
    console.log(`${APIURL()}/users`, options)
    fetch(`${APIURL()}/users`, options)
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  render() {
    return(
      <Container>
        <FSP />
        <Header size='small'>Sign Up</Header>
        <Form>
          <Form.Input label='Username' type='username' name='username' onChange={this.handleChange} />
          <Form.Input label='Password' type='password' name='password' onChange={this.handleChange} />
          <Form.Input label='Email' type='email' name='email' onChange={this.handleChange} />
          <Form.Input label='Profile Picture Link' type='profile_image_url' name='profile_image_url' onChange={this.handleChange} />
        </Form>
        <TSP />
        <Button onClick={this.handleSubmit} animated='fade' size='huge'>
          <Button.Content visible>
            Login
          </Button.Content>
          <Button.Content hidden>
            I'm in!
          </Button.Content>
        </Button>
      </Container>
    )
  }
}

export default SignUp
