import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import './components.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementsByTagName('app-root')[0]
);

serviceWorker.unregister()