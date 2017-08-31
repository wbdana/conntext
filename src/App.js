import React, { Component } from 'react';
import TextEditor from './components/TextEditor'
import CodeBox from './components/CodeBox'
import NavBar from './components/NavBar'
import Home from './components/Home'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'codemirror/lib/codemirror.css'

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
    } else if (this.state.activePage === 'files') {
      return <CodeBox />
    }
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
