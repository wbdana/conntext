import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Editor from './components/Editor' // React-Ace
import NewEditor from './components/NewEditor' // Blank React-Ace

// Other components
import NavBar from './components/NavBar'
import Home from './components/Home'
import SavedFiles from './components/SavedFiles'
import PartnerFiles from './components/PartnerFiles'
import UserDirectory from './components/UserDirectory'
import UserShowPage from './components/UserShowPage'
import UserLoading from './components/UserLoading'
import Login from './components/Login'
import SignUp from './components/SignUp'
import About from './components/About'
import GitFetchDirect from './components/GitFetchDirect'
import Logout from './components/Logout'
import ReadOnlyEditor from './components/ReadOnlyEditor'
import GitFetch from './components/GitFetch'

// Construction
import Construction from './components/Construction'

// Services
import Auth from './services/Auth'

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
    },
    userDirectory: {
      users: []
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
        } else {
          alert('Failed to login.')
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
            } else {
              alert('Failed to login.')
            }
          })
      }, ()=>{
        const options = {
          "method": "get",
          "headers": {
            "content-type": "application/json",
            "accept": "application/json"
          }
        }
        console.log(`${APIURL()}/users/${this.state.auth.user.id}`)
        fetch(`${APIURL()}/users/${this.state.auth.user.id}`, options)
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
     document.title = "Connected Text"
  }

  resetRecord = () => {
    this.setState({
      activeRecord: {
        recordId: '',
        redirect: false
      }
    })
  }

  updateViewUser = (data) => {
    console.log('Fired!')
    this.setState({
      viewUser: {
        user: data.user,
        createdRecords: [...data.created_records],
        partnerRecords: [...data.partner_records]
      }
    })
  }

  updateHomeUser = (data) => {
    console.log('UpdateHomeUser from App')
    this.setState({
      currentUser: {
        user: data.user,
        createdRecords: [...data.created_records],
        partnerRecords: [...data.partner_records]
      }
    })
  }

  initialUpdateUserDirectory = (data) => {
    this.setState({
      userDirectory: {
        users: data
      }
    })
  }

  updateWSUserDirectory = (data) => {
    console.log('Update UserDirectory from App')
    this.setState({
      userDirectory: {
        users: data.users
      }
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Router>
          <div className="RouterContainer">

            <Route path="/" render={()=>(
              <NavBar logout={this.logout} loggedIn={this.state.auth.isLoggedIn} username={this.state.auth.user.email}/>
            )} />

            <Route exact path ="/" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="/login" {...props} /> : <Redirect to="/home" {...props} />
            )} />

            <Route path="/login" render={(props)=>(
              (this.state.auth.isLoggedIn === true && this.state.currentUser.user !== {}) ? <Redirect to="/home" {...props} currentUser={this.state.currentUser} /> : <Login login={this.login} />
            )} />

            <Route exact path="/editor/login" render={(props)=>(<Redirect to="/home" />)} />

            <Route exact path="/signup" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <SignUp {...props} login={this.login} /> : <Redirect to="/home" {...props} />
            )} />

            <Route exact path="/home" render={(props)=>(
              (this.state.auth.isLoggedIn === true && this.state.currentUser.user !== {}) ? <Home {...props} userId={this.state.auth.user.id} currentUser={this.state.currentUser} updateWSContent={this.updateHomeUser}  data-cableApp={this.props.cableApp} /> : <Redirect to="/login" {...props} />
            )} />

            <Route path="/myfiles" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <SavedFiles {...props} auth={this.state.auth} setActiveRecord={this.setActiveRecord} />
            )} />

            <Route path="/sharedfiles" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <PartnerFiles {...props} auth={this.state.auth} setActiveRecord={this.setActiveRecord} />
            )} />

            <Route exact path="/editor/:id" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <Editor
                {...props}
                setActiveRecord={this.setActiveRecord}
                activeRecord={this.state.activeRecord}
                redirectReset={this.redirectReset}
                resetRecord={this.resetRecord}
                auth={this.state.auth}
                data-cableApp={this.props.cableApp}
                currentUser={this.state.currentUser.user}
              />
            )} />

            <Route exact path="/noeditor/:id" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <ReadOnlyEditor
                {...props}
                setActiveRecord={this.setActiveRecord}
                activeRecord={this.state.activeRecord}
                redirectReset={this.redirectReset}
                resetRecord={this.resetRecord}
                auth={this.state.auth}
                data-cableApp={this.props.cableApp}
                currentUser={this.state.currentUser.user}
              />
            )} />

            <Route exact path="/editor" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <NewEditor
                {...props}
                setActiveRecord={this.setActiveRecord}
                activeRecord={this.state.activeRecord}
                redirectReset={this.redirectReset}
                resetRecord={this.resetRecord}
                auth={this.state.auth}
                data-cableApp={this.props.cableApp}
              />
            )} />

            <Route exact path="/gitfetch" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <GitFetch {...props} userId={this.state.auth.user.id} />
            )} />

            <Route exact path="/gitfetchdirect" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <GitFetchDirect {...props} userId={this.state.auth.user.id} />
            )} />

            <Route exact path="/users" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="login" {...props} /> : <UserDirectory {...props} users={this.state.userDirectory.users} initialUpdateUserDirectory={this.initialUpdateUserDirectory} data-cableApp={this.props.cableApp} updateWSContent={this.updateWSUserDirectory} />
            )} />

            <Route path="/users/:id" render={(props)=>(
              (!this.state.viewUser.user.email) ? <UserLoading {...props} grabViewUser={this.grabViewUser} /> : <UserShowPage {...props} viewUser={this.state.viewUser} resetViewUser={this.resetViewUser} data-cableApp={this.props.cableApp} updateWSContent={this.updateViewUser} />
            )} />

            <Route exact path="/about" render={()=>(
              <About />
            )} />

            <Route exact path="/logout" render={(props)=>(
              (this.state.auth.isLoggedIn === true) ? <Logout logout={this.logout} /> : <Redirect to="/home" />
            )} />

            <Route exact path="/construction" render={()=>(<Construction />)} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
