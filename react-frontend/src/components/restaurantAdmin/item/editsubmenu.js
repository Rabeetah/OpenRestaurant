import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const API ='http://localhost:4000/restaurantadmin/submenu/editsubmenu/';


 export class EditSubmenu extends Component{
    constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }; 
   handleSubmit(sid)
  {
      let name=this.refs.name.value;
      fetch(API+sid, {
          method:'PUT',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name,
          })
      })
      .then(function(response) {
        if (response.ok) {
          alert('Submenu updated Successfully')
          
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
                    Edit Submenu
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                    <center>
            
                    <h1>Update</h1>
                    <Form >
                        <Form.Group controlId="formGroupname">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref="name"  placeholder="Update or edit name here" size="sm" defaultValue={this.props.submenu_name}/>
                        </Form.Group>
                        <button className="butn" type="submit" onClick={()=>this.handleSubmit(this.props.submenu_id)}>Update Submenu</button>
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
    
   
