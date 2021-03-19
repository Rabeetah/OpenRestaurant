import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const API ='http://localhost:4000/restaurantadmin/deal/editdeal/';


 export class EditDeal extends Component{
    constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

  }; 
   handleSubmit(id)
  {
      let name=this.refs.name.value;
      let total_bill=this.refs.total_bill.value;
      let description=this.refs.description.value;
      fetch(API+id, {
          method:'PUT',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name,
            total_bill,
            description
          })
      })
      .then(function(response) {
        if (response.ok) {
          alert('Deal updated Successfully')
          window.location.reload(false);
          return true;
              } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
            }
        })
          
    } 
 
    render(){
        return(
            
            <Modal
            {...this.props} 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
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
                <Form.Control type="text" ref="name"  placeholder="Update or edit name here" size="sm" defaultValue={this.props.deal_name}/>
            </Form.Group>
            <Form.Group controlId="formGroupLocation">
                <Form.Label>Total Bill</Form.Label>
                <Form.Control type="text" ref="total_bill" placeholder="Update or edit total_bill here" size="sm" defaultValue={this.props.deal_total_bill}/>
            </Form.Group>
            <Form.Group controlId="formGroupname">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" ref="description" placeholder="Update or edit description here" size="sm" defaultValue={this.props.deal_description}/>
            </Form.Group>
            
            <button className="butn" type="submit" onClick={()=>this.handleSubmit(this.props.deal_id)}>Update Deal</button>

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
    
   



 



 
