import React, { Component } from 'react';
import HomePage from './home'
import StationManagement from './stations'

import Station from './Station'
import Delays from './Delays'
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css'
import fetchUrl from './apiConfig'

// All railway stations are loaded at App level
// Load stations state - accessable to all components
class App extends Component {
  state = {
    stations: [],
    delays: [],
    train_operator: [],
    routePerformance: [],
    schedulePerformance: [],
    stationPerformance: [],
    operatorPerformance: []
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
      .catch(err => { throw err })

    fetch(fetchUrl.delaySchedules)

      .then(res => {

        if (res.status === 404) return []
        return res.json();
      })
      .then(body => {

        const train_operator = {}
        const routes = {}
        const train_uid = {}
        const stations = {}
        body.forEach((elem, i) => {

          if (!train_operator[elem.train_operator]) {
            train_operator[elem.train_operator] = { 'operator': elem.train_operator, 'late': 0, 'late1': 0, 'late2': 0, 'late3': 0, 'late4': 0, 'on_time': 0, 'cancelled': 0, 'early': 0, 'total': 0 }

          }

          if (!train_uid[elem.train_uid]) {

            train_uid[elem.train_uid] = { 'train_uid': elem.train_uid, 'late': 0, 'late1': 0, 'late2': 0, 'late3': 0, 'late4': 0, 'on_time': 0, 'cancelled': 0, 'early': 0, 'total': 0, 'on_time_percent': 'No Data' }

          }


          if (!routes[elem.route_id]) {
           
             routes[elem.route_id] = {'route_start_station': this.state.stations.find(station => (elem.starting_station === station.station_id)).station_name, 'route_end_station': this.state.stations.find(station => (elem.finish_station === station.station_id)).station_name, 'route_id': elem.route_id, 'start_id': elem.starting_station, 'finish_id': elem.finish_station, 'late': 0, 'late1': 0, 'late2': 0, 'late3': 0, 'late4': 0, 'on_time': 0, 'cancelled': 0, 'early': 0, 'total': 0 }
           
          }

          if (!stations[elem.starting_station]) {
            stations[elem.starting_station] = { 'route_id': elem.route_id, 'start_id': elem.starting_station, 'finish_id': elem.finish_station, 'late1': 0, 'late2': 0, 'late3': 0, 'late4': 0, 'on_time': 0, 'cancelled': 0, 'early': 0, 'total': 0 }
          }

          

          train_operator[elem.train_operator].total++
          routes[elem.route_id].total++
          train_uid[elem.train_uid].total++
          stations[elem.starting_station].total++

          if (elem.train_status === "LATE") {
            train_operator[elem.train_operator].late++
            train_uid[elem.train_uid].late++
            routes[elem.route_id].late++
            stations[elem.starting_station].late++

            let delay = (elem.departure_time, elem.expected_departure_time, (new Date("1970-1-1 " + elem.expected_departure_time) - new Date("1970-1-1 " + elem.departure_time)) / 1000 / 60)
            if (delay <= 5) routes[elem.route_id].late1++
            if (delay <= 5) train_operator[elem.train_operator].late1++
            if (delay <= 5) train_uid[elem.train_uid].late1++
            if (delay <= 5) stations[elem.starting_station].late1++

            if (delay > 5 && delay <= 15) routes[elem.route_id].late2++
            if (delay > 5 && delay <= 15) train_operator[elem.train_operator].late2++
            if (delay > 5 && delay <= 15) train_uid[elem.train_uid].late2++
            if (delay > 5 && delay <= 15) stations[elem.starting_station].late2++

            if (delay > 15 && delay <= 30) routes[elem.route_id].late3++
            if (delay > 15 && delay <= 30) train_operator[elem.train_operator].late3++
            if (delay > 15 && delay <= 30) train_uid[elem.train_uid].late3++
            if (delay > 15 && delay <= 30) stations[elem.starting_station].late3++

            if (delay > 30) routes[elem.route_id].late4++
            if (delay > 30) train_operator[elem.train_operator].late4++
            if (delay > 30) train_uid[elem.train_uid].late4++
            if (delay > 30) stations[elem.starting_station].late4++
              
          } else
            
            if (elem.train_status === "CANCELLED") {
              train_operator[elem.train_operator].cancelled++
              routes[elem.route_id].cancelled++
              train_uid[elem.train_uid].cancelled++
              stations[elem.starting_station].cancelled++

            } else {
              train_operator[elem.train_operator].on_time++
              routes[elem.route_id].on_time++
              train_uid[elem.train_uid].on_time++
              stations[elem.starting_station].on_time++
            }

          // % calculations
          routes[elem.route_id].on_time_percent = Math.round((routes[elem.route_id].on_time / routes[elem.route_id].total) * 100) + '%';
          train_operator[elem.train_operator].on_time_percent = Math.round((train_operator[elem.train_operator].on_time / train_operator[elem.train_operator].total) * 100) + '%';
          train_uid[elem.train_uid].on_time_percent = Math.round((train_uid[elem.train_uid].on_time / train_uid[elem.train_uid].total) * 100) + '%';
          stations[elem.starting_station].on_time_percent = Math.round((stations[elem.starting_station].on_time / stations[elem.starting_station].total) * 100) + '%';

          routes[elem.route_id].late_percent = Math.round((routes[elem.route_id].late / routes[elem.route_id].total) * 100) + '%';
          train_operator[elem.train_operator].late_percent = Math.round((train_operator[elem.train_operator].late / train_operator[elem.train_operator].total) * 100) + '%';
          train_uid[elem.train_uid].late_percent = Math.round((train_uid[elem.train_uid].late / train_uid[elem.train_uid].total) * 100) + '%';
          stations[elem.starting_station].late_percent = Math.round((stations[elem.starting_station].late / stations[elem.starting_station].total) * 100) + '%';

          routes[elem.route_id].late1_percent = Math.round((routes[elem.route_id].late1 / routes[elem.route_id].total) * 100) + '%';
          train_operator[elem.train_operator].late1_percent = Math.round((train_operator[elem.train_operator].late1 / train_operator[elem.train_operator].total) * 100) + '%';
          train_uid[elem.train_uid].late1_percent = Math.round((train_uid[elem.train_uid].late1 / train_uid[elem.train_uid].total) * 100) + '%';
          stations[elem.starting_station].late1_percent = Math.round((stations[elem.starting_station].late1 / stations[elem.starting_station].total) * 100) + '%';

          routes[elem.route_id].late2_percent = Math.round((routes[elem.route_id].late2 / routes[elem.route_id].total) * 100) + '%';
          train_operator[elem.train_operator].late2_percent = Math.round((train_operator[elem.train_operator].late2 / train_operator[elem.train_operator].total) * 100) + '%';
          train_uid[elem.train_uid].late2_percent = Math.round((train_uid[elem.train_uid].late2 / train_uid[elem.train_uid].total) * 100) + '%';
          stations[elem.starting_station].late2_percent = Math.round((stations[elem.starting_station].late2 / stations[elem.starting_station].total) * 100) + '%';

          routes[elem.route_id].late3_percent = Math.round((routes[elem.route_id].late3 / routes[elem.route_id].total) * 100) + '%';
          train_operator[elem.train_operator].late3_percent = Math.round((train_operator[elem.train_operator].late3 / train_operator[elem.train_operator].total) * 100) + '%';
          train_uid[elem.train_uid].late3_percent = Math.round((train_uid[elem.train_uid].late3 / train_uid[elem.train_uid].total) * 100) + '%';
          stations[elem.starting_station].late3_percent = Math.round((stations[elem.starting_station].late3 / stations[elem.starting_station].total) * 100) + '%';

          routes[elem.route_id].late4_percent = Math.round((routes[elem.route_id].late4 / routes[elem.route_id].total) * 100) + '%';
          train_operator[elem.train_operator].late4_percent = Math.round((train_operator[elem.train_operator].late4 / train_operator[elem.train_operator].total) * 100) + '%';
          train_uid[elem.train_uid].late4_percent = Math.round((train_uid[elem.train_uid].late4 / train_uid[elem.train_uid].total) * 100) + '%';
          stations[elem.starting_station].late4_percent = Math.round((stations[elem.starting_station].late4 / stations[elem.starting_station].total) * 100) + '%';

          routes[elem.route_id].cancelled_percent = Math.round((routes[elem.route_id].cancelled / routes[elem.route_id].total) * 100) + '%';
          train_operator[elem.train_operator].cancelled_percent = Math.round((train_operator[elem.train_operator].cancelled / train_operator[elem.train_operator].total) * 100) + '%';
          train_uid[elem.train_uid].cancelled_percent = Math.round((train_uid[elem.train_uid].cancelled / train_uid[elem.train_uid].total) * 100) + '%';
          stations[elem.starting_station].cancelled_percent = Math.round((stations[elem.starting_station].cancelled / stations[elem.starting_station].total) * 100) + '%';

        

        })

        this.setState({
          delays: body,
          operatorPerformance: Object.values(train_operator),
          routePerformance: Object.values(routes),
          schedulePerformance: Object.values(train_uid),
          stationPerformance: Object.values(stations)
        })


      })

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

      // < BrowserRouter>
//         <div>
//           <header>

//             {/* Navbar section */}
           
//             <section className="is-dark">
            
             
                  
//                   <nav className="navbar bg-dark">
//                   <div className="container">
//                     <Link className="navbar-item bg-dark text-white" to="/">Home</Link>
//                     <Link className="navbar-item bg-dark text-white" to="/stations">Station Management</Link>
//                     <Link className="navbar-item bg-dark text-white" to="/delays">Train Performance</Link>
//                     </div>
//                   </nav>
                  
//             </section>
           
//           </header>

//           {/*Home page which displays departures*/}

//           <Route exact path="/" render={(props) => (
//             <HomePage {...props} stations={this.state.stations} />)} />

//           <Route exact path="/stations" render={(props) => (
//             <StationManagement {...props} stations={this.state.stations} addToDOMStation={this.addToDOMStation} deleteStation={this.deleteStation} />)} />

//           <Route path="/stations/:station_id/schedules/" render={(props) => (<Schedules route_id={this.props.route.route_id} station_code={this.state.station.station_code} dest_station_code={this.props.route.station_code} />)} />

//           <Route path="/delays/" render={(props) => (<Delays stations={this.state.stations} />)} />



//           <Route exact path="/stations/:station_id" render={(props) => (
//             <Station {...props} stations={this.state.stations} />)} />

// <footer className="bg-dark"></footer>
//         </div>
       
//       </ BrowserRouter>

      < BrowserRouter>
        <div>
          <header>

{/* Navbar section */}
           
                        <section className="is-dark">
            
             
                  
                               <nav className="navbar bg-dark">
                               <div className="container">
                                 <Link className="navbar-item bg-dark text-white" to="/">Home</Link>
                                 <Link className="navbar-item bg-dark text-white" to="/stations">Station Management</Link>
                                 <Link className="navbar-item bg-dark text-white" to="/delays">Train Performance</Link>
                                 </div>
                               </nav>
                              
                         </section>
                       
                       </header>

           

          <Route exact path="/" render={(props) => (
            <HomePage {...props} stations={this.state.stations} routePerformance={this.state.routePerformance} schedulePerformance={this.state.schedulePerformance} />)} />

          <Route exact path="/stations" render={(props) => (
            <StationManagement {...props} stations={this.state.stations} addToDOMStation={this.addToDOMStation} deleteStation={this.deleteStation} routePerformance={this.state.routePerformance} schedulePerformance={this.state.schedulePerformance} />)} />

          <Route path="/delays/" render={(props) => (<Delays stations={this.state.stations} routePerformance={this.state.routePerformance} schedulePerformance={this.state.schedulePerformance} stationPerformance={this.state.stationPerformance} operatorPerformance={this.state.operatorPerformance}/>)} />

          <Route exact path="/stations/:station_id" render={(props) => (
            <Station {...props} stations={this.state.stations} routePerformance={this.state.routePerformance} schedulePerformance={this.state.schedulePerformance} stationPerformance={this.state.stationPerformance}/>)} />

        </div>
      </ BrowserRouter>
    );
  }
}

export default App;