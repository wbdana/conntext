import React from 'react'
import { Container, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
  return(
    <Container fluid className="navbar">

      <Menu className="navbar">

        <a href='https://wbdana.herokuapp.com' target='_blank' rel="noopener noreferrer">
          <Menu.Item name="conntext">
            Connected Text - by wbdana
          </Menu.Item>
        </a>

        {props.loggedIn === true && <NavLink to="/home" exact>
          <Menu.Item name="home">
            <Icon name='home' />Home
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === true && <NavLink to="/editor" exact>
          <Menu.Item name='editor'>
            <Icon name='edit' />New
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === true && <NavLink to="/myfiles" exact>
          <Menu.Item name='myFiles'>
            <Icon name='folder open outline' />My Files
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === true && <NavLink to="/sharedfiles" exact>
          <Menu.Item name='sharedFiles'>
            <Icon name='file code outline' />Shared Files
          </Menu.Item>
        </NavLink>}


        {
          props.loggedIn === true &&
          <NavLink to="/gitfetch" exact>
            <Menu.Item name='gitfetch' onClick={() => alert('GitFetch is currently undergoing repairs and may not' +
                ' work right now.')}>
              <Icon name='warning sign' />GitFetch
            </Menu.Item>
          </NavLink>
        }

        {props.loggedIn === true && <NavLink to="/users" exact>
          <Menu.Item name='userDirectory'>
            <Icon name='address book outline' />User Directory
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === false && <NavLink to="/login" exact>
          <Menu.Item name='login'>
            <Icon name='user' />Login
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === false && <NavLink to="/signup" exact>
          <Menu.Item name='signup'>
            <Icon name='write' />Signup
          </Menu.Item>
        </NavLink>}

        <NavLink to="/about" exact>
          <Menu.Item name='about'>
            <Icon name='question circle outline' />About
          </Menu.Item>
        </NavLink>

        {props.loggedIn === true && <NavLink to="/logout" exact>
        <Menu.Item name='logout'>
          <Icon name='remove user' /> Logout - {props.username}
        </Menu.Item></NavLink>}

      </Menu>
    </Container>
  )
}

export default NavBar
