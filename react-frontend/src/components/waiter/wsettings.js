import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container, Row, Col, Figure, FigureImage, FigureCaption } from 'react-bootstrap';
import { Avatar } from 'antd';
import {Spin, message} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'material-design-icons/iconfont/material-icons.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

class WSettings extends React.Component {

    state = {
        user: this.props.user,
        rest:'',
        loading: true,
        password:'',
        npassword:'',
        nnpassword:'',
        user_id: this.props.user.id,
        fileList: [],
        file: '',
        image: null,
        uploading: false,
        msg: null,
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    changeUsername = (rid) =>
    {
        let username=this.refs.username.value;
        fetch('http://localhost:4000/waiter/setting/editusername/'+rid, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username,
            })
        })
        .then(function(response) {
          if (response.ok) {
            alert('Username updated Successfully')
            window.location.reload(false);
            return true;
                } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
              }
          })
            
      } 

    changeEmail = (rid) =>
    {
        let email=this.refs.email.value;
        fetch('http://localhost:4000/waiter/setting/editemail/'+rid, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
            })
        })
        .then(function(response) {
          if (response.ok) {
            alert('Email Updated Successfully')
            window.location.reload(false);
            return true;
                } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
              }
          })
            
      } 

      changePhoneNumber = (rid) =>
      {
          let phonenumber=this.refs.phonenumber.value;
          fetch('http://localhost:4000/waiter/setting/editphonenumber/'+rid, {
              method:'PUT',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                phonenumber,
              })
          })
          .then(function(response) {
            if (response.ok) {
              alert('PhoneNumber Updated Successfully')
              window.location.reload(false);
              return true;
                  } else {
              var error = new Error(response.statusText)
              error.response = response
              throw error
                }
            })
              
        } 

        changePassword = (rid, e) =>
        {
            e.preventDefault();
            var pointerToThis=this;
            let password=this.refs.password.value;
            let npassword = this.refs.npassword.value;
            let nnpassword = this.refs.nnpassword.value;
            fetch('http://localhost:4000/staff/setting/editpassword/'+rid, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    password: password,
                    newpassword: npassword,
                    confirmnewpassword: nnpassword,
                })
            })
            .then(function(response) {
              if (response.ok) {
                message.success('Password Updated Successfully')
                document.getElementById("form").reset()

                    } else {
                        message.error('hahahahahaha')
                var error = new Error(response.statusText)
                error.response = response
                console.log(error)
                pointerToThis.setState({msg: error.response})
                  }
              })
                
          } 

    componentDidMount = async () => {
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)
        this.waiterData = new FormData();
        const pointerToThis = this;
        await fetch("http://localhost:4000/waiter/viewprofile/" + this.state.user.id + "", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => pointerToThis.setState({ user: data }));
        var body = JSON.stringify({ rid: this.state.user.id });
        await fetch("http://localhost:4000/waiter/restaurant/findwaiter/", {
            method: 'POST',
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => pointerToThis.setState({ rest: data }));
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    
    uploadImage = (name) => (event) => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'image' ? event.target.files[0].size : 0;
        this.waiterData.set(name, value);
        this.setState({ [name]: value, fileSize })
        
    };

    saveImage= async() => {
        await axios.put(`http://localhost:4000/userprofile/waiter/addphoto/${this.props.user.id}`, this.waiterData, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            console.log(res);
            this.setState({user_id: this.state.user_id})
            message.success('Photo Added Successfully')
        })
            .catch(err => console.log(err))
            console.log(this.state.user_id)
            console.log(this.state.user.id)
    }


    render() {
        const pointerToThis = this;
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
              authorization: 'authorization-text',
            },
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                pointerToThis.setState({file: info.file})
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
            progress: {
              strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
              },
              strokeWidth: 3,
              format: percent => `${parseFloat(percent.toFixed(2))}%`,
            },
          };
        const photoUrl = this.props.user.id ? `http://localhost:4000/userprofile/waiter/image/${this.props.user.id}` : null;
        
        return (
            <div>
                 {this.state.loading ? (
                    <center>
                    <Spin
                        className="spinner"
                        tip="Loading...Please Wait"
                        size="large"
                    />
                    </center>
                ) :
                <div>
                {this.state.user ?                  
                    <div style={{ padding: '1.5em'}}>
                        <div class="list-group-item list-group-item-action">
                            {photoUrl ?
                                <Avatar size={256} src={photoUrl} />
                                :  <Avatar size={256} icon={<UserOutlined />} />}
                            <input onChange={this.uploadImage("image")}
                            type="file"
                            id="image"
                            accept="image/*"
                            class="form-control"
                            style={{marginTop:'1.5em'}}
                            />
                        <br/>
                        <form class = "form-group">
                            <button type="submit"  class="btn btn-dark" onClick={() => {this.saveImage()}}>Save Profile Picture</button>
                        </form>
                        </div>
                        <div href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b>Name: </b>{this.state.user.name}  </p>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b> Username: </b> {this.state.user.username}  </p>
                                </div>
                                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                                    <i class="material-icons" style={{marginRight: '40px' }} >edit</i>
                                </div>
                            </div>
                            <form>
                                <div class = "form-group">
                                    <input class="form-control" style = {{marginBottom:'0.5em'}} type="text" ref="username" name="username" placeholder="Enter new username here" id="username"/>
                                    <button type="submit" class="btn btn-dark" onClick={()=>this.changeUsername(this.props.user.id)}>Save Changes</button>
                                </div> 
                            </form>
                        </div>
                        <br/>
                        <div href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b>Email: </b>{this.state.user.email}  </p>
                                </div>
                                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                                    <i class="material-icons" style={{marginRight: '40px' }} >edit</i>
                                </div>
                            </div>
                            <form>
                                <div class = "form-group">
                                    <input class="form-control" style = {{marginBottom:'0.5em'}} type="email" ref="email" name="email" placeholder="Enter new email here" id="email"/>
                                    <button type="submit" class="btn btn-dark" onClick={()=>this.changeEmail(this.props.user.id)}>Save Changes</button>
                                </div> 
                            </form>
                        </div>
                        <br/>
                        <div href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b>Phone Number: </b>{this.state.user.phonenumber}  </p>
                                </div>
                                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                                    <i class="material-icons" style={{marginRight: '40px' }} >edit</i>
                                </div>
                            </div>
                            <form>
                                <div class = "form-group">
                                    <input class="form-control" style = {{marginBottom:'0.5em'}} type="number" ref="phonenumber" min='11' max='13' name="phonenumber" placeholder="Enter new phonenumber here" id="phonenumber"/>
                                    <button type="submit" class="btn btn-dark" onClick={()=>this.changePhoneNumber(this.props.user.id)}>Save Changes</button>
                                </div> 
                            </form>
                        </div>
                        <br/>
                        <div href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b>Password: </b> </p>
                                </div>
                                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                                    <i class="material-icons" style={{marginRight: '40px' }} >edit</i>
                                </div>
                            </div>
                            <form id="form" onsubmit="return false">
                                    <div class = "form-group">
                                        <input class="form-control" style = {{marginBottom:'0.5em'}} type="password" ref="password" name="password" placeholder="Enter previous password here" id="password"/> 
                                        <input class="form-control" style = {{marginBottom:'0.5em'}} type="password" ref="npassword" name="npassword" placeholder="Enter new password here" id="npassword"/>
                                        <input class="form-control" style = {{marginBottom:'0.5em'}} type="password" ref="nnpassword" name="nnpassword" placeholder="Enter new password here again" id="nnpassword"/>
                                        <button type="submit" class="btn btn-dark" onClick={()=>this.changePassword(this.props.user.id)}>Save Changes</button>
                                    </div>
                            </form> 
                        </div>
                    </div>

                    

                    : ''}
                </div>
            }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(WSettings);




                            
                            