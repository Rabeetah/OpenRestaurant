import React from 'react';
import './addrestaurant.css';
// import logo1 from '../assets/images/logo1.png';
import {Form, Button} from 'react-bootstrap'; 
var generator = require('generate-password');
/* import {Button} from 'antd'; */
const API = 'http://localhost:4000/superadmin/restaurant/addrestaurant';
const API1 = 'http://localhost:4000/superadmin/restaurantadmin/addadminrestaurant';
const API2= 'http://localhost:4000/superadmin/restaurant/restaurant/';


class Addrestaurant extends React.Component{
    constructor(props){
    super(props);
    this.Addrestaurant = this.Addrestaurant.bind(this);

    this.refresh=this.refresh.bind(this);
    this.state = {
      restaurants: {},
      admin:{},
      username:'', 
      name:'',
      location:'',
      counter:0,
    };
   
    

}
refresh=()=>{
  this.setState({counter:this.state.counter++});
}

Addrestaurant = async (e) =>{
  e.preventDefault();
  
  let name=this.refs.name.value;
  let location=this.refs.location.value;
  let username=this.refs.username.value;
  let password=this.refs.password.value;
  let restid;
  let restadmid;
let data={
  name:name,location:location
};

await fetch(API, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }})
  .then(res => res.json())
  .then(res => {
      restid = res._id
      
  })
  .catch((error => {
      console.error(error);
  })); 
let data1={
  username:username,
  password:password,
};
await fetch(API1, {
  method: "POST",
  body: JSON.stringify(data1),
  headers: {
    "Content-Type": "application/json"
  }}).then(res1 => res1.json())
  .then(res1 => {
      restadmid = res1._id
      
  })
  .catch((error => {
      console.error(error);
  })); 
  if(restid){
    this.addadmin(restid, restadmid)
  }
}

 addadmin(restid, restadmid) {
  fetch(API2+restid+'/restaurantadmin/'+restadmid , {
      method: "PUT",
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

render(){
    return(
        <center>

           
     <div className="div1">
       {/* <img src={logo1} alt="Logo" />  */}
         <h1>Add Restaurant</h1>
         <Form>
  <Form.Group controlId="formGroupname">
    <Form.Label>Restaurant details</Form.Label>
    <center>
    <Form.Control type="text" ref="name" placeholder="Enter Name of restauant" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
    </center>
  </Form.Group>
  <Form.Group controlId="formGroupLocation">
  
    <center>
    <Form.Control type="rext" ref="location" placeholder="Enter location of restaurant" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}} />
    </center>
  </Form.Group>
  <Form.Group controlId="formGroupname">
    <Form.Label>Restaurant admin details</Form.Label>
    <center>
    <Form.Control type="text" ref="username" placeholder="Enter username" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}} />
    </center>
  </Form.Group>
   <Form.Group controlId="formGroupname">
    <center>
    <Form.Control  type="password" ref="password" id="password" placeholder="Enter password" size="sm" style={{width:"50%", marginLeft:"20px", color:"black", float:"left" ,backgroundColor:"transparent",border:"1px solid black"}} />
    <Button className="pass" type="password"  size="sm" onClick={this.Generatepassword} >Generate</Button>
    </center>
  </Form.Group> 
  <Button className="butn" type="submit" onClick={this.Addrestaurant} >Add Restaurant</Button>

</Form>

            
   
         </div>
         </center>
          
        
    );
   

}
}
export default Addrestaurant