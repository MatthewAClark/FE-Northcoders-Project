import React, { Component } from 'react'
import DepartureBoard from './departureBoard'

class HomePage extends Component {
    render () {
        return (
            <div className="panel">
         <DepartureBoard stations={this.props.stations}/>
         <p>To add new schedules, select the 'Station Management' tab and follow the instructions</p>
        </div>
        ) 
    }
}

export default HomePage 