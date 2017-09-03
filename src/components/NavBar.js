import React from 'react'
import { Header, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { SiteHeader, FSP, TSP } from './PageAssets'

const NavBar = (props) => {
  return(
    <div className="NavBar">

      <TSP/>
      <SiteHeader />

      <Menu>

        <NavLink to="/home" exact>
          <Menu.Item name="home">
            <Icon name='home' />Home
          </Menu.Item>
        </NavLink>

        <NavLink to="/savedfiles" exact>
          <Menu.Item name='savedFiles'>
            <Icon name='file code outline' />Saved Files
          </Menu.Item>
        </NavLink>

        <NavLink to="/allfiles" exact>
          <Menu.Item name='allfiles'>
            <Icon name='file code outline' />All Files
          </Menu.Item>
        </NavLink>

        <NavLink to="/editor" exact>
          <Menu.Item name='editor'>
            <Icon name='edit' />Editor
          </Menu.Item>
        </NavLink>

        <NavLink to="/users" exact>
          <Menu.Item name='userDirectory'>
            <Icon name='address book outline' />User Directory
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
