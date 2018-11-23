import React from "react";
import Schedules from "./schedules";
import NewStation from './newStation';

import fetchUrl from './apiConfig';
import { BrowserRouter, Route, Link } from "react-router-dom";


const ScheduleItems = (props) => {
    if (props.schedules.length > 0) {
        return (
            props.schedules.map((schedule, i) => {
                if(schedule.newData === true) {
              return (
                       <tr key={i}>
                          
                <td>{schedule.departure_time}</td><td>{schedule.train_arrival_destination}</td><td><button onClick={() => props.addSchedule(i)}>Add Schedule</button></td>
                </tr>
                
                
         
              )
            } else {
                return (
                <tr key={i}>
                          
                <td>{schedule.departure_time}</td><td>{schedule.train_arrival_destination}</td><td><button onClick = { (event) => {
props.deleteSchedule(i)}}>Delete Schedule</button></td>
                </tr>
                )
            }

            }))
    } else {
        return (<div>
            <p>No schedules found for this route. To add schedules, select 'New Times' and fill in the following: </p>
            <p>Departure time - the times from when trains depart at this station</p>
            <p>Offset - How many hours:minutes ahead to look</p>
            <p>Date - The date at which to look</p>
        </div>)
    }
}


export default ScheduleItems;