import React, { Component } from "react";
import Schedules from "./schedules";
import AddRoute from './addRoute';
import fetchUrl from './apiConfig';
import RouteItems from './RouteItems';
import { BrowserRouter, Route, Link } from "react-router-dom";



class Station extends Component {

  state = {
    station_id: 0,
    routes: [],
    station: {station_name:''},
    editClicked: false
  }

  createRoute = (event) => {
    event.preventDefault();


    fetch(fetchUrl.stationRoutes, {
      headers: new Headers({ "Content-Type": "application/json" }),
      method: 'POST',
      body: JSON.stringify({
        starting_station: this.props.match.params.station_id,
        finish_station: this.state.station_id
      })
    })
      .then(res => {
        return res.json();
      })
      .then(route => {
        // Find station from station list
        route = {
          station_code: this.props.stations.find(elem => {
            return (elem.station_id === route.finish_station)
          }).station_code,
          station_name: this.props.stations.find(elem => {
            return (elem.station_id === route.finish_station)
          }).station_name,
          finish_station: route.finish_station,
          starting_station: route.starting_station,
          route_id: route.route_id 
        }

        const newRoutes = this.state.routes.concat(route)
        

        this.setState({
          routes: newRoutes
        })
        console.log(this.state.routes)
      })

  }

  handleStationId = (event) => {
    const station_id = event.target.value
    this.setState({
      station_id : station_id
    })

  }

  // editHeader for Station component
  editHeader = (text, index) => {
    const { stations } = this.state
    const newStations = [...stations]
    newStations[index].stationName = text
    this.setState({
      lists: newStations
    }, () => {
      console.log('state updated')
    })
  }

  // Toggle button for stations
  toggleButton = (event) => {
    this.setState({
      buttonClicked: !this.state.buttonClicked
    })
  }

  // Edit button for lists
  editButton = (event) => {
    this.setState({
      editClicked: !this.state.editClicked
    })
  }

  deleteRoute = (i) => {

    fetch(`${fetchUrl.stationRoutes}/${this.state.routes[i].route_id}`, {
      headers: new Headers({ "Content-Type": "application/json" }),
      method: 'DELETE'
    })
      .then(res => res.json()).then(() => {
        const deleteList = this.state.routes.filter((elem, index) => (index !== i))
        this.setState({
          routes: deleteList
        })
      })
      .catch(console.log)
    
  }



  componentDidMount() {
    fetch(`${fetchUrl.stations}/${this.props.match.params.station_id}`)
      .then(res => {
        return res.json();
      })
      .then(stationData => {
        this.setState({
          station: stationData
        })
      })
   

    
  

  
 
  // console.log(this.state.station)


    fetch(`${fetchUrl.stationStart}/${this.props.match.params.station_id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data)
        this.setState({
          routes: data
        })
      })

  }


  




  render() {
   
     
     
    return (
      <div>
        <h1 class="title is-2">{this.state.station.station_name}</h1>
   

<RouteItems routes={this.state.routes} deleteRoute={this.deleteRoute} station_code={this.state.station.station_code}/>.



        
        <AddRoute stations={this.props.stations} currentStation={this.state.station.station_id} handleStationId={this.handleStationId} createRoute={this.createRoute} buttonClicked={this.state.buttonClicked} toggleButton={this.toggleButton} />

      </div>
    )
  }

}

export default Station;