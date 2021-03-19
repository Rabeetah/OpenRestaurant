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
import { login } from '../../../flux/actions/restaurantAdmin/authActions';
import { clearErrors } from '../../../flux/actions/restaurantAdmin/errorActions';

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

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
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



















// import React, { Component } from 'react';
// import 'antd/dist/antd.css';
// // import {
// //   Button,
// //   Modal,
// //   ModalHeader,
// //   ModalBody,
// //   Form,
// //   FormGroup,
// //   Label,
// //   Input,
// //   NavLink,
// //   Alert
// // } from 'reactstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import { Form, Input, Button, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import './signin.css';
// import { login } from '../../../flux/actions/restaurantAdmin/authActions';
// import { clearErrors } from '../../../flux/actions/restaurantAdmin/errorActions';

// class LoginModal extends Component {
//     state = {
//         modal : true,
//         email : '',
//         password : '',
//         msg : null
//     }

//   static propTypes = {
//       isAuthenticated : PropTypes.bool,
//       error : PropTypes.object.isRequired,
//       login : PropTypes.func.isRequired,
//       clearErrors : PropTypes.func.isRequired
//   }

//   componentDidUpdate(prevProps){
//     const{ error, isAuthenticated } = this.props;
//     if(error !== prevProps.error)
//     {
//       //check for register error
//       if(error.id === 'LOGIN_FAIL'){
//         this.setState({ msg : error.msg.msg })
//       }
//       else
//       {
//         this.setState({ msg : null })
//       }
//     }
//     //if authenticated, close modal
//     if(this.state.modal) {
//       if(isAuthenticated) {
//         this.toggle();
//       }
//     }

//   }

//   toggle = () => {
//     //Clear errors
//     this.props.clearErrors();
//       this.setState ({
//           modal : !this.state.modal
//       });
//   };

//   onChange = e => {
//       this.setState({ [e.target.name] : e.target.value });
//   };

//   onSubmit = e => {
//       e.preventDefault();
//       const { email, password } = this.state;
      
//       const user = {
//         email,
//         password
//       };
//       //Attempt to login
//       this.props.login(user);
//   }

//   render(){
//     return (
//       <div>
//         {/* <NavLink onClick={this.toggle} href="#">
//           Login
//         </NavLink> */}
//           <Form
//           className="login-form"
//           style={{margin:"100px", marginLeft:"600px", marginTop:"10em"}}>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your Email!',
//               },
//             ]}
//           >
//             <Input 
//             prefix={<UserOutlined className="site-form-item-icon" />} 
//             placeholder="Email" 
//             type="email" 
//             name="email" 
//             id="email"
//             onChange={this.onChange} />
//           </Form.Item>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your Password!',
//               },
//             ]}
//           >
//             <Input
//               prefix={<LockOutlined className="site-form-item-icon" />}
//               type="password"
//               name="password"
//               id="password"
//               placeholder="Password"
//               onChange={this.onChange}
//             />
//           </Form.Item>
//           {/* <Form.Item>
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox>Remember me</Checkbox>
//             </Form.Item>

//             <a className="login-form-forgot" href="">
//               Forgot password
//             </a>
//           </Form.Item> */}

//           <Form.Item>
//             <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.onSubmit}>
//               Log in
//             </Button>
            
//           </Form.Item>
//         </Form>

  
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// });

// export default connect(mapStateToProps, { login, clearErrors }
// )(LoginModal); 





// const NormalLoginForm = () => {
//   const onFinish = (values) => {
//     console.log('Received values of form: ', values);
//   };

  // return (
    // <h2>LOGIN FORM</h2>
    // {this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null}
//     <Form
//       name="normal_login"
//       className="login-form"
//       initialValues={{
//         remember: true,
//       }}
//       onSubmit={this.onSubmit}
//     >
//       <Form.Item
//         name="email"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your Email!',
//           },
//         ]}
//       >
//         <Input 
//         prefix={<UserOutlined className="site-form-item-icon" />} 
//         placeholder="Email" 
//         type="email" 
//         name="email" 
//         id="email"
//         onChange={this.onChange} />
//       </Form.Item>
//       <Form.Item
//         name="password"
//         rules={[
//           {
//             required: true,
//             message: 'Please input your Password!',
//           },
//         ]}
//       >
//         <Input
//           prefix={<LockOutlined className="site-form-item-icon" />}
//           type="password"
//           name="password"
//           id="password"
//           placeholder="Password"
//           onChange={this.onChange}
//         />
//       </Form.Item>
//       <Form.Item>
//         <Form.Item name="remember" valuePropName="checked" noStyle>
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         <a className="login-form-forgot" href="">
//           Forgot password
//         </a>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" className="login-form-button">
//           Log in
//         </Button>
//         Or <a href="">register now!</a>
//       </Form.Item>
//     </Form>
//   );
// };

// ReactDOM.render(<NormalLoginForm />, mountNode);








{/* <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Login</ModalHeader>
            <ModalBody>
              {this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null}
              <Form onSubmit={this.onSubmit}>
                <FormGroup>

                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
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
          </Modal> */}








