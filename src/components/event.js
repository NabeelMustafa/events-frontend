import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Event extends Component {

  state = {
    tickets: [],
    new_ticket_class: '',
    new_description: '',
    new_availability: '',
    new_price: '',
    update: false
  }
  componentDidMount(){
    this.fetchAllTikcets();
  }

  fetchAllTikcets = () => {
    const { id } = this.props;
    const token = localStorage.getItem("access_token");
    axios.get(`http://localhost:3000/events/${id}/tickets`, { headers: {Authorization: token }  })
    .then(res => {
      this.setState({
        tickets: res.data
      });
    })
  }

  handlechange = (e) => {
    this.setState({ [e.target.name] : e.target.value});
  }

  addNew = (e) => {
    const { id } = this.props;
    e.preventDefault();
    const { new_ticket_class, new_description, new_availability, new_price} = this.state;  
    const token = localStorage.getItem("access_token");
    const self = this
    axios({
      method: 'post',
      url: `http://localhost:3000/events/${id}/tickets`,
      data: {
        ticket_class: new_ticket_class,
        description: new_description,
        availability: new_availability,
        price: new_price,
      },
      headers: {'Authorization': token}
    })
      .then(function (response) {
        self.setState({
          new_ticket_class: '',
          new_description: '',
          new_availability: '',
          new_price: ''
        })
        self.fetchAllTikcets();
      });
  } 

  updateState = (e, id) => {
    e.preventDefault();
    const { tickets} = this.state;
    const filterResult = tickets.filter(ticket => ticket.id === id);
    this.setState({
      new_price: filterResult[0].price,
      new_availability: filterResult[0].availability,
      new_description: filterResult[0].description,
      new_ticket_class: filterResult[0].ticket_class,
      update: true,
      updateTicketId: filterResult[0].id
    })
  }

  updateTikcet = (e) =>{
    e.preventDefault();
    const { new_ticket_class, new_description, new_availability, new_price, updateTicketId} = this.state;  
    const token = localStorage.getItem("access_token");
    const self = this
    axios({
      method: 'put',
      url: `http://localhost:3000/tickets/${updateTicketId}`,
      data: {
        ticket_class: new_ticket_class,
        description: new_description,
        availability: new_availability,
        price: new_price,
      },
      headers: {'Authorization': token}
    })
      .then(function (response) {
        self.setState({
          new_ticket_class: '',
          new_description: '',
          new_availability: '',
          new_price: '',
          update: false,
        })
        self.fetchAllTikcets();
      });
  }

  deleteTicket = (e, id) => {
    console.log("12")
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    axios.delete(`http://localhost:3000/tickets/${id}`, { headers: {Authorization: token }  })
    .then(res => {
    })
    window.location.reload();
  }

  cancelUpdate = () => {
    this.setState({
      new_price: '',
      new_availability: '',
      new_description: '',
      new_ticket_class: '',
      update: false
    })
  }
  render() {
    const { name, description, id, location, isEdit } = this.props;
    const { new_ticket_class, new_description, new_availability, new_price, update} = this.state;

    const { tickets} = this.state;
    console.log(tickets);
    return (

        <div className="card">
        <div className="card-header">
          {name}
        </div>
        <div className="card-body">
          <h5 className="card-title">Location: {location}</h5>
          <p className="card-text">{description}</p>
          <Link className="btn btn-outline-success"  to={{
            pathname: `/eventDetail/${id}`
          }}>
          
          View detail</Link>
          { isEdit && <button style={{margin: '1rem'}} className="btn btn-outline-success" onClick={ (e) => this.props.updateState(e,id)}>Edit</button>}
          { isEdit && (
          <>
          <button className="btn btn-outline-success" onClick={ (e) => this.props.deleteEvent(e,id)}>Delete</button>
          <br/>
          <hr/>
          Tickets
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
                  <button style={{margin: "1rem"}} className="btn btn-bg-info" onClick={(e) => this.updateState(e,ticket.id)}>Edit</button>
                  <button className="btn btn-bg-info" onClick={ (e) => this.deleteTicket(e,ticket.id)}>Delete</button>
                </div>

              )
            })
          )}

          <hr/>
          {!update ? <h6>Add new</h6>: <h6>Update</h6>} 
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Ticket Class" name="new_ticket_class" value={new_ticket_class} onChange={ this.handlechange }/>
                </div>
              </div>
              <div className="col"> <div className="form-group">
                  <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Descritption" name="new_description" value={new_description} onChange={ this.handlechange }/>
                </div></div>
              <div className="w-100"></div>
              <div className="col"> <div className="form-group">
                  <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Availablilty" name="new_availability" value={new_availability} onChange={ this.handlechange }/>
                </div></div>
              <div className="col"> <div className="form-group">
                  <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Price" name="new_price" value={new_price} onChange={ this.handlechange }/>
                </div></div>
            </div>
          </div>
          { !update ? <button className="btn btn-outline-primary" onClick={this.addNew}>Add</button> :  (
            <>
            <button style={{margin: "1rem"}} className="btn btn-outline-primary" onClick={this.updateTikcet}>Update</button>
            <button className="btn btn-outline-primary" onClick={this.cancelUpdate}>Cancel</button>

            </>
          )}
          </>
          )}
        </div>
        </div>
    )
  }
}
