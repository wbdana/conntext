import React from 'react'
import { Container, Form, Button, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { TSP, FSP } from './PageAssets'

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = () => {
    console.log('To be added!')
  }

  render() {
    return(
      <Container>
        <FSP />
        <Header size='small'>Login</Header>
        <Form>
          <Form.Input label='Username' type='username' name='username' />
          <Form.Input label='Password' type='password' name='password' />
        </Form>
        <TSP />
        <Button onClick={this.handleSubmit} animated='fade' size='huge'>
          <Button.Content visible>
            Login
          </Button.Content>
          <Button.Content hidden>
            Code Time!
          </Button.Content>
        </Button>
        <FSP />
        Not a member? <NavLink to="/signup" exact>Click here to sign up!</NavLink>
      </Container>
    )
  }
}

export default Login
