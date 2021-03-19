import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CheckoutForm from "./checkoutForm";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SuccessMsg from '../customer/cartComponents/successmsg';

const stripePromise = loadStripe("pk_test_51HEBkBAA6YnKro0mXZpOZTmOQOMYTdMlZnvkfVxa9GvKq7vybBYkuKyWib3dIVpJ9IKYPk9l4TSnkHpnAS7Cm9L300TDmPH2NG");

class StripeCheckout extends React.Component {

  state={
    amount: 0,
    orders: []
  }

  componentDidMount = async() => {
      const pointerToThis = this
      var body = JSON.stringify({ orderid:this.props.orderId })
      await fetch(`http://localhost:4000/customer/order/viewcustomerorder`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => pointerToThis.setState({ orders: data }));  
      var total = 0;
      await this.state.orders.forEach(order => {
          total += order.total_bill
          console.log(total)
      })
      await this.setState({amount: total, loading: false})
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm orderId={this.props.orderId} amount={this.state.amount}>
            </CheckoutForm>
          </Elements>
        </div>
      </div>
    );
  };
}

StripeCheckout.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(StripeCheckout); 
