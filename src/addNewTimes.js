import React from 'react'




const addNewTimes = (props) => {
    if (props.buttonClicked) {
        return (<form>
           
            <input type="submit" value="add" name="createSchedule" onClick={props.createSchedule} />
            
            <label>Departure Time: </label>
             <input type="time" onChange={props.handleFromDepartureTime}/>
             <label>Offset: </label>
             <input type="time" onChange={props.handleToDepartureTime}/>
             <label>Date: </label>
             <input type="date" onChange={props.handleDate}/>

                   
                    <button onClick={props.toggleButton}>Close</button>
        </form>
        )
    } else {
        return <button onClick = {props.toggleButton}>New Times</button>
    }
}

export default addNewTimes;