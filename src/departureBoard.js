import React, { Component } from "react";
import DepartureItem from './departureItem'
import fetchUrl from './apiConfig'


//const DepartureBoard = (props) => {
class DepartureBoard extends Component {

    state = {
        routes: []
    }

    componentDidMount() {

        // fetch current time
        new Date().getTime();
        const dateTime = new Date(Date.now())
        const hours = dateTime.getHours()
        const minutes = dateTime.getMinutes()
        // const hours = 13

        // Fetch a window of schedules consisting of 2 hours worth of departures
        let hours_limit = hours + 2

        // so we don't overshoot over 24 hours
        if (hours > 21) hours_limit = 23

        // Display all routes over the next 2 hours from db on first load

        fetch(`${fetchUrl.routes}/?from=${hours}:${minutes}&to=${hours_limit}:${minutes}`)
            .then(res => {
                
                return res.json();
            })
            .then(schedules => {

                fetch(fetchUrl.stations)
                    .then(res => {
                        return res.json();
                    })
                    .then(allStations => {

                        // Group schedules by route ID. Get the start and end stations from table so we can display it in the browser

                        // Store the start and end station IDs in 2 arrays
                        const startIds = []
                        const endIds = []
                        const routeIds = []
                        schedules.forEach(elem => {

                            if (routeIds.indexOf(elem.route_id) === -1) {
                                startIds.push(elem.starting_station)
                                endIds.push(elem.finish_station)
                                routeIds.push(elem.route_id)
                            }
                        })

                        // Find the starting and finish stations from the db fetched earlier and match them to the routes
                        const routes = []
                        for (let i = 0; i < routeIds.length; i++) {
                            routes.push({
                                starting_station: allStations.find(elem => {
                                    return (elem.station_id === startIds[i])
                                }),

                                finish_station: allStations.find(elem => {

                                    return (elem.station_id === endIds[i])
                                }),

                                departures: schedules.filter(elem => {

                                    return (elem.route_id === routeIds[i])
                                })
                            })

                        }

                        this.setState({ routes: routes })

                    })
                    .then(() => {

                        const liveData = Array(this.state.routes.length)
                        const liveStatus = []
                        const newStatus = this.state.routes

                        this.state.routes.forEach((route, i) => {
                            liveStatus.push(new Promise(function (res, rej) {
                                res(
                                    fetch(`${fetchUrl.liveFetchDepBoard}/${route.starting_station.station_code}`)
                                        .then(res => {

                                            if (res.status === 404) return []
                                            return res.json();
                                        })
                                        .then(live => {


                                            // liveData.push(
                                             liveData[i] =   route.departures.map(elem => {
                                                    const elem2 = live.departures.all.find(status => {

                                                        return (elem.train_uid === status.train_uid)
                                                    })


                                                   return {...elem, ...elem2}
                                                })

                                        }))

                            }))

                        })


                        Promise.all(liveStatus)
                            .then(result => {

                                console.log(newStatus)
                                console.log(liveData)
                                liveData.forEach((data, i) => {
                                    newStatus[i].departures = data
                                })
                                console.log(newStatus)
                                this.setState({
                                    routes: newStatus
                                })
                            })






                    })

            })

    }



    render() {
     //   console.log(this.state.routes)
        if (this.state.routes.length > 0) {


            return (
                <div className="">
                    <h2 className="title is-2">Departures</h2>
                    {this.state.routes.map((route, i) => {

                        return (
                            <div key={i}>

                                <DepartureItem route={route} />
                            </div>
                        )
                    })}

                </div>
            )

        } else
            return (<div>
                <p>There are no train schedules set up that are due to depart at this time of day</p></div>)


    }
}




export default DepartureBoard;