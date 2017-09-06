import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Editor from './components/Editor' // React-Ace

// Other components
import NavBar from './components/NavBar'
import Home from './components/Home'
import SavedFiles from './components/SavedFiles'
import PartnerFiles from './components/PartnerFiles'
import AllFiles from './components/AllFiles'
import UserDirectory from './components/UserDirectory'
import UserShowPage from './components/UserShowPage'
import UserLoading from './components/UserLoading'
import Login from './components/Login'
import SignUp from './components/SignUp'
import About from './components/About'

// Services
import Auth from './services/Auth'

// CSS
import 'semantic-ui-css/semantic.min.css'
import './App.css';

// Page Assets
import { APIURL } from './components/PageAssets'


class App extends Component {
  state = {
    auth: {
      isLoggedIn: false,
      user: {},
      userId: ''
    },
    activeRecord: {
      name: '',
      content: '',
      language: '',
      recordId: '',
      redirect: false
    },
    currentUser: {
      user: {},
      createdRecords: [],
      partnerRecords: []
    },
    viewUser: {
      user: {},
      createdRecords: [],
      partnerRecords: []
    }
  }

  grabViewUser = () => {
    const options = {
      "method": "get",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
    fetch(`${APIURL()}/users/${window.location.href.match(/\d+$/)[0]}`, options)
      .then(resp => resp.json())
      .then(json => this.setState({
        viewUser: {
          user: json.user,
          createdRecords: json.created_records,
          partnerRecords: json.partner_records
        }
      }))
  }

  resetViewUser = () => {
    this.setState({
      viewUser: {
        user: {},
        createdRecords: [],
        partnerRecords: []
      }
    })
  }

  setActiveRecord = (response) => {
    this.setState({
      activeRecord: {
        name: response.name,
        content: response.content,
        language: response.language,
        recordId: response.id,
        redirect: true
      }
    })
  }

  redirectReset = () => {
    if (this.state.activeRecord.redirect === true) {
      this.setState({
        activeRecord: {
          ...this.state.activeRecord,
          redirect: false
        }
      })
    }
  }

  // Need to add error handling
  login = (loginParams) => {
    Auth.login(loginParams)
      .then( user => {
        if (!user.error) {
          this.setState({
            auth:{
              user: user
            }
          })
          localStorage.setItem('jwt', user.jwt )
        }
      }).then(()=>{
        Auth.currentUser()
          .then( user => {
            if (!user.error) {
              this.setState({
                auth: {
                  isLoggedIn: true,
                  user: user
                }
              })
            }
          })
      })
      .then(()=>{
        const options = {
          "method": "get",
          "headers": {
            "content-type": "application/json",
            "accept": "application/json"
          }
        }
        fetch(`${APIURL()}/users/${this.props.userId}`, options)
          .then(resp => resp.json())
          .then(json => this.setState({
            currentUser: {
              user: json.user,
              createdRecords: json.created_records,
              partnerRecords: json.partner_records
            }
          }))
      })
    }

  // Need to force redirect to Login after logout
  logout = () => {
    localStorage.removeItem('jwt')
    this.setState({ auth: { isLoggedIn: false, user:{}}})
  }

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
     Auth.currentUser()
       .then(user => {
         if (!user.error) {
           this.setState({
             auth: {
               isLoggedIn: true,
               user: user
             }
           })
         }
       })
     }
  }

  getRecord = (id) => {
    fetch(`${APIURL()}/records/${id}`)
      .then(resp => resp.json())
      .then(json => this.setState({
        activeRecord: {
          name: json.name,
          content: json.content,
          language: json.language,
          recordId: json.id,
          redirect: true
        }
      }))
  }

  resetRecord = () => {
    this.setState({
      activeRecord: {
        name: '',
        content: '',
        language: '',
        recordId: '',
        redirect: false
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="RouterContainer">

            <Route path="/" render={()=>(
              <NavBar logout={this.logout} loggedIn={this.state.auth.isLoggedIn}/>
            )} />

            <Route exact path ="/" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="/login" {...props} /> : <Redirect to="/home" {...props} />
            )} />

            <Route path="/login" render={(props)=>(
              (this.state.auth.isLoggedIn === true && this.state.currentUser.user !== {}) ? <Redirect to="/home" {...props} currentUser={this.state.currentUser} /> : <Login login={this.login} />
            )} />

            <Route exact path="/signup" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <SignUp {...props} login={this.login} /> : <Redirect to="/home" {...props} />
            )} />

            <Route exact path="/home" render={(props)=>(
              (this.state.auth.isLoggedIn === true && this.state.currentUser.user !== {}) ? <Home {...props} userId={this.state.auth.user.id} currentUser={this.state.currentUser} /> : <Redirect to="/login" {...props} />
            )} />

            <Route path="/savedfiles" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <SavedFiles {...props} auth={this.state.auth} />
            )} />

            <Route path="/partnerfiles" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <PartnerFiles {...props} auth={this.state.auth} />
            )} />

            <Route exact path="/allfiles" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="/login" {...props} /> : <AllFiles
                {...props}
                setActiveRecord={this.setActiveRecord}
              />
            )} />

            <Route exact path="/editor/:id" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <Editor
                {...props}
                getRecord={this.getRecord}
                activeRecord={this.state.activeRecord}
                redirectReset={this.redirectReset}
                resetRecord={this.resetRecord}
                auth={this.state.auth}
                cableApp={this.props.cableApp}
              />
            )} />

            <Route exact path="/editor" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <Editor
                {...props}
                getRecord={this.getRecord}
                activeRecord={this.state.activeRecord}
                redirectReset={this.redirectReset}
                resetRecord={this.resetRecord}
                auth={this.state.auth}
              />
            )} />

            <Route exact path="/users" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <UserDirectory {...props} />
            )} />

            <Route path="/users/:id" render={(props)=>(
              (!this.state.viewUser.user.email) ? <UserLoading {...props} grabViewUser={this.grabViewUser} /> : <UserShowPage {...props} viewUser={this.state.viewUser} resetViewUser={this.resetViewUser}/>
            )} />

            <Route exact path="/about" render={()=>(
              <About />
            )} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
