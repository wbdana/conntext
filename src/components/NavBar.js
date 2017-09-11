import React from 'react'
import { Container, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
  return(
    <Container fluid className="navbar">

      <Menu className="navbar">

        <a href='https://github.com/wbdana/' target='_blank' rel="noopener noreferrer">
          <Menu.Item name="conntext">
            Connected Text - by wbdana
          </Menu.Item>
        </a>

        {props.loggedIn === true && <NavLink to="/home" exact>
          <Menu.Item name="home">
            <Icon name='home' />Home - {props.username}
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

        {props.loggedIn === true && <NavLink to="/gitfetch" exact>
          <Menu.Item name='gitfetch'>
            <Icon name='github' />GitFetch
          </Menu.Item>
        </NavLink>}

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
          <Icon name='remove user' /> Logout
        </Menu.Item></NavLink>}

        <NavLink to="/home" exact>
          <Menu.Item name='construction'>
            <Icon name='warning sign' />SITE UNDER CONSTRUCTION
          </Menu.Item>
        </NavLink>

      </Menu>
    </Container>
  )
}

export default NavBar
