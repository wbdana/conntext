import React, { Component } from 'react';
import Editor from './components/Editor' // React-Ace

// Other components
import NavBar from './components/NavBar'
import Home from './components/Home'
import SavedFiles from './components/SavedFiles'
import UserDirectory from './components/UserDirectory'

// CSS
import 'semantic-ui-css/semantic.min.css'
import './App.css';


class App extends Component {
  state = {
    activePage: 'home'
  }

  updateActivePage = (newPage) => {
    this.setState({
      activePage: newPage
    })
  }

  renderCorrectPage = () => {
    if (this.state.activePage === 'home') {
      return <Home />
    } else if (this.state.activePage === 'editor') {
      return <Editor />
    } else if (this.state.activePage === 'savedFiles') {
      return <SavedFiles />
    } else if (this.state.activePage === 'userDirectory') {
      return <UserDirectory />
    }
  }

  apiConnectTest = () => {
    const options = {
      "headers": {
        "accept": "application/json",
        "content-type": "application/json"
      }
    }

    fetch('http://localhost:3000/api/v1/users/1', options)
      .then(resp => resp.json())
      .then(json => console.log(json))
  }

  componentDidMount() {
    this.apiConnectTest()
  }

  render() {
    return (
      <div className="App">
        <NavBar activePage={this.state.activePage} updateActivePage={this.updateActivePage} />
        {this.renderCorrectPage()}
      </div>
    );
  }
}

export default App;
