import React from "react";


const DepartureItem = (props) => {

let thisTally = {'on_time': 0}
props.routePerformance.forEach((elem, i) => {
    if(elem.route_id === props.route.departures[0].route_id) {
        thisTally = elem
                
    }
})

        return (
            <div className="card departureItem">

                <table className='table'>
                    <tbody>
                        <tr>
                            <td><h4 className="title is-4">{props.route.starting_station.station_name} to {props.route.finish_station.station_name}</h4></td><td>{thisTally.on_time_percent} on time</td>
                        </tr>
                    </tbody>
                </table>
                

                <div className="card">
                    <table className="table">

                        <tbody>
                            <tr>
                                <td>Departure time</td><td>Train Destination</td><td>Status</td><td>On Time</td>
                            </tr>
                            {props.route.departures.map((departure, i) => {
                                let thisTally2 = {'on_time': 0}
                                
                                props.schedulePerformance.forEach((elem, i) => {
                                    if(elem.train_uid === departure.train_uid) {
                                        
                                            thisTally2 = elem
                               
                                    }
                                })

                                
                                return (

                                    <tr key={i}>
                                        <td>{departure.departure_time}</td><td>{departure.train_arrival_destination}</td><td>{departure.status}</td><td>{thisTally2.on_time_percent}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        )

    }

export default DepartureItem;