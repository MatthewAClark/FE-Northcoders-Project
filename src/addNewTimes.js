import React from 'react'




const addNewTimes = (props) => {
    if (props.buttonClicked) {
        return (
        <div className="">
            <form className="text-white">
           
         
           <input className="pl-3" type="submit" value="add" name="createSchedule" onClick={props.createSchedule} />
           
            
          
           <label className="pl-3">Departure Time: </label>
            <input type="time" onChange={props.handleFromDepartureTime}/>
           
          
            <label className="pl-3">Offset: </label>
            <input type="time" onChange={props.handleToDepartureTime}/>
            

            
            <label className="pl-3">Date: </label>
            <input type="date" onChange={props.handleDate}/>

                  
                   <button className="pl-3" onClick={props.toggleButton}>Close</button>
           
        
        </form>
            </div>
        )
    } else {
        return <button className="button" onClick = {props.toggleButton}>New Times</button>
    }
}

export default addNewTimes;