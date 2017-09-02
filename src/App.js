import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Editor from './components/Editor' // React-Ace

// Other components
import NavBar from './components/NavBar'
import Home from './components/Home'
import SavedFiles from './components/SavedFiles'
import AllFiles from './components/AllFiles'
import UserDirectory from './components/UserDirectory'
import UserShowPage from './components/UserShowPage'
import Login from './components/Login'
import SignUp from './components/SignUp'

// CSS
import 'semantic-ui-css/semantic.min.css'
import './App.css';

// Page Assets
import { APIURL } from './components/PageAssets'


class App extends Component {
  state = {
    auth: {
      isLoggedIn: false,
      user: ''
    }
  }

  apiConnectTest = () => {
    const options = {
      "headers": {
        "accept": "application/json",
        "content-type": "application/json"
      }
    }
    fetch(`${APIURL()}/users`, options)
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

            <Route path="/" render={()=>(
              <NavBar />
            )} />

            <Route path="/login" render={()=>(
              <Login />
            )} />

            <Route path="/signup" render={()=>(
              <SignUp />
            )} />

            <Route path="/home" render={(props)=>(
              <Home {...props} />
            )} />

            <Route path="/savedfiles" render={(props)=>(
              <SavedFiles {...props} />
            )} />

            <Route path="/allfiles" render={(props)=>(
              <AllFiles {...props} />
            )} />

            <Route path="/editor" render={(props)=>(
              <Editor {...props} />
            )} />

            <Route path="/users" render={(props)=>(
              <UserDirectory {...props} />
            )} />

            <Route path="/users/:id" render={(props)=>(
              <UserShowPage {...props} />
            )} />

          </div>

        </Router>
      </div>
    );
  }
}

export default App;
