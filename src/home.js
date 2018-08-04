import React, { Component } from 'react'
import DepartureBoard from './departureBoard'

class HomePage extends Component {
    render () {
        return (
            <div class="panel">
         <DepartureBoard stations={this.props.stations}/>
        </div>
        ) 
    }
}

export default HomePage 