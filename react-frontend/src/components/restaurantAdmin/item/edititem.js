import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const API ='http://localhost:4000/restaurantadmin/item/edititem/';


 export class EditItem extends Component{
    constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

  }; 
   handleSubmit(eid)
  {
      let name=this.refs.name.value;
      let price=this.refs.price.value;
      let description=this.refs.description.value;
      fetch(API+eid, {
          method:'PUT',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name,
            price,
            description
          })
      })
      .then(function(response) {
        if (response.ok) {
          alert('Item updated Successfully')
         
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
                  Edit Item
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <center>
                <h1>Update</h1>
                <Form >
                    <Form.Group controlId="formGroupname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref="name"  placeholder="Update or edit name here" size="sm" defaultValue={this.props.item_name}/>
                    </Form.Group>
                    <Form.Group controlId="formGroupLocation">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" ref="price" placeholder="Update or edit price here" size="sm" defaultValue={this.props.item_price}/>
                    </Form.Group>
                    <Form.Group controlId="formGroupname">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" ref="description" placeholder="Update or edit description here" size="sm" defaultValue={this.props.item_description}/>
                    </Form.Group>
                    <button className="butn" type="submit" onClick={()=>this.handleSubmit(this.props.item_id)}>Update Item</button>
                </Form>
                </center>
                </div> 
              </Modal.Body>
              {/* <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer> */}
            </Modal>      
    );    
  }
}  
    
   



 



 
