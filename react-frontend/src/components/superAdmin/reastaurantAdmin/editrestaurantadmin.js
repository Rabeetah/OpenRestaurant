import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
// import logo2 from '../assets/images/logo2.png';
var generator = require('generate-password');
const API ='http://localhost:4000/superadmin/restaurantadmin/changeresadmin/';




/* import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';  */
 





 export class EditRestaurantAdmin extends Component{
    constructor(props){
    super(props);

    /*  this.state = {
      snackbaropen:false,
      snackbarmsg:'' 
    } */
     this.handleSubmit = this.handleSubmit.bind(this); 

   /*   snackbarClose =(event)=>{
    this.setState({snackbaropen:false});  */ 
  }; 
    handleSubmit(id)
  {
      let username=this.refs.username.value;
      let password=this.refs.password.value;

   
      fetch(API+id, {
          method:'PUT',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            username,
            password
          
         
          })
      })
      .then(function(response) {
        if (response.ok) {
          alert('Record updated Successfully')
          
              } 
              else
              {
         alert("failed")
        }})
          
  } 

 /*  Generatepassword(e){
    e.preventDefault()
    var inputbox=document.getElementById("password")
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    
    
    inputbox.value=password;
    alert(password)
   
    
    
    } */
     


     
  
    render(){
        return(
            
            <Modal
  {...this.props} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered

      
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Open Restaurant
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <center>
   
         <h1> Change </h1>
         <Form >
  <Form.Group controlId="formGroupname">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" ref="username"  placeholder="Enter name" size="sm" defaultValue={this.props.adname} />
  </Form.Group>
  <Form.Group controlId="formGroupname">
  <Form.Label>Password</Form.Label>
    <center>
    <Form.Control  type="password" ref="password" id="password" placeholder="Enter password" size="sm"  />
    {/* <Button className="pass" type="password"  size="sm" onClick={this.Generatepassword} style={{marginTop:"10px"}} >Generate</Button> */}
    </center>
  </Form.Group>
  
  
  <button className="butn" type="submit" onClick={()=>this.handleSubmit(this.props.admin_id)}>update admin</button>

</Form>
         </center>

            
          
         </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  
    
         
        
            
        );
    
    }
}  