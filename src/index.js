/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Main from './main';
import * as serviceWorker from './serviceWorker';
import './css/bootstrap-responsive.css';
import './css/bootstrap.css';
import './css/bootstrap.min.css';
import './css/bootstrap-responsive.min.css';
import './css/style.css';

ReactDOM.render(<BrowserRouter><Main /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
