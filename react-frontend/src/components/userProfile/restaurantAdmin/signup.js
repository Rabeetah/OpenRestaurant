import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap'; 
import {
  Alert
} from 'reactstrap';
import '../../superAdmin/restaurant/addrestaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../flux/actions/restaurantAdmin/authActions';
import { clearErrors } from '../../../flux/actions/restaurantAdmin/errorActions';

class RegisterModal extends Component {
    state = {
        modal : false,
        username : '',
        name : '',
        email : '',
        phonenumber : '',
        password : '',
        image: null,
        msg : null
    }

  static propTypes = {
      isAuthenticated : PropTypes.bool,
      error : PropTypes.object.isRequired,
      register : PropTypes.func.isRequired,
      clearErrors : PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps){
    const{ error, isAuthenticated } = this.props;
    if(error !== prevProps.error)
    {
      //check for register error
      if(error.id === 'REGISTER_FAIL'){
        this.setState({ msg : error.msg.msg })
      }
      else
      {
        this.setState({ msg : "success" })
      }
    }
    

  }

  // toggle = () => {
  //   //Clear errors
  //   this.props.clearErrors();
  //     this.setState ({
  //         modal : !this.state.modal
  //     });
  // };

  onChange = e => {
      this.setState({ [e.target.name] : e.target.value });
  };

  // uploadImage = (name) => (event) => {
  //   const value = name === 'image' ? event.target.files[0] : event.target.value;
  //   const fileSize = name === 'image' ? event.target.files[0].size : 0;
  //   this.restAdminData.set(name, value);
  //   this.setState({ [name]: value, fileSize })
  // };

  

  onSubmit = async (e) => {
      e.preventDefault();
      const { name, username, email, phonenumber, password, image, restownername, restname, restlocation, restlogo } = this.state;
      //create user object
      const newUser = {
        name,
        username,
        email,
        phonenumber,
        password,
        image,
        restownername,
        restname, 
        restlocation,
        restlogo
      };
      //Attempt to register
      this.props.register(newUser);
      // window.location.reload();
  }


  render(){
    return (
      <div>
        {this.state.msg ? <Alert color="success">{ this.state.msg }</Alert> : null}
        <Form onSubmit={this.onSubmit}>
          <Form.Group >
            <Form.Label>Restaurant Admin details</Form.Label>
            <center>
            <Form.Control type="text" name="name" id="name" ref="name" onChange={this.onChange} placeholder="Enter name of restaurant admin" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="text" name="username" id="username" ref="username" onChange={this.onChange} placeholder="Enter username of restaurant admin" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="email" name="email" id="email" ref="email" onChange={this.onChange} placeholder="Enter email of restaurant admin" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="text" name="phonenumber" id="phonenumber" ref="phonenumber" onChange={this.onChange} placeholder="Enter phonenumber of restaurant admin" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="password" name="password" id="password" ref="password" onChange={this.onChange} placeholder="Enter password of restaurant admin" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          {/* <Form.Group >
            <center>
            <Form.Control 
            onChange={this.uploadImage("image")}
            type="file"
            id="image"
            name="image"
            id="image"
            ref="image"
            accept="image/*"
            placeholder="Upload profile picture" 
            size="sm" 
            style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}} />
            </center>
          </Form.Group> */}
          <Form.Group >
          <Form.Label>Restaurant details</Form.Label>
            {/* <center>
            <Form.Control type="text" name="restownername" id="restownername" ref="restownername" onChange={this.onChange} placeholder="Enter owner's name of restaurant" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center> */}
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="text" name="restname" id="restname" ref="restname" onChange={this.onChange} placeholder="Enter name of restaurant" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}} />
            </center>
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="text" name="restlocation" id="restlocation" ref="restlocation" onChange={this.onChange} placeholder="Enter location of restaurant" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}} />
            </center>
          </Form.Group>
          {/* <Form.Group >
            <center>
            <Form.Control type="file" name="restlogo" id="restlogo" ref="restlogo" onChange={this.onChange} placeholder="Enter logo of restaurant" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}} />
            </center>
          </Form.Group> */}
          <Button className="butn" type="submit">Add Restaurant</Button>
        </Form>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors }
)(RegisterModal);

