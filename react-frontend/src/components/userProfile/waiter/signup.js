import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap'; 
import axios from 'axios';
import {
  Alert
} from 'reactstrap';
import '../../superAdmin/restaurant/addrestaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../flux/actions/waiter/authActions';
import { clearErrors } from '../../../flux/actions/waiter/errorActions';

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

  registerWaiter = async() => {
    const {name, username, email, phonenumber, password, restid} = this.state
    var data= {
      name, username, email, phonenumber, password, rest_id: this.props.restid
  }
  var wid=''
    await axios
      .post('http://localhost:4000/userprofile/waiter/registerwaiter', data, {
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
            wid = res.data.user.id
            alert('Waiter Added Successfully')     
        }) 
        .catch(err=>console.log(err)) 

        const body1 = { restid:this.props.restid, wid};
        console.log(body1)
        await axios
          .post('http://localhost:4000/restaurantadmin/restaurant/addwaitertorestaurant', body1, data, {
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res); 
            alert('Waiter Added to Restaurant Successfully')
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
      this.registerWaiter();
      // window.location.reload();
  }

  render(){
    return (
      
      <div style={{textAlign: 'start' }}>
          {this.state.msg ? <Alert color="success">{ this.state.msg }</Alert> : null}
                <center><h2>Add New Waiter</h2></center>
                <form onSubmit={this.onSubmit} id="form">
                    <div class = "form-group">
                        <label for="name">Name</label>
                        <input class="form-control" type="text" ref="name" name="name" placeholder="Enter name of waiter" onChange={this.onChange} id="name"/>
                    </div>

                    <div class = "form-group">
                        <label for="username">Username</label>
                        <input class="form-control" type="text" ref="username" name="username" placeholder="Enter username of waiter" onChange={this.onChange} id="username"/>
                    </div>

                    <div class = "form-group">
                        <label for="email">Email</label>
                        <input class="form-control" type="email" ref="email" name="email" placeholder="Enter email of waiter" onChange={this.onChange} id="email"/>
                    </div>

                    <div class = "form-group">
                        <label for="phonenumber">Phone Number</label>
                        <input class="form-control" type="text" ref="phonenumber" name="phonenumber" placeholder="Enter phonenumber of waiter" onChange={this.onChange} id="phonenumber"/>
                    </div>

                    <div class = "form-group">
                        <label for="email">Password</label>
                        <input class="form-control" type="password" ref="password" name="password" placeholder="Enter password of waiter" onChange={this.onChange} id="password"/>
                    </div>
                    <br/>
                    <div class = "form-group">
                    <button type="submit" class="btn btn-dark">Add Waiter</button>
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

export default connect(mapStateToProps, { clearErrors }
  )(RegisterModal);

