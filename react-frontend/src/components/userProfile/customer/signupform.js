import React,{Component} from 'react';
import axios from 'axios';
import "antd/dist/antd.css";
import './signupform.css';
import { Form, Input, Alert, message } from "antd";
import {
  Link
} from "react-router-dom";
import { Redirect } from 'react-router';
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Signin from './loginform';
import { clearErrors } from '../../../flux/actions/customer/errorActions';
 
class SignupCustomer extends Component{
    state = {
        
        name : '',
        email : '',
        password : '',
        msg : null,
        redirect: false,
        visible:false,
    }

  static propTypes = {
      isAuthenticated : PropTypes.bool,
      error : PropTypes.object.isRequired,
    //   register : PropTypes.func.isRequired,
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
        this.setState({redirect: true})
      }
    }
  }

  registerCustomer = async() => {
    const {name,  email,  password} = this.state
    var data= {
      name,email,  password
  }
  var cid=''
    await axios
      .post('http://localhost:4000/userprofile/customer/registercustomer', data, {
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
            cid = res.data.user.id
            message.success('Customer registered')
            this.setState({redirect: true})     
        }) 
        .catch(err=>console.log(err)) 

        
  }

  onChange = e => {
      this.setState({ [e.target.name] : e.target.value });
  };

  onSubmit = async (e) => {
      e.preventDefault();
      
      //Attempt to register
      this.registerCustomer();
      // window.location.reload();
  }



render(){
  const { isAuthenticated } = this.props;
  if (this.state.visible) {
    return <Signin/>
  }
    else if (isAuthenticated){
      return (<Redirect push to='/'/>)
    }
    else if (this.state.redirect){
      return (<Redirect push to='/'/>)
    }
    return( 
        <center>
        <div className="Login-container2">
        <Form 
        name="normal_login"
      
        initialValues={{
          remember: true,
        }}>
            <div>
               {/* {  <img src={logo1} alt="Logo" /> } */}
               <br>
               </br> 
               <br></br>
                <h1>Sign up</h1>
                </div>
                  {this.state.msg ? <Alert color="danger" type="error" closable message={this.state.msg}></Alert> : null}

                    <Form.Item container spacing={1} alignItems="flex-end">    
                    <Form.Item>                      
                        <Input prefix={  <UserOutlined className="site-form-item-icon" />}placeholder="Enter your name" id="input-with-icon-grid" name="name" onChange={this.onChange}  type="text"/>
                    </Form.Item>
                    </Form.Item>
                    <Form.Item container spacing={1} alignItems="flex-end">
                  <Form.Item>                      
                        <Input prefix={  <MailOutlined className="site-form-item-icon" />}placeholder="Enter your email" id="input-with-icon-grid" name="email" onChange={this.onChange} type="text"/>
                    </Form.Item>
                    </Form.Item>              
                    <Form.Item container spacing={1} alignItems="flex-end">                  
                    <Form.Item>                      
                        <Input prefix={  <LockOutlined className="site-form-item-icon" />}placeholder="Enter your password" type="password" id="input-with-icon-grid" name="password" onChange={this.onChange} />
                    </Form.Item>
                    </Form.Item>
                <input className="butn" type="submit" value="Sign up" onClick={this.onSubmit}></input>
                <div>
                  <p>Already have an account? &nbsp;
                  <Link className="link" to="/login" onClick={this.Load}>
                      <span style={{ color: 'blue', fontWeight: 'bold', textDecorationLine: 'underline' }}>Sign In</span></Link></p>

                </div>
                </Form>



        </div>
        </center>
        
    );

    

}
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });
  
  export default connect(mapStateToProps, { clearErrors }
  )(SignupCustomer);
