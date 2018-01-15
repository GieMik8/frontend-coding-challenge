import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { setHTMLClass } from './helpers'

setHTMLClass() // Sets broswer info (adds css classes) in html tag
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
