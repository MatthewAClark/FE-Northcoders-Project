import React from "react";

import { Link } from "react-router-dom";


const StationItems = (props) => {
    if (props.stations.length > 0) {
        return (
            <table className='table'>
                <tbody>
                    {props.stations.map((station, i) => {
                        return (
                            <tr className="tag is-large" key={i}>


                                <td>
                                    <Link to={`/stations/${station.station_id}`}>{station.station_name}</Link>
                                </td>
                                <td>
                                    <button onClick={(event) => {

                                        props.deleteStation(i)
                                    }}>Delete Station</button>
                                </td>

                            </tr>

                        )

                    }
                    )}
                </tbody>
            </table >

        )
    } else {
        return (<div>
            <p>No stations have currently been set up. To add a station, click 'New Station' and enter a railway station to add to the list.</p>
        </div>)
    }
}


export default StationItems;