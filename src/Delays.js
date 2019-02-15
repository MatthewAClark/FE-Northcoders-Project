import React from "react";

    const Delays = (props) => {

        return (

            <div className="delays">
                <h2 className="title is-2">Performance Summary</h2>

                

                <table className="table">
                    <tbody>
                    

                        <tr><td rowSpan="2"></td> <td rowSpan="2">On Time</td><td rowSpan="2">Cancelled</td><td colSpan="5">Late %</td></tr>
                        
                        <tr><td>5 Minutes or less</td><td>6 to 15 Minutes</td><td>15 to 30 Minutes</td><td>Over 30 Minutes</td><td>Late Total</td></tr>

                        <tr><td colSpan="8"><h4 className="title is-4">Train operator</h4></td></tr>

                        {props.operatorPerformance.map((operator, i) => {

                            return (
                                <tr key={i}>

                                    <td>{operator.operator}</td>
                                    <td>{operator.on_time_percent}</td>
                                    <td>{operator.cancelled_percent}</td>

                                 
                                            <td>{operator.late1_percent}</td>
                                            <td>{operator.late2_percent}</td>
                                            <td>{operator.late3_percent}</td>
                                            <td>{operator.late4_percent}</td>
                                            <td>{operator.late_percent}</td>


                                </tr>
                            )

                        })}

                    {/* </tbody></table> */}
                    {/* <tr><td></td></tr> */}
<tr>
                <td colSpan="8"><h4 className="title is-4">Train Routes</h4></td>
                </tr>
                {/* <tr><td></td></tr> */}

                {/* <table className="table">
                    <tbody> */}

                    {/* <tr><td rowSpan="2"></td> <td rowSpan="2">On Time</td><td rowSpan="2">Cancelled</td><td colSpan="5">Late %</td></tr>
                        
                        <tr><td>5 Minutes or less</td><td>6 to 15 Minutes</td><td>15 to 30 Minutes</td><td>Over 30 Minutes</td><td>Late Total</td></tr> */}

                        {props.routePerformance.map((route, i) => {
                         
                            return (
                                <tr key={i}>

                                    <td>{route.route_start_station} to {route.route_end_station}</td>
                                    <td>{route.on_time_percent}</td>
                                    <td>{route.cancelled_percent}</td>

                                    

                                                <td>{route.late1_percent}</td>
                                                <td>{route.late2_percent}</td>
                                                <td>{route.late3_percent}</td>
                                                <td>{route.late4_percent}</td>
                                                <td>{route.late_percent}</td>

                                        
                                       

                                </tr>
                            )

                        })}

                    </tbody></table>

            </div>

        )
    }


export default Delays