import React from 'react'
import { Container, Form, Button, Header } from 'semantic-ui-react'
import { TSP, FSP } from './PageAssets'

class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    profile_image_url: '',
  }

  handleSubmit = () => {
    console.log('To be added!')
  }

  render() {
    return(
      <Container>
        <FSP />
        <Header size='small'>Sign Up</Header>
        <Form>
          <Form.Input label='Username' type='username' name='username' />
          <Form.Input label='Password' type='password' name='password' />
          <Form.Input label='Email' type='email' name='email' />
          <Form.Input label='Profile Picture Link' type='profile_image_url' name='profile_image_url' />
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
