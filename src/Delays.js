import React, { Component } from "react";
//import StationHeader from "./stationHeader" 





class Delays extends Component {

    state = {

        delays: [],
        train_operator: [],
        routes: []
    }


    componentDidMount() {



        fetch(`http://localhost:3000/api/db/delays/schedules`)

            .then(res => {
                console.log('test', res.status)
                if (res.status === 404) return []
                return res.json();
            })
            .then(body => {
                console.log(body)

                const train_operator = {}
                const routes = {}
                body.forEach((elem, i) => {

                    if (!train_operator[elem.train_operator]) {
                        train_operator[elem.train_operator] = {'operator': elem.train_operator, 'late': 0, 'on_time': 0, 'cancelled': 0, 'early': 0 }
                    }


                    if (!routes[elem.route_id]) {
                        routes[elem.route_id] = {'route_id': elem.route_id, 'start_id': elem.starting_station, 'finish_id': elem.finish_station, 'late': 0, 'on_time': 0, 'cancelled': 0, 'early': 0 }
                    }

                    if (elem.train_status === "LATE") {
                        train_operator[elem.train_operator].late++
                        routes[elem.route_id].late++ 
                    }
                    if (elem.train_status === "ON TIME") {
                        train_operator[elem.train_operator].on_time++
                        routes[elem.route_id].on_time++
                    }
                    if (elem.train_status === "CANCELLED") {
                        train_operator[elem.train_operator].cancelled++
                        routes[elem.route_id].cancelled++
                    }

                    if (elem.train_status === "EARLY") {
                        train_operator[elem.train_operator].early++
                        routes[elem.route_id].early++
                    }

                })



                this.setState({
                    delays: body,
                    train_operator: Object.values(train_operator),
                    routes: Object.values(routes)
                    
                })

                //     fetch(`http://localhost:3000/api/live/stationtimes/${this.props.station_code}`)
                //     .then(res => {
                //       console.log('test', res.status)
                //       if (res.status === 404) return []
                //       return res.json();
                //     })
                //     .then(live => {
                //       this.setState({ departures: body })
                //       console.log(live)
                //       // loop through departures
                //       body.forEach( (dep, index) => {
                //         const liveDeparture = live.departures.all.find(status => {
                //           console.log('train studd', status.train_uid, dep.train_uid)
                //           return (status.train_uid === dep.train_uid)
                //         })
                //         const departureUpdate = this.state.departures
                //         departureUpdate[index].status = liveDeparture.status
                //         this.setState({departures: departureUpdate})
                //         if(liveDeparture.status === 'LATE') {

                //         }

                //       })
                //     //  console.log('departure data',depData)
                //     })
                //     .catch(err => console.log(err))

                //   })
                //   .catch(err => console.log(err))
            })
    }





    render() {
        //const station = (props) => {
        return (
            <div className="delays">
                <h2 class="title is-2">Train Performance</h2>

                <h4 className="title is-4">Train operator</h4>

<table className="table">
    <tbody>
        <tr>
            <td></td><td>Early</td><td>On Time</td><td>Late</td><td>Cancelled</td>
            </tr>
                {this.state.train_operator.map((operator, i) => {

                    return (
                        <tr key={i}>
                            
                     <td>{operator.operator}</td><td>{operator.early}</td><td>{operator.on_time}</td><td>{operator.late}</td><td>{operator.cancelled}</td>
                     </tr>
                    )
                })}

        

            </tbody>
            </table>


<h4 className="title is-4">Train route</h4>

<table className="table">
    <tbody>
        <tr>
            <td></td><td>Early</td><td>On Time</td><td>Late</td><td>Cancelled</td>
            </tr>
                {this.state.routes.map((route, i) => {

            if(this.props.stations.length > 0) {
                    return (
                        
                        <tr key={i}>
                            {console.log(this.props.stations.find(station => (route.start_id === station.station_id)).station_name)}
                     <td>{this.props.stations.find(station => (route.start_id === station.station_id)).station_name} to<br/>{this.props.stations.find(station => (route.finish_id === station.station_id)).station_name}</td><td>{route.early}</td><td>{route.on_time}</td><td>{route.late}</td><td>{route.cancelled}</td>
                     </tr>
                    )}
                })}

        

            </tbody>
            </table>











            </div>



            )
    }
}




export default Delays