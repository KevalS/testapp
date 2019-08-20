import React from 'react';
import logo from './logo.svg';
import './App.css'
import Base from './components/base'
import Home from './components/home'
import SimpleComponent from './components/test'
import Login from './components/login'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';


function App() {
  return (
    <Router>

      <Route exact path="/" render={() => (<Redirect to="/login" />)} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
        <Route path="/video" component={SimpleComponent} />
    </Router>
  );
}

export default App;
