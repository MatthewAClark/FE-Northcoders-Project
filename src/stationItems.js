import React from "react";
import NewStation from './newStation';

import fetchUrl from './apiConfig';
import { BrowserRouter, Route, Link } from "react-router-dom";


const StationItems = (props) => {
    if (props.stations.length > 0) {
        return (
            props.stations.map((station, i) => {
                return (
                    <div className="row mt-2 justify-content-md-center is-large" key={i}>
                        
                            <Link className="col-2 text-white" to={`/stations/${station.station_id}`}>{station.station_name}</Link>


                        <button className="col-2 " onClick={(event) => {

                            props.deleteStation(i)
                        }}>Delete Station</button>
                    </div>)

            }
            )
        )
    } else {
        return (<div>
            <p>No stations have currently been set up. To add a station, click 'New Station' and enter a railway station to add to the list.</p>
        </div>)
    }
}


export default StationItems;