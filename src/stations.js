import React, { Component } from "react";
import NewStation from './newStation';


import fetchUrl from './apiConfig';
import { BrowserRouter, Route, Link } from "react-router-dom";
import StationItems from "./stationItems";

//const StationManagement = (props) => {
class StationManagement extends Component {

    state = {
        buttonClicked: false
    }

    createStation = (event) => {
        event.preventDefault();


        // fetch new station from transportAPI
        console.log(fetchUrl.liveStation, this.state.station_name)
        fetch(`${fetchUrl.liveStation}/${this.state.station_name}`)
            .then(res => {
                return res.json();
            })
            .then(stationData => {

                // post new station to db
                fetch(fetchUrl.postStation, {
                    headers: new Headers({ "Content-Type": "application/json" }),
                    method: 'POST',
                    body: JSON.stringify({
                        station_name: stationData.member[0].name,
                        station_code: stationData.member[0].station_code
                    })
                })
                    .then(res => {
                        return res.json();
                    })


                    // Add new station to DOM
                    .then(data => {

                        this.props.addToDOMStation(data)

                    })

            })
    }
    handleStationName = (event) => {
        const station_name = event.target.value
        this.setState({
            station_name
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

    render() {
        return (
                <div class="card">
                    <h1 class="title is-2">Station Management</h1>
                    <h3 class="title is-3">Stations</h3>
                
                <StationItems stations={this.props.stations} deleteStation={this.props.deleteStation}/>

                       
                    <div>
                    <NewStation handleStationName={this.handleStationName} createStation={this.createStation} buttonClicked={this.state.buttonClicked} toggleButton={this.toggleButton} />
</div>
<p>This is a list of railway stations that have been set up and two or more stations are required in order to set a route between them. To set a route, select a station and this will present you with further options for the routes.</p>
                </div>
           
        )
    }


}





export default StationManagement;