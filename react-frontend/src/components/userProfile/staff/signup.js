import React, { Component } from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap'; 
import {
  Alert
} from 'reactstrap';
import '../../superAdmin/restaurant/addrestaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../flux/actions/staff/authActions';
import { clearErrors } from '../../../flux/actions/staff/errorActions';

class RegisterModal extends Component {
    state = {
        restid: this.props.restid,
        username : '',
        name : '',
        email : '',
        phonenumber : '',
        password : '',
        msg : null,
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

  registerStaff = async() => {
    const {name, username, email, phonenumber, password,  restid} = this.state
    var data= {
      name, username, email, phonenumber, password, rest_id: this.props.restid
  }
  var sid=''
    await axios
      .post('http://localhost:4000/userprofile/staff/registerstaff', data, {
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
            sid = res.data.user.id
            alert('Staff Added Successfully')     
        }) 
        .catch(err=>console.log(err)) 

        const body1 = { restid: this.props.restid, sid};
        console.log(body1)
        await axios
          .post('http://localhost:4000/restaurantadmin/restaurant/addstafftorestaurant', body1, data, {
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
            alert('Staff Added to Restaurant Successfully')
            document.getElementById("form").reset(); 
        })
        .catch(err=>console.log(err)) 
  }

  onChange = e => {
      this.setState({ [e.target.name] : e.target.value });
  };

  onSubmit = async (e) => {
      e.preventDefault();
      
      //Attempt to register
      this.registerStaff();
      // window.location.reload();
  }


  render(){
    return (
      
      <div style={{textAlign: 'start'}}>
          {this.state.msg ? <Alert color="success">{ this.state.msg }</Alert> : null}
                <center><h2>Add New Staff Memeber</h2></center>
                <form onSubmit={this.onSubmit} id="form">
                    <div class = "form-group">
                        <label for="name">Name</label>
                        <input class="form-control" type="text" ref="name" name="name" placeholder="Enter name of staff" onChange={this.onChange} id="name"/>
                    </div>

                    <div class = "form-group">
                        <label for="username">Username</label>
                        <input class="form-control" type="text" ref="username" name="username" placeholder="Enter username of staff" onChange={this.onChange} id="username"/>
                    </div>

                    <div class = "form-group">
                        <label for="email">Email</label>
                        <input class="form-control" type="email" ref="email" name="email" placeholder="Enter email of staff" onChange={this.onChange} id="email"/>
                    </div>

                    <div class = "form-group">
                        <label for="phonenumber">Phone Number</label>
                        <input class="form-control" type="text" ref="phonenumber" name="phonenumber" placeholder="Enter phonenumber of staff" onChange={this.onChange} id="phonenumber"/>
                    </div>

                    <div class = "form-group">
                        <label for="email">Password</label>
                        <input class="form-control" type="password" ref="password" name="password" placeholder="Enter password of staff" onChange={this.onChange} id="password"/>
                    </div>
                    <br/>
                    <div class = "form-group">
                    <button type="submit" class="btn btn-dark">Add Staff</button>
                    </div>
                </form>
            </div>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {  clearErrors }
)(RegisterModal);

