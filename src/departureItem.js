import React, { Component } from "react";


const DepartureItem = (props) => {
//class DepartureItem extends Component {

  //  render() {
            return (
                <div class="card departureItem">
 
                    <h4 class="title is-4">{props.route.starting_station.station_name} to {props.route.finish_station.station_name}</h4>

                     <div class="card">
                    <table class="table">

                        <tbody>
                            <tr>
                                <td>Departure time</td><td>Train Destination</td><td>Status</td>
                            </tr>
                    {props.route.departures.map((departure, i) => {
                        return (
                            
                           
                                
                                <tr key={i}>
                                        <td>{departure.departure_time}</td><td>{departure.train_arrival_destination}</td><td>{departure.status}</td>
                                    </tr>
                                
                                )
                    })}
                    </tbody>
                    </table>
                </div>
                            </div>
                
            )
   
//    }


}





export default DepartureItem;