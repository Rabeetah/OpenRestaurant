import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
// import logo2 from '../assets/images/logo2.png';
const API ='http://localhost:4000/superadmin/restaurant/editres/';


/* import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';  */


 export class EditRestaurant extends Component{
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
      let name=this.refs.name.value;
      let location=this.refs.location.value;
   
      fetch(API+id, {
          method:'PUT',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name,
            location,
         
          })
      })
      .then(function(response) {
        if (response.ok) {
          alert('Record updated Successfully')
          
              } 
        else {
          alert("failed")
        }})
    
  } 
    


     
  
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
   
         <h1>Update</h1>
         <Form >
  <Form.Group controlId="formGroupname">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" ref="name"  placeholder="Enter Name of restauant" size="sm" defaultValue={this.props.resname} />
  </Form.Group>
  <Form.Group controlId="formGroupLocation">
    <Form.Label>Location</Form.Label>
    <Form.Control type="rext" ref="location" placeholder="Enter location of restaurant" size="sm" defaultValue={this.props.resloc}/>
  </Form.Group>
 {/*  <Form.Group controlId="formGroupname">
    <Form.Label>Restaurant admin</Form.Label>
    <Form.Control type="text" ref="username" placeholder="Enter username" size="sm" defaultValue={this.props.resadmin} />
  </Form.Group> */}
  
  <button className="butn" type="submit" onClick={()=>this.handleSubmit(this.props.restaurant_id)}>update Restaurant</button>

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