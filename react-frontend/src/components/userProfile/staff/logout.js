import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../flux/actions/staff/authActions';
import { NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';


 export class Logout extends Component {
    static propTypes = {
        logout : PropTypes.func.isRequired
    }
    render(){
        return(
            <Fragment>
                <NavLink onClick = {this.props.logout} href="#">
                    Logout
                </NavLink>
            </Fragment>
        )
    }
 }

export default connect (null, {logout}
)(Logout);