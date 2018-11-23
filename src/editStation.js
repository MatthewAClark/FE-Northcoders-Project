import React, { Component } from 'react'



class EditStation extends Component {

    state = {
        scheduleList: []
    }


    componentDidMount() {

        //Display all stations from db on first load
        // let fetchUrl;
    
        // fetchUrl = "http://localhost:3000/api/db/stations/"
    
    
        
        // // fetch all schedules for station from db
        // console.log(this.props.station_id)
        // fetch(`http://localhost:3000/api/db/departures/all/${this.props.station_id}/?departure_time_from=${hours}:${minutes}&departure_time_to=${hours + 2}:${minutes}`)
    
        //   .then(res => {
        //     if (res.status === 404) return []
        //     return res.json();
        //   })
        //   .then(body => {
        //     console.log(body)
        //     this.setState({ departures: body })
    
        //   })
      }


    render () {
        return (
            <div>
                station editor
            
        {/* <ScheduleList  /> */}
        {/* <ArticleList articleData={this.state.articleData} /> */}
        {/* <Input updateState={this.updateState}/> */}
       
        </div>
        )
        
    }

}

export default EditStation 

// // add Route to db
// createRoute = (event) => {
//     event.preventDefault();


//     // fetch departures from transportAPI
//     fetch(`http://localhost:3000/api/live/timetable/station/${start_stn_code}`)
//         .then(res => {
//             return res.json();
//         })
//         .then(routeData => {

//             // post new station to db
//             fetch(`http://localhost:3000/api/db/stations/`, {
//                 headers: new Headers({ "Content-Type": "application/json" }),
//                 method: 'POST',
//                 body: JSON.stringify({
//                     station_name: stationData.member[0].name,
//                     station_code: stationData.member[0].station_code
//                 })
//             })
//             .then(res => {
//                 return res.json();
//             })

//             // Add new station to DOM
//                 .then(data => {
//                    // if (res.status === 201) {
//                         const newStations = this.state.stations.concat(data)
//                         this.setState({
//                             stations: newStations
//                         })
//                    // }
//                 })


//         })
//     }

//     // 
//     handleStationName = (event) => {
//         const station_name = event.target.value
//         this.setState({
//             station_name
//         })

//     }

//     // editHeader for Station component
//     editHeader = (text, index) => {
//         const { stations } = this.state
//         const newStations = [...stations]
//         newStations[index].stationName = text
//         this.setState({
//             lists: newStations
//         }, () => {
//             console.log('state updated')
//         })
//     }

//     // Toggle button for stations
//     toggleButton = (event) => {
//         this.setState({
//             buttonClicked: !this.state.buttonClicked
//         })
//     }

//     // Edit button for lists
//     editButton = (event) => {
//         this.setState({
//             editClicked: !this.state.editClicked
//         })
//     }
