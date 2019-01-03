import React from 'react'
import DepartureBoard from './departureBoard'

const HomePage = (props) => {

        return (
            
            <div className="panel">

         <DepartureBoard stations={props.stations} routePerformance={props.routePerformance} schedulePerformance={props.schedulePerformance}/>
         <p>This is where all the departures for the next two hours are displayed for your convenience. To manage the departures or add more, select the 'Station Management' tab and you will then be presented the options to add or remove schedules</p>
        </div>
        ) 
    }


export default HomePage 