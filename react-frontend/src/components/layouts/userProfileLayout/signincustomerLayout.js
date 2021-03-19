import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
  } from "react-router-dom";
import '../../../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginform from '../../userProfile/customer/loginform';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


class MainPageLayout extends React.Component{
    state = {
        isOpen : false
    }
    static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    render()
    {
        return(
            <div>
                <Router>
                  {/*   <Link className="link" to="/signin" >Login</Link> */}
                    <div className="App-intro">
                        <Switch>
                            <Route path="/loginform" component={loginform}/>
                            <Redirect to ="loginform"/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  });
  
  
  export default connect(mapStateToProps, null)(MainPageLayout);