import React, { Component } from 'react'

class Input extends Component {
    state = {
        departureStation: "",
        arrivalStation: "",
        date: "",
        time: ""
    }

    handleDepStationChange = (event) => {
        this.setState({
            departureStation: event.target.value,
        })
    }

    handleArrStationChange = (event) => {
        this.setState({
            arrivalStation: event.target.value,
        })
    }

    handleDateChange = (event) => {
        this.setState({
            date: event.target.value,
        })
    }

    handleTimeChange = (event) => {
        this.setState({
            time: event.target.value,
        })
    }



    render() {
        return (
            <div>
                <h2>Choose route</h2>
                <form>
                    
                    <input name="departureStation" onChange={this.handleDepStationChange} placeholder="Enter station name" value={this.state.departureStation} />
                    <input name="arrivalStation" onChange={this.handleArrStationChange} placeholder="Enter station name" value={this.state.arrivalStation} />
                    <input type="date" name="departureStation" onChange={this.handleDateChange} placeholder="Date" value={this.state.date} />
                    <input type = "time" name="departureStation" onChange={this.handleTimeChange} placeholder="Time" value={this.state.time} />
                   
                </form>
            </div>
        );
    }

    newPost = (event) => {
        event.preventDefault()
        // Find the topic ID
        fetch('http://localhost:3000/api/topics', {
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                return res.find(elem => {
                    return elem.slug === this.state.inputTopic
                })
            })
            .then(res => {
                
                //    Use topic ID to post an article
                fetch(`http://localhost:3000/api/topics/${res._id}/articles`, {
                    headers: new Headers({ "Content-Type": "application/json" }),
                    method: 'POST',
                    body: JSON.stringify({
                        title: this.state.inputTitle,
                        body: this.state.inputBody
                    })
                })
                    .then(res => res.json()).then(this.props.addPostToDOM)
                    .catch(console.log)

            })
    }
}



export default Input