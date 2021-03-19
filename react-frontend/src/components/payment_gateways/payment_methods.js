import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "antd/dist/antd.css";
import "./pay_methods.css";
import StripeCheckOut from "./checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm  from "./checkoutForm";

const stripePromise = loadStripe("pk_test_51HEBkBAA6YnKro0mXZpOZTmOQOMYTdMlZnvkfVxa9GvKq7vybBYkuKyWib3dIVpJ9IKYPk9l4TSnkHpnAS7Cm9L300TDmPH2NG");


// import PaymentMethods from './components/payment_gateways/payment_methods';

class PaymentMethods extends React.Component{

  render(){
    const { user } = this.props.auth;
    return(
  <div className="App-intro">
    <Elements stripe={stripePromise}>
    <h2 className="heading-payment-types">Choose the Payment Method:</h2>
    <Router>
    <Switch>
    <div className="vertical-nav">
    <nav >
      <li> <a href="/StripeCheckOut">Stripe CheckOut</a>  </li>
    </nav>
      <Route exact path="/StripeCheckOut"  component={StripeCheckOut} />
      {/* <Redirect to="/" /> */}
    </div></Switch>
    </Router>
    </Elements>
  </div>
);
  }
}

PaymentMethods.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
});

export default connect( mapStateToProps   )( PaymentMethods ); 