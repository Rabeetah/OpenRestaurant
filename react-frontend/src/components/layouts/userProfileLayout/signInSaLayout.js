import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import '../../../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import signin from '../../userProfile/superAdmin/signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


class MainPageLayout extends React.Component{
    state = {
        isOpen : true
    }
    static propTypes = {
        auth : PropTypes.object.isRequired,
        // isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    render()
    {
        return(
            <div>
                <Router>
                    <Link className="link" to="/signin" ></Link>
                    <div className="App-intro">
                        <Switch>
                            <Route path="/signin" component={signin}/>
                            <Redirect to='signin'/>
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