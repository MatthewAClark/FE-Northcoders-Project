import React from "react";
import Schedules from "./schedules";


const RouteItems = (props) => {
    if (props.routes.length > 0) {
        return (
            props.routes.map((route, i) => {

                let thisTally = { 'on_time': 0, 'total': 0 }
                props.routePerformance.forEach((elem, i) => {
                    if (elem.route_id === route.route_id) {

                        thisTally = elem

                    }
                })
                return (

                    <div key={i}>

                        <table className='table'><tbody>
                            <tr>
                                <td>
                                    <h2 className="title is-3">to {route.station_name}</h2>
                                </td>
                                <td>
                                    Running {thisTally.on_time_percent} on time
                           </td>
                                <td>
                                    <button onClick={(event) => {

                                        this.deleteRoute(i)
                                    }}>Delete Route</button>
                                </td>
                            </tr></tbody></table>



                        <Schedules route={route} route_id={route.route_id} station_code={props.station_code} dest_station_code={route.station_code} routePerformance={props.routePerformance} schedulePerformance={props.schedulePerformance} />

                    </div>


                )

            }))
    } else {
        return (<div>
            <p>No routes have been set up from this station. To set a route, select 'New Route' and then select a destination station.</p>
        </div>)
    }
}


export default RouteItems;