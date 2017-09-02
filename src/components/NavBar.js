import React from 'react'
import { Header, Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { SiteHeader } from './PageAssets'

const NavBar = () => {
  return(
    <div className="NavBar">

      <SiteHeader />

      <Menu>

        <NavLink to="/home" exact>
          <Menu.Item name="home">
            <Icon name='home' />Home
          </Menu.Item>
        </NavLink>

        <NavLink to="/files" exact>
          <Menu.Item name='savedFiles'>
            <Icon name='file code outline' />Saved Files
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

      </Menu>
    </div>
  )
}

export default NavBar
