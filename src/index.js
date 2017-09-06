import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ActionCable setup
import actionCable form 'actioncable'

const CableApp = {}
CableApp.cable = actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`)

// Pass in CableApp as cableApp prop
ReactDOM.render(<App cableApp={CableApp} />, document.getElementById('root'));
registerServiceWorker();
