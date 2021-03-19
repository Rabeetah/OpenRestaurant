import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../flux/actions/customer/authActions';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';


export class Logout extends Component {
    static propTypes = {
        logout : PropTypes.func.isRequired
    }
    render(){
        return(
            <Fragment>
                <Link onClick = {this.props.logout} to="/">
                    Logout
                </Link>
            </Fragment>
        )
    }
 }

export default connect (null, {logout}
)(Logout);