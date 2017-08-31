import React from 'react'
import { Header, Menu, Icon } from 'semantic-ui-react'

class NavBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: this.props.activePage
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activePage: name})
    this.props.updateActivePage(name)
  }

  render() {
    const { activePage } = this.state
    return(
      <div className="NavBar">
        <br/><br/><br/><br/>
        <Header size="huge" className="App-logo">ConnText</Header>
        <Header size="small">Connected Text</Header>
        <Menu>
          <Menu.Item name="home" active={activePage === 'home'} onClick={this.handleItemClick}>
            <Icon name='home' />Home
          </Menu.Item>
          <Menu.Item name='editor' active={activePage === 'editor'} onClick={this.handleItemClick}>
            <Icon name='file' />Editor
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default NavBar
