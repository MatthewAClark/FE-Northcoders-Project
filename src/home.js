import React, { Component } from 'react'
import DepartureBoard from './departureBoard'

class HomePage extends Component {
    render () {
        return (
        //     <div className="panel">
                
            

        
        // </div>

        <div className="container home">
<div className="jumbotron opacity bg-dark text-white">
  <h1 className="display-4">Live Departures</h1>
  {/* <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p> */}
  <hr className="my-4"/>
    <DepartureBoard stations={this.props.stations}/>
        
  <a className="btn btn-primary btn-lg" href="/stations" role="button">Add More</a>

        </div>
       
</div>
        ) 
    }
}

export default HomePage 