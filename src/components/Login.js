import React from 'react'
import { Container, Form, Button, Header } from 'semantic-ui-react'
import { NavLink, Redirect } from 'react-router-dom'
import { TSP, FSP } from './PageAssets'

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    this.props.login({auth: this.state})
    return(<Redirect to="/home" />)
  }

  render() {
    return(
      <Container id='login'>
        <Header size='small'>Login</Header>
        <Form id='login' className='loginform'>
          <Form.Input label='Username' type='email' name='email' placeholder='Must be exact' onChange={this.onChange} />
          <Form.Input label='Password' type='password' name='password' placeholder='Must be exact... obviously' onChange={this.onChange} />
        </Form>
        <TSP />
        <Button onClick={this.handleSubmit} animated='fade' size='huge' basic color='blue' id='loginbutton'>
          <Button.Content visible>
            Login
          </Button.Content>
          <Button.Content hidden>
            Code Time!
          </Button.Content>
        </Button>
        <TSP />
        <div id='loginsmall'> Not a member? <NavLink to="/signup" exact>Click here to sign up!</NavLink></div>
      </Container>
    )
  }
}

export default Login
