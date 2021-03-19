import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Spin} from 'antd';
import RegisterModal from '../../userProfile/waiter/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginModal from '../../userProfile/waiter/signin';
import Logout from '../../userProfile/waiter/logout';
import MainPageLayout from './signInWaiter';
import WaiterLayout from '../waiterLayout/waiterLayout';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
class AppNavbar extends Component{
    state = {
        isOpen : true,
        loading: true
    }

    static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)
      }
    
      componentWillUnmount() {
        clearTimeout(this.id)
      }

    render()
    {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
               
               
               <Router>
                    <div className="App-intro">
                        <Switch>
                            {/* <Route path="/dashboard" component={RaLayout} user={user}/> */}
                            {/* <Route path="/dashboard" render={(props) => ( <WaiterLayout {...props} user={user} />)}/>
                            <Redirect to="/dashboard" /> */}
                            <WaiterLayout user={user} />
                        </Switch>
                    </div>
                </Router>
                
                   
                
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
               < MainPageLayout/>
            </Fragment>
        );
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
                        { isAuthenticated ? authLinks : guestLinks }
                    </div>    
                }
           
            </div>
        );
}
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);