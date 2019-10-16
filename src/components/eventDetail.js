import React, { Component } from 'react'
import Navbar from './navbar'
import axios from 'axios';

export default class EventDetail extends Component {
  
  state = {
    event: {}
  }
  componentDidMount(){
    const token = localStorage.getItem("access_token");
    if(!token){
      // this.props.history.push('/login')
    }
    const { match: { params } } = this.props;
    this.fetchEventDetail(params.id)
    this.fetchAllTikcets(params.id)
  }
  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    this.props.history.push('/login')
  }

  fetchEventDetail = (id) => {
    const token = localStorage.getItem("access_token");

    axios.get(`http://localhost:3000/events/${id}`, { headers: {Authorization: token}  })
    .then(res => {
      console.log(res.data);
      this.setState({
        event: res.data
      })
    })
  }

  fetchAllTikcets = (id) => {
    const token = localStorage.getItem("access_token");
    axios.get(`http://localhost:3000/events/${id}/tickets`, { headers: {Authorization: token }  })
    .then(res => {
      this.setState({
        tickets: res.data
      });
    })
  }
  render() {
    const {event, tickets} = this.state;
    return (
      <div>
        <Navbar logout={this.logout}/>
        <br/>
        <br/>
        <br/>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {event && <img src={event.image_url} alt="12" style={{float: "right"}}/>}
            </div>
            <div className="col">
            {event && (
            <>
            <h3><strong>{event.name}</strong></h3>
            <h4>Descritpion: {event.description}</h4>
            <h4>Location: {event.location}</h4>
            <h4>Date time: {event.date_time}</h4>   
            <hr/>         
            </>
            )}
            <hr/>
            { tickets && (
            tickets.map(ticket => {
              return (
                <div class="p-3 mb-2 bg-secondary text-white" style={{margin: "1rem"}}>
                  Ticket class: {ticket.ticket_class}
                  <br/>
                  Ticket description: {ticket.description}
                  <br/>
                  Ticket availability: {ticket.availability}
                  <br/>                  
                  Ticket price: {ticket.price}
                  <br/>
                </div>

              )
            })
          )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
