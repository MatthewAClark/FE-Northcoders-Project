import React from 'react'




const NewRoute = (props) => {
    if (props.buttonClicked) {
        return (<form>
            {/* <input type="text" onChange={props.handleStationName} name="stationname" size="40" placeholder="Station name" /> */}
            <input type="submit" value="add" name="addStation" onClick={props.createRoute} />
            
            {/* Look into bug */}
                    <select name="station" onChange={props.handleStationId}>
                    <option value="Station">Station</option>

                    {props.stations.filter(elem => {
                        return (elem.station_id !== props.currentStation)
                        }).map(station => {
                        return (
                            <option value={station.station_id}>{station.station_name}</option>
                        )
                    })}
                       
                    </select>

                   
                    <button onClick={props.toggleButton}>Close</button>
        </form>
        )
    } else {
        return <button className="button" onClick = {props.toggleButton}>New Route</button>
    }
}

export default NewRoute;