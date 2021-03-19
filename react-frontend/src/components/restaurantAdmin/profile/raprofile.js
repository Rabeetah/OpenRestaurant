import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container, Row, Col, Figure, FigureImage, FigureCaption } from 'react-bootstrap';
import { Avatar } from 'antd';
import {Spin} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'material-design-icons/iconfont/material-icons.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './raprofile.css';

class RaProfile extends React.Component {

    state = {
        user: this.props.user,
        loading: true
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    componentDidMount = async () => {
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)
        console.log(this.state.user)
    }

    componentWillUnmount() {
        clearTimeout(this.id)
      }


    render() {
        const photoUrl = this.state.user.id ? `http://localhost:4000/userprofile/restaurantadmin/image/${this.state.user.id}` : null;
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
                    <center>
                    <div style={{ padding: '1.5em'}}>
                        <div class="list-group-item list-group-item-action">
                            <div>
                                {photoUrl ?
                                <Avatar size={256} src={photoUrl} />
                                :  <Avatar size={256} icon={<UserOutlined />} />}
                                {/* <i class="material-icons" >edit</i> */}
                            </div>
                            <div>
                                <div><center>
                                    <p><span style={{fontSize: '2rem', fontWeight: '500'}}>{this.state.user.username} </span> </p>
                                    <br/>
                                    <hr/>
                                    <br/>
                                    <p>Name: {this.state.user.name}  </p>
                                    <p>Phone Number: {this.state.user.phonenumber}  </p>
                                    <p>Email: {this.state.user.email}  </p>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    </center>
                : ''}
            </div>
    }</div>
        );

        
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(RaProfile);