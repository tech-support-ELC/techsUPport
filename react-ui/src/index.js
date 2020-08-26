import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import store from './store'
import Root from './components/Root'
import Footer from "./components/Footer";
import * as serviceWorker from './serviceWorker';
import './style.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
      <Footer />
    </Router>
  </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
