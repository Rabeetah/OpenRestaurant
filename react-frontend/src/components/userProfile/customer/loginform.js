import React, { Component } from 'react';
import "antd/dist/antd.css";
/* import "./Fontawsomeicons/index.js"; */
import './loginform.css';
import { Form, Input, Button, Checkbox, Alert, Spin } from "antd";
/* import {FontAwesomeIcon} from "@fortawesome/react-fontawesome" */
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Signup from './signupform';
import logo1 from '../../../assets/images/logo1.png';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../flux/actions/customer/authActions";
import { clearErrors } from "../../../flux/actions/customer/errorActions";
import { Redirect } from "react-router";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
  Link
} from "react-router-dom";
import CLayout from '../../layouts/customerLayout/customerlayout';


class Logincustomer extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      email: "",
      password: "",
      msg: null,
      redirect: false

    }

  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };


  componentDidUpdate = async (prevProps) => {
    const { error, isAuthenticated } = this.props;
    this.id = setTimeout(() => this.setState({ loading: false }), 3000)
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "LOGIN_FAIL") {
        console.log(error)
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    //Attempt to login
    this.props.login(user);
    if (this.props.isAuthenticated) this.setState({ redirect: true })
    // login(user)
    // .then(() => {
    //   this.setState({redirect: true});
    //   window.location.reload();
    // })
    // .catch(() => {
    //   window.location.reload();
    // });
  };

  Load = () => {
    this.setState({ visible: true });
  }
  render() {
    const { isAuthenticated } = this.props;
    if (this.state.visible) {
      return (<Redirect push to='/signup' />)
    }
    else if (isAuthenticated) {
      return (<Redirect push to='/' />)
    }
    else if (this.state.redirect) {
      return (<Redirect push to='/' />)
    }
    return (
      <div className="mybody">
        {this.state.loading ? (
          <center>
            <Spin
              className="spinner"
              tip="Loading...Please Wait"
              size="large"
            />
          </center>
        ) :
          <center>
            <div className="Login-container1">
              <Form onSubmit={this.onSubmit}
                name="normal_login"
                initialValues={{
                  remember: true,
                }}>
                <div>
                  {/* {<img src={logo1} alt="Logo" />} */}
                  {/* <br>
                </br> */}
                  <br></br>
                  <h1 className="myheading">Sign in</h1>
                </div>
                {this.state.msg ? <Alert color="danger" type="error" closable message={this.state.msg}></Alert> : null}
                <br />
                <Form.Item container spacing={1} alignItems="flex-end">
                  <Form.Item rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                  >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Enter Email Id" className="input-with-icon-grid1" name="email" type="text" onChange={this.onChange} />
                  </Form.Item>
                </Form.Item>
                <Form.Item container spacing={1} alignItems="flex-end">
                  <Form.Item rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                  >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter Password" className="input-with-icon-grid1" name="password" type="password" onChange={this.onChange} />
                  </Form.Item>
                </Form.Item>
                <input className="butn" type="submit" value="Sign in" onClick={this.onSubmit}></input>
                <div>
                  <p>Don't have an account yet? &nbsp;
                  <Link className="link" to="/signup" onClick={this.Load}>
                      <span style={{ color: 'blue', fontWeight: 'bold', textDecorationLine: 'underline' }}>Sign Up</span></Link></p>

                </div>
              </Form>
            </div>
          </center>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Logincustomer);



