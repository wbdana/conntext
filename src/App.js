import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
        <Router>
          <div className="RouterContainer">

            <Route path="/" render={(props)=>(
              <NavBar {...props} />
            )} />

            <Route path="/home" render={(props)=>(
              <Home />
            )} />

            <Route path="/files" render={(props)=>(
              <SavedFiles />
            )} />

            <Route path="/editor" render={(props)=>(
              <Editor />
            )} />

            <Route path="/users" render={(props)=>(
              <UserDirectory />
            )} />

          </div>

        </Router>
      </div>
    );
  }
}

export default App;
