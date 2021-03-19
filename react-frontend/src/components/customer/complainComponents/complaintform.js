import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {message} from 'antd';

class ComplainForm extends React.Component {
    state = {
        name: '',
        subject: '',
        email: '',
        complain: '',
        redirect: '',
    }

    static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    componentDidMount = () => {
        while (this.props.auth.isLoading){}
        this.setState({redirect: true})
    }

    success = (content) => {
        message.success({
          content: content,
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        });
      };
    
      error = (content) => {
        message.error({
          content: content,
          className: 'custom-class',
          style: {
            marginTop: '10vh',
          },
        });
      };

    registerComplain = async () => {
        if(this.props.auth.user){
            const { name, email, subject, complain } = this.state
        var data = {
            name, email, subject, complain, customerid: this.props.auth.user._id
        }
        await axios
            .post('http://localhost:4000/customer/complain/registercomplaint', data, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => {
                if(res.status==200)
                {
                    console.log(res);
                    this.success('Feedback/Compalaint Registered')
                    document.getElementById("form").reset();
                }
                else{
                    this.error('Feedback/Compalaint didnot send. Try Again.')
                }
               
            })
            .catch(err => console.log(err))
          }
          else await this.setState({redirect: true});
        
    }

    onChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };
  
    onSubmit = async (e) => {
        e.preventDefault();
        //Attempt to register
        this.registerComplain();
        // window.location.reload();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        if(!isAuthenticated && this.state.redirect) {
            return (<Redirect push to='/login'/>)
          }
        return (
            <div>
                <div className="container">
                    <form id="form">
                        <center><h4 style={{ paddingBottom: '0', paddingTop: '3em', color:'var(--color4)' }}>COMPLAINT/FEEDBACK FORM</h4></center>
                        <div className="row pt-3 mx-auto">
                            <div className="col-8 form-group mx-auto">
                                <input type="text" className="form-control" 
                                onChange={this.onChange} placeholder="Name" 
                                name="name"/>
                            </div>
                            <div className="col-8 form-group pt-2 mx-auto">
                                <input type="email" className="form-control" onChange={this.onChange} 
                                placeholder= "Email Address" name="email" />
                            </div>
                            <div className="col-8 form-group pt-2 mx-auto">
                                <input type="text" className="form-control" 
                                onChange={this.onChange} placeholder="Subject" name="subject" />
                            </div>
                            <div className="col-8 form-group pt-2 mx-auto">
                                <textarea className="form-control" onChange={this.onChange} id="" cols="30" rows="8" placeholder="Your message" name="complain"></textarea>
                            </div>
                            <div className="col-8 pt-3 mx-auto">
                                <button type="submit" className="btn btn-info" onClick={this.onSubmit} value="Send Message">Send Message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, null)  (ComplainForm);