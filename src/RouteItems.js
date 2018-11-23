import React from "react";
import Schedules from "./schedules";
import NewStation from './newStation';

import fetchUrl from './apiConfig';
import { BrowserRouter, Route, Link } from "react-router-dom";


const RouteItems = (props) => {
    if (props.routes.length > 0) {
        return (
            props.routes.map((route, i) => {
                return (
                    <div key={i}>
                        {console.log(route)}
                        <h2 class="title is-3">to {route.station_name}</h2><div><button onClick={(event) => {




                            this.deleteRoute(i)
                        }}>Delete Route</button>
                            {/* <button>Show times</button> */}
                        </div>

                        {/* <Link to={`/stations/${this.state.station.station_id}/schedules`}>Fetch New Schedules</Link> */}

                        <Schedules route_id={route.route_id} station_code={props.station_code} dest_station_code={route.station_code} />

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