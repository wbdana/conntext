import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// CSS
import './App.css';
import 'semantic-ui-css/semantic.min.css';

// ActionCable setup
import actionCable from 'actioncable';

const CableApp = {};
CableApp.cable = actionCable.createConsumer(`wss://conntext-api.herokuapp.com/cable`);

// Pass in CableApp as cableApp prop
ReactDOM.render(
    <App cableApp={CableApp} />,
    document.getElementById('root')
);
registerServiceWorker();
