import React, { Component } from 'react';
import HomePage from './home'
import StationManagement from './stations'
import Schedules from './schedules'
import Station from './Station'
import Delays from './Delays'
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css'
import fetchUrl from './apiConfig'

// All railway stations are loaded at App level
// Load stations state - accessable to all components
class App extends Component {
  state = {
    stations: []
  }

  // Fetch all stations from backend DB
  componentDidMount() {
    // Display all stations from db on first load


    fetch(fetchUrl.stations)
      .then(res => {
        return res.json();
      })
      .catch(err => console.log(err))
      .then(body => {
        this.setState({ stations: body })
      })
      .catch(err => {throw err})
    // fetch(fetchUrl.allSchedules)
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(body => {
    //     this.setState({ schedules: body })
    //   })

  }

  deleteStation = (i) => {
    fetch(`${fetchUrl.stations}/${this.state.stations[i].station_id}`, {
      headers: new Headers({ "Content-Type": "application/json" }),
      method: 'DELETE'
    })
      .then(res => res.json()).then(() => {
        const deleteList = this.state.stations.filter((elem, index) => (index !== i))
        this.setState({
          stations: deleteList
        })
      })
      .catch(console.log)


  }
  // Update state with new station added
  addToDOMStation = (data) => {
    // if (res.status === 201) {
    const newStations = this.state.stations.concat(data)
    this.setState({
      stations: newStations
    })
  }


  render() {
    return (
      < BrowserRouter>
        <div>
          <header>

            {/* Navbar section */}
            <section className="hero is-primary">
              <div className="hero-body">
                <div className="container">
                  <h1 className="title">Personal Train App</h1>
                  <nav className="navbar">
                    <Link className="navbar-item" to="/">Home</Link>
                    <Link className="navbar-item" to="/stations">Station Management</Link>
                    <Link className="navbar-item" to="/delays">Train Performance</Link>
                  </nav>
                </div>
              </div>
            </section>
          </header>

          {/*Home page which displays departures*/}

          <Route exact path="/" render={(props) => (
            <HomePage {...props} stations={this.state.stations} />)} />

          <Route exact path="/stations" render={(props) => (
            <StationManagement {...props} stations={this.state.stations} addToDOMStation={this.addToDOMStation} deleteStation={this.deleteStation} />)} />

          <Route path="/stations/:station_id/schedules/" render={(props) => (<Schedules route_id={this.props.route.route_id} station_code={this.state.station.station_code} dest_station_code={this.props.route.station_code} />)} />

          <Route path="/delays/" render={(props) => (<Delays stations={this.state.stations} />)} />



          <Route exact path="/stations/:station_id" render={(props) => (
            <Station {...props} stations={this.state.stations} />)} />

        </div>
      </ BrowserRouter>
    );
  }
}

export default App;