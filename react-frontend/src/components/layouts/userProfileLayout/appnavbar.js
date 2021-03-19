import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from '../../userProfile/waiter/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginModal from '../../userProfile/waiter/signin';
import Logout from '../../userProfile/waiter/logout';
class AppNavbar extends Component{
    state = {
        isOpen : false
    }

    static propTypes = {
        auth : PropTypes.object.isRequired,
        // isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        });
    };

    render()
    {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                    <strong>
                        {user ? `Welcome ${user.name}` : ''}
                    </strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );
        return (
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    { isAuthenticated ? authLinks : guestLinks }
                    </Nav>
                </Collapse>
                </Container>
            </Navbar>
            
            </div>
        );
}
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);