import React from 'react'

const NewStation = (props) => {
    if (props.buttonClicked) {
        return (<form>
            <input type="text" onChange={props.handleStationName} name="stationname" size="40" placeholder="Station name" />
            <input type="submit" value="add" name="addStation" onClick={props.createStation} />
            <button onClick={props.toggleButton}>Close</button>
        </form>
        )
    } else {
        return <button onClick = {props.toggleButton}>New Station</button>
    }
}

export default NewStation;