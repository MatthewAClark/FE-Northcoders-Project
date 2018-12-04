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
            <p>There are currently no schedules set up that are due to depart in the next two hours. Please see 'Station Management' for more details.</p>
            
        </div>)
    }
}


export default ScheduleItems;