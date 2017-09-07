import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
  return(
    <div className="NavBar">

      <Menu>

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

        {props.loggedIn === true && <NavLink to="/savedfiles" exact>
          <Menu.Item name='savedFiles'>
            <Icon name='file code outline' />My Files
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === true && <NavLink to="/partnerfiles" exact>
          <Menu.Item name='partnerFiles'>
            <Icon name='file code outline' />Shared Files
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === true && <NavLink to="/allfiles" exact>
          <Menu.Item name='allfiles'>
            <Icon name='file code outline' />All Files
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === true && <NavLink to="/users" exact>
          <Menu.Item name='userDirectory'>
            <Icon name='address book outline' />User Directory
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === false && <NavLink to="/login" exact>
          <Menu.Item name='login'>
            <Icon name='question circle outline' />Login
          </Menu.Item>
        </NavLink>}

        {props.loggedIn === false && <NavLink to="/signup" exact>
          <Menu.Item name='signup'>
            <Icon name='question circle outline' />Signup
          </Menu.Item>
        </NavLink>}

        <NavLink to="/about" exact>
          <Menu.Item name='about'>
            <Icon name='question circle outline' />About
          </Menu.Item>
        </NavLink>

        {props.loggedIn === true && <Menu.Item name='logout' onClick={props.logout}>
          <Icon name='remove user' /> Logout
        </Menu.Item>}

      </Menu>
    </div>
  )
}

export default NavBar
