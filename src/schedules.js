import React, {Component} from "react";
import AddNewTimes from "./addNewTimes";
import ScheduleItems from "./ScheduleItems";
import fetchUrl from "./apiConfig";

class Schedules extends Component {

    state = {
        fromTime: '',
        offset: '05:00',
        date: '',
        schedules: []
    }

componentDidMount() {
   
    fetch(`${fetchUrl.route}${this.props.route_id}`)

      .then(res => {
       
        if (res.status === 404) return []
        return res.json();
      })
      .then(body => {
      
        // Sort out array in departure time order
        body = body.sort((a,b) => {

            return Number(String(a.departure_time).slice(0,2)+String(a.departure_time).slice(3,5)) - Number(String(b.departure_time).slice(0,2)+String(b.departure_time).slice(3,5))
        })

        // So we know that the data is from the database
        body.forEach(elem => {
            elem.newData = false
        })
      //  console.log(test)
        this.setState({
            schedules: body
        })
    })
}

createSchedule = (event) => {
    event.preventDefault();
    fetch(`${fetchUrl.liveRoute}?station_from=${this.props.station_code}&station_to=${this.props.dest_station_code}&date=${this.state.date}&time=${this.state.fromTime}&offset=${this.state.offset}`, {
     
  })
  .then(res => {
      return res.json();
  })
  .then(newSchedules => {
   
newSchedules = newSchedules.departures.all.filter(newSchedule => {
    return !(this.state.schedules.find(oldSchedule => {
        return (newSchedule.train_uid === oldSchedule.train_uid)
    }))
})

let scheduleUpdate = []
newSchedules.forEach(schedule => {
    scheduleUpdate.push({
        arrival_time: schedule.aimed_arrival_time,
        departure_time: schedule.aimed_departure_time,
        newData: true,
        route_id: this.props.route_id,
        train_arrival_destination: schedule.destination_name,
        train_departure_origin: schedule.origin_name,
        train_operator: schedule.operator_name,
        train_uid: schedule.train_uid
    })

})

scheduleUpdate = [...this.state.schedules, ...scheduleUpdate]

        // Sort out array in departure time order
        scheduleUpdate = scheduleUpdate.sort((a,b) => {

            return Number(String(a.departure_time).slice(0,2)+String(a.departure_time).slice(3,5)) - Number(String(b.departure_time).slice(0,2)+String(b.departure_time).slice(3,5))
        })



//console.log(scheduleUpdate)

    this.setState({
        schedules: scheduleUpdate
    })

  })
    }


handleFromDepartureTime = (event) => {
    const fromTime= event.target.value
    this.setState({
       fromTime
    })

}

handleToDepartureTime = (event) => {
    const offset= event.target.value
    this.setState({
       offset
    })

}

handleDate = (event) => {
    const date= event.target.value
    this.setState({
       date
    })

}

// editHeader for Station component
editHeader = (text, index) => {
    const { schedules } = this.state
    const newSchedules = [...schedules]
  //  newSchedules[index].stationName = text
    this.setState({
        lists: newSchedules
    }, () => {
        console.log('state updated')
    })
}

// Toggle button for stations
toggleButton = (event) => {
    this.setState({
        buttonClicked: !this.state.buttonClicked
    })
}

// Edit button for lists
editButton = (event) => {
    this.setState({
        editClicked: !this.state.editClicked
    })
}

deleteSchedule = (i) => {

    fetch(`${fetchUrl.deleteSchedule}/${this.state.schedules[i].train_id}`, {
      headers: new Headers({ "Content-Type": "application/json" }),
      method: 'DELETE'
    })
       .then(res => res.json()).then(result => {
           console.log(result)
const newList = this.state.schedules.map((elem, index) => {
    if ((index === i)) {
        elem.newData = true
    }
    return elem
})
this.setState({
    schedules: newList
})
         })
       .catch(console.log)
    console.log(this.state.schedules[i])
    
  }

addSchedule = (index) => {
    
    fetch(fetchUrl.postSchedule, {
        headers: new Headers({ "Content-Type": "application/json" }),
        method: 'POST',
        body: JSON.stringify({
            "train_uid": this.state.schedules[index].train_uid,
            "train_departure_origin": this.state.schedules[index].train_departure_origin,
            "train_arrival_destination": this.state.schedules[index].train_arrival_destination,
            "arrival_time": this.state.schedules[index].arrival_time,
            "departure_time": this.state.schedules[index].departure_time,
            "train_operator": this.state.schedules[index].train_operator,
            "route_id": this.props.route_id
        })  
    })
    .then(result => {
        const tempSchedules = this.state.schedules
        tempSchedules[index].newData = false
        this.setState({
            schedules: tempSchedules
        })
    })
   

}


    render() {
        return( 
            <div style={{display:'flex', flexFlow: 'row wrap'}}> 
            <table class="table">
                   <tbody>
                       <ScheduleItems schedules={this.state.schedules} deleteSchedule={this.deleteSchedule} addSchedule={this.addSchedule}/>
            

            </tbody>
                </table>
            <AddNewTimes handleDate={this.handleDate} handleFromDepartureTime={this.handleFromDepartureTime} handleToDepartureTime={this.handleToDepartureTime} createSchedule={this.createSchedule} buttonClicked={this.state.buttonClicked} toggleButton={this.toggleButton}/>
            
            </div>
        )
    }

}

export default Schedules;