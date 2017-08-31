import React, { Component } from 'react';
import TextEditor from './components/TextEditor'
import CodeBox from './components/CodeBox'
import NavBar from './components/NavBar'
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

  render() {
    return (
      <div className="App">
        <NavBar activePage={this.state.activePage} updateActivePage={this.updateActivePage} />
        <CodeBox />
      </div>
    );
  }
}

export default App;
