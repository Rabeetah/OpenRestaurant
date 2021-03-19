import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Spin} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPageLayout from './signincustomerLayout';
import { Redirect } from "react-router-dom";
import CLayout from '../customerLayout/customerlayout';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect,
    Link
  } from "react-router-dom";
class AppNavbar1 extends Component{
    state = {
        isOpen : false,
        loading: true
    }

    static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    componentDidMount()
    {
        
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)    }

    componentWillUnmount() {
        clearTimeout(this.id)
      }

    render()
    {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <div className="App-intro">  
                    <Router>
                        <Switch>
                            
                            <CLayout user={user}/>
                            <Redirect to='/a'/>
                        </Switch>
                    </Router>
                </div>
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
        )
}
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar1);