import React, { Component } from "react";
//import StationHeader from "./stationHeader" 





class LiveDepartures extends Component {

  state = {

    departures: ['test']
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
        console.log(body)
        
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
              console.log('train studd', status.train_uid, dep.train_uid)
              return (status.train_uid === dep.train_uid)
            })
            const departureUpdate = this.state.departures
            departureUpdate[index].status = liveDeparture.status
            this.setState({departures: departureUpdate})
            // if(liveDeparture.status === 'LATE') {

            // }

          })
        //  console.log('departure data',depData)
        })
        .catch(err => console.log(err))
        
      })
      .catch(err => console.log(err))
  }





  render() {
    //const station = (props) => {
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

          {/* <StationHeader editButton={this.editButton} editClicked={this.state.editClicked} stationName={this.props.stationName} editHeader={this.props.editHeader} index={this.props.index}/> */}
      </div>
        );
      }
    }
    
    
    
    
export default LiveDepartures