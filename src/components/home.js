import React, { Component } from 'react'
import Navbar from './navbar'
import Event from './event'
import axios from 'axios';

export default class Home extends Component {

  state = {
    events: []
  }
  componentDidMount(){
    const token = localStorage.getItem("access_token");
    if(!token){
      this.props.history.push('/login')
    } else {
      axios.get('http://localhost:3000/get-all-events', { headers: {Authorization: token}  })
    .then(res => {
      console.log(res.data)
      this.setState({
        events: res.data
      })
    })
    }
  }

  fetchAllEvents = () => {

  }

  logout = (e) => {
    e.preventDefault();
      this.props.history.push('/login')
  }

  
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    this.props.history.push('/login')
  }

  render() {
    const { events } = this.state;
    const all  = events.map((event, key) =>
    <>
    <Event name={event.name} location={event.location} description={event.description} id={event.id}/>
    <br/>
    </>
    
);
    return (
      <div>
        <Navbar  logout={this.logout}/>
        <br/>
        <br/>
        <br/>
        <div className="container">

          <h3> All Events</h3>
          {all}
          
        </div>
        
      </div>
    )
  }
}
