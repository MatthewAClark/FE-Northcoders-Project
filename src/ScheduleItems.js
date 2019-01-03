import React from "react";

const ScheduleItems = (props) => {

    if (props.schedules.length > 0) {
        return (
            
            props.schedules.map((schedule, i) => {
               
                    let thisTally2 = {'on_time': 0, 'total': 0}
                    props.schedulePerformance.forEach((elem, i) => {
                        if(elem.train_uid === schedule.train_uid) {
                            
                                thisTally2 = elem
                            
                           
                        }
                    })

                    
                if(schedule.newData === true) {
              return (
                       <tr key={i}>
                          
               
                <td>{schedule.departure_time}</td><td>{schedule.train_arrival_destination}</td><td></td><td><button onClick={() => props.addSchedule(i)}>Track Schedule</button></td>
                </tr>
                
                
         
              )
            } else {
                return (
                <tr key={i}>
                          
                <td>{schedule.departure_time}</td><td>{schedule.train_arrival_destination}</td><td>{thisTally2.on_time_percent}</td><td><button onClick = { (event) => {
props.deleteSchedule(i)}}>Untrack Schedule</button></td>
                </tr>
                )
            }

            }))
    } else {
        return (<tr>
            <td>There are currently no schedules set up that are due to depart in the next two hours. Please see 'Station Management' for more details.</td>
            
        </tr>)
    }
}


export default ScheduleItems;