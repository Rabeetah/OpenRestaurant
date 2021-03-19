// import React, { Component } from "react";
// import "antd/dist/antd.css";
// import { Form, Input, Button, Checkbox, Alert } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import "./signin.css";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { login } from "../../../flux/actions/superAdmin/authActions";
// import { clearErrors } from "../../../flux/actions/superAdmin/errorActions";

// class LoginSuperAdmin extends Component {
//   state = {
//     username: "",
//     password: "",
//     msg: null,
//   };

//   static propTypes = {
//     isAuthenticated: PropTypes.bool,
//     error: PropTypes.object.isRequired,
//     login: PropTypes.func.isRequired,
//     clearErrors: PropTypes.func.isRequired,
//   };

//   componentDidUpdate(prevProps) {
//     const { error, isAuthenticated } = this.props;
//     if (error !== prevProps.error) {
//       //check for register error
//       if (error.id === "LOGIN_FAIL") {
//         this.setState({ msg: error.msg.msg });
//       } else {
//         this.setState({ msg: null });
//       }
//     }
//   }

//   onChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     const { username, password } = this.state;

//     const user = {
//       username,
//       password,
//     };
//     //Attempt to login
//     this.props.login(user);
//   };
  
//   render() {
//     return (
//       <div className="login-div" style={{margin:"100px", marginLeft:"600px", marginTop:"10em"}}>
//         {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}

//         <Form
//           onSubmit={this.onSubmit}
//           name="normal_login"
//           className="login-form"
//           initialValues={{
//             remember: true,
//           }}
//         >
//         <h4 className="login">Login</h4>
//           <Form.Item
//             id="username"
//             placeholder="Username"
            
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your Username!",
//               },
//             ]}
//           >
//             <Input
//               prefix={<UserOutlined className="site-form-item-icon" />}
//               placeholder="Username"
//               type="username"
//               name="username"
//               onChange={this.onChange}
//             />
//           </Form.Item>
//           <Form.Item
           
//             id="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your Password!",
//               },
//             ]}
//           >
//             <Input
//               prefix={<LockOutlined className="site-form-item-icon" />}
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={this.onChange}
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               htmlType="submit"
//               className="login-form-button"
//               color="dark"
//                onClick={this.onSubmit}
//             >
//               Log in
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error,
// });

// export default connect(mapStateToProps, { login, clearErrors })(LoginSuperAdmin);

import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from "../../../flux/actions/superAdmin/authActions";
import { clearErrors } from "../../../flux/actions/superAdmin/errorActions";

class LoginModal extends Component {
    state = {
        modal : true,
        email : '',
        password : '',
        msg : null
    }

  static propTypes = {
      isAuthenticated : PropTypes.bool,
      error : PropTypes.object.isRequired,
      login : PropTypes.func.isRequired,
      clearErrors : PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps){
    const{ error, isAuthenticated } = this.props;
    if(error !== prevProps.error)
    {
      //check for register error
      if(error.id === 'LOGIN_FAIL'){
        this.setState({ msg : error.msg.msg })
      }
      else
      {
        this.setState({ msg : null })
      }
    }
    //if authenticated, close modal
    if(this.state.modal) {
      if(isAuthenticated) {
        this.toggle();
      }
    }

  }

  toggle = () => {
    //Clear errors
    this.props.clearErrors();
      this.setState ({
          modal : !this.state.modal
      });
  };

  onChange = e => {
      this.setState({ [e.target.name] : e.target.value });
  };

  onSubmit = e => {
      e.preventDefault();
      const { email, password } = this.state;
      
      const user = {
        email,
        password
      };
      //Attempt to login
      this.props.login(user);
  }

  render(){
    return (
      <div>
        {/* <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>

                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors }
)(LoginModal);
