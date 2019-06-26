import React, { Component } from "react";


const DepartureItem = (props) => {
//class DepartureItem extends Component {

  //  render() {
            return (

                

            
                    <tr>
                    <td>{props.route.starting_station.station_name} to {props.route.finish_station.station_name}</td>
                   
                    
                    
                    

                   

{props.route.departures.map((departure, i) => {
    if (departure.status != "LATE") {
        
        return (
                            
                           
                                
            <td className="liveTime" key={i}>
                    {departure.expected_departure_time}

                    {/* <td>{departure.train_arrival_destination}</td><td></td> */}
                </td>
            
            )
    }

    if (departure.status == "LATE") {
        
        return (
                            
                           
                                
            <td className="bg-danger text-white" key={i}>
                    <i className="fas fa-exclamation-triangle"></i> {departure.expected_departure_time}

                    {/* <td>{departure.train_arrival_destination}</td><td></td> */}
                </td>
            
            )
    }

    if (departure.status == "CANCELLED") {
        return (
                            
                           
                                
            <td className="text-danger" key={i}>
                    CANCELLED

                    {/* <td>{departure.train_arrival_destination}</td><td></td> */}
                </td>
            
            )
    }
                       
                    })}
                    
                            </tr>
                
            )
   
//    }


}





export default DepartureItem;