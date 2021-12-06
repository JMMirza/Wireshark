import React, { Component } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from 'react-select'
import Table from 'react-bootstrap/Table'
import axios from "axios";
const options = [
  { value: 'wlan0', label: 'WLAN' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default class SignUp extends Component {
    handleAxios(event){
        event.preventDefault();
        NotificationManager.info('Your request is processing just be hold');
        console.log(event.target.time.value); // reference by form input's `name` tag
        axios({
            method: "POST",
            url: "http://localhost:8080/submit",
            headers: {},
            data: {
                time: event.target.time.value
            },
          })
            .then(res => {
                console.log('Data send')
                NotificationManager.success(res.data, 'Success');
                console.log(res)
            })
            .catch(err =>{ 
                NotificationManager.error(err.response.data, 'Error');
                console.log(err.response)
            })
    }
    render() {
        return (
        <div>
            <div>
               <form onSubmit={this.handleAxios}>
                  <h3>Wireshark</h3>
                  <div className="form-group">
                     <label>Time in Seconds</label>
                     <input type="number" name = "time" className="form-control" placeholder="Estimated time" />
                  </div>
                  <div className="form-group">
                     <label>Interface</label>
                     <Select options={options} />
                  </div>
                  <button type="start" className="btn btn-dark btn-lg btn-block">Start</button>
                  {/* <button type="stop" className="btn btn-dark btn-lg btn-block">Stop</button> */}
               </form>
               <NotificationContainer/>
            </div>
            <div>
               <Table responsive>
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>IP Address</th>
                        <th>Destination</th>
                        <th>URL</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>1</td>
                     </tr>
                     <tr>
                        <td>2</td>
                     </tr>
                     <tr>
                        <td>3</td>
                     </tr>
                  </tbody>
               </Table>
            </div>
         </div>
         )
    }
    
}
