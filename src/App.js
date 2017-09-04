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
    }
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
    console.log(this.state)
    console.log('redirectReset')
    if (this.state.activeRecord.redirect === true) {
      this.setState({
        activeRecord: {
          ...this.state.activeRecord,
          redirect: false
        }
      })
    }
  }

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
    console.log('Fetching record - App!')
    fetch(`${APIURL()}/records/${id}`)
      .then(resp => resp.json())
      // .then(json => console.log(json))
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
    console.log('resetRecord -- app')
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
              (this.state.auth.isLoggedIn === false) ? <Login login={this.login} /> : <Redirect to="/home" {...props} />
            )} />

            <Route exact path="/signup" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <SignUp /> : <Redirect to="/home" {...props} />
            )} />

            <Route exact path="/home" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="/login" {...props} /> :
              <Home {...props} />
            )} />

            <Route path="/savedfiles" render={(props)=>(
              <SavedFiles {...props} auth={this.state.auth} />
            )} />

            <Route path="/partnerfiles" render={(props)=>(
              <PartnerFiles {...props} auth={this.state.auth} />
            )} />

            <Route exact path="/allfiles" render={(props)=>(
              (this.state.auth.isLoggedIn === false) ? <Redirect to="/login" {...props} /> : <AllFiles
                {...props}
                setActiveRecord={this.setActiveRecord}
              />
            )} />

            <Route exact path="/editor/:id" render={(props)=>(
              <Editor
                {...props}
                getRecord={this.getRecord}
                activeRecord={this.state.activeRecord}
                redirectReset={this.redirectReset}
                resetRecord={this.resetRecord}
                auth={this.state.auth}
              />
            )} />

            <Route exact path="/editor" render={(props)=>(
              <Editor
                {...props}
                getRecord={this.getRecord}
                activeRecord={this.state.activeRecord}
                redirectReset={this.redirectReset}
                resetRecord={this.resetRecord}
                auth={this.state.auth}
              />
            )} />

            <Route exact path="/users" render={(props)=>(
              <UserDirectory {...props} />
            )} />

            <Route path="/users/:id" render={(props)=>(
              <UserShowPage {...props} />
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
