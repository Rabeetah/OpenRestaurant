import React from 'react';
// import logo1 from '../assets/images/logo1.png'; 
import '../../superAdmin/restaurant/addrestaurant.css';
import {Form, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
var generator = require('generate-password');
const API = 'http://localhost:4000/restaurantadmin/waiter/addwaiter';

class addwaiter extends React.Component {
  constructor(props) {
    super(props);
    this.addwaiter = this.addwaiter.bind(this);
    this.refresh=this.refresh.bind(this);
    this.state = {
      waiters: {},
      name:'',
      username:'',
      password:'',
      counter:0
    };
  }
  refresh=()=>{
    this.setState({counter:this.state.counter++});
  }
  addwaiter(e) {
    e.preventDefault();
    
    let email=this.refs.email.value;
    let username=this.refs.username.value;
    let password=this.refs.password.value;
  let data={
    email,username,password
  };
  fetch(API, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }}).then(function(response) {
      if (response.ok) {
        alert('Record Added Successfully')    
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    })
  this.refresh();
  }

  Generatepassword(e){

    e.preventDefault()
    var inputbox=document.getElementById("password")
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    inputbox.value=password; 
    }
    render() {
        return (
            <center>   
                <div className="div1">
                {/* <img src={logo1} alt="Logo" />  */}
                    <h1>Add waiter</h1>
                    <Form>
                        <Form.Group controlId="formGroupname">
                        <Form.Label>Waiter details</Form.Label> 
                            <center>
                            <Form.Control type="text" ref="username" placeholder="Enter Username" size="sm" style={{width:"70%", color:"black", backgroundColor:"transparent",border:"1px solid black"}} />
                            </center>
                        </Form.Group>
                        <Form.Group controlId="formGroupname">
                        
                        <center>
                        <Form.Control type="text" ref="email" placeholder="Enter Email" size="sm" style={{width:"70%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
                        </center>
                        </Form.Group>
                        <Form.Group controlId="formGroupname">
                            <center>
                            <Form.Control  type="password" ref="password" id="password" placeholder="Enter password" size="sm" style={{width:"40%",marginLeft:"53px", color:"black", float:"left" ,backgroundColor:"transparent",border:"1px solid black"}} />
                            <Button className="pass" type="password"  size="sm" onClick={this.Generatepassword} >Generate</Button>
                            </center>
                        </Form.Group> 
                        <Button className="butn" type="submit" onClick={this.addwaiter} >Add waiter</Button>
                    </Form>
                </div>
            </center>
        );
    }
  }

export default addwaiter