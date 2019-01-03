import React, { Component } from "react";

class LiveDepartures extends Component {

  state = {

    departures: ['']
  }


  componentDidMount() {

    //Display all stations from db on first load


    // fetch current time
    new Date().getTime();
    const dateTime = new Date(Date.now())
    const hours = dateTime.getHours()
    const minutes = dateTime.getMinutes()
    // const hours = 22
    let hours_limit = hours + 2
    if (hours > 21) hours_limit = 23
   

    fetch(`http://localhost:3000/api/db/departures/all/${this.props.station_id}/?departure_time_from=${hours}:${minutes}&departure_time_to=${hours_limit}:${minutes}`)

      .then(res => {
        
        if (res.status === 404) return []
        return res.json();
      })
      .then(body => {
       
        fetch(`http://localhost:3000/api/live/stationtimes/${this.props.station_code}`)
        .then(res => {
          
          if (res.status === 404) return []
          return res.json();
        })
        .then(live => {
          this.setState({ departures: body })
          
          // loop through departures
          body.forEach( (dep, index) => {
            const liveDeparture = live.departures.all.find(status => {

              return (status.train_uid === dep.train_uid)
            })
            const departureUpdate = this.state.departures
            departureUpdate[index].status = liveDeparture.status
            this.setState({departures: departureUpdate})
           

          })
       
        })
        .catch(err => console.log(err))
        
      })
      .catch(err => console.log(err))
  }





  render() {
   
    return (
      <div className="station">
      <table>
        <tbody>
          <tr>
            <td>Departing</td><td>For</td><td>Train Destination</td><td>Status</td>
          </tr>
          {this.state.departures.map((departure, i) => {

            return (
              <tr key={i}>
                <td>{departure.departure_time}</td><td>{departure.station_name}</td><td>{departure.train_arrival_destination}</td><td>{departure.status}</td>
              </tr>
            )
    
          }
          )}
      </tbody>
      </table>

        {// Header of list


          }<p>{this.props.station_name}</p>

          
      </div>
        );
      }
    }
    
    
    
    
export default LiveDepartures