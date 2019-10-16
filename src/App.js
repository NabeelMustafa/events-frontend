import React from 'react';
import './App.css';
import axios from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/singup'
import Home from './components/home'
import Profile from './components/profile'
import EventDetail from './components/eventDetail'


class App extends React.Component {

 
  register = () => {
    axios.post('http://localhost:3000/signup', { username: "nabeel1", password: "123", primary_location: "lahore"} )
    .then(res => {
      console.log("succesful");
    })
  }

  login = () => {
    axios.post('http://localhost:3000/signin', { username: "nabeel1" , password: "123" })
    .then(res => {
      const jwt = res.data.csrf;
      localStorage.setItem("access_token", jwt);
    })
  }
  logout = () => {
    const token = localStorage.getItem("access_token");
    axios.get('http://localhost:3000/events')
    .then(res => {
      console.log(res);
    })

  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/eventDetail/:id" component={EventDetail} />
        </div>
      </Router>
    )
  }
}

export default App;
