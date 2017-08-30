import React, { Component } from 'react';
import TextEditor from './components/TextEditor'
import NavBar from './components/NavBar'
import './App.css';
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  state = {
    activePage: 'home'
  }

  updateActivePage = (newPage) => {
    this.setState({
      activePage: newPage
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar activePage={this.state.activePage} updateActivePage={this.updateActivePage} />
        <TextEditor />
      </div>
    );
  }
}

export default App;
