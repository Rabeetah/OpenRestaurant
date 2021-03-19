import React from 'react';
import "antd/dist/antd.css";
import { Input, Radio, Button } from 'antd';
import { Divider, Tabs, Spin, Rate, Space, Card, Tooltip, message } from "antd";
import Image from "react-bootstrap/Image";
import EmptyCart from './emptycart';
import axios from 'axios';
import CheckOut from '../../payment_gateways/stripeCheckout';
import SuccessMsg from './successmsg';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "../viewComponent/viewItem.css";

class Proceedtocheckout extends React.Component {
  state = {
    value: 1,
    // itemId: '5f96df9e379eb6263093e39d',
    itemsDetails: [],
    item: "",
    Total: 0,
    quantity: 1,
    showTotal: false,
    loading: false,
    user: '',
    random: null,
    redirect: false,
    redirect1: false,
    redirect2: false,
    orderId: ''
  };


   static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
    // error : PropTypes.object.isRequired
}

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  
  setCartLength = () => {
    var count = 0;
    if(this.props.auth.user){
      if(this.props.auth.user.cart.length > 0 ){
        this.props.auth.user.cart.forEach((rest) => {
          count = count + rest.rest.length;
        });
        this.setState({ cart_length: count, redirect2: true });
      }
      else{
        this.setState({  redirect2: true });
      }
    }
    console.log(this.state.cart_length)
  };

  async componentDidMount() {
    while (this.props.auth.isLoading){}
    await this.setState({user: this.props.auth.user, redirect1:true, isauth: this.props.auth.isAuthenticated})
    this.cartDisplay();

  }

  cartDisplay = async () => {
    await this.setCartLength();
    var pointerToThis = this;
    let cartItems = [];
    let userCart = [];
    // message.info('we are inside')
    if (this.props.auth.user && this.state.cart_length) {
      // message.success('wooohooo')
      // console.log('a')
      if (this.state.cart_length > 0) {
        // console.log('b')
        this.props.auth.user.cart.forEach(rest => {
          // console.log('c')
          rest.rest.forEach(item => {
            cartItems.push(item.id);
            userCart.push({ id: item.id, quantity: item.quantity })
          })

        });
        // console.log('d')
        await this.getCartItems(cartItems, userCart)
        // console.log('e')
        if (this.state.itemsDetails) {
          // console.log('f')
          console.log(this.state.itemsDetails)
          if (this.state.itemsDetails.length > 0) {
            // console.log('g')
            pointerToThis.calculateTotal(this.state.itemsDetails)
            // console.log('h')
          }
        }
      }
    }
    // message.success('wooooohoooooo, we are out')
  }
  getCartItems = async (cartItems, userCart) => {
    const pointerToThis = this;
    const body1 = {
      type: 'array',
      id: cartItems
    }
    const request = await axios.post(`http://localhost:4000/customer/cart/getCartItems`, body1)
      .then(response => {
        console.log(response.data)
        console.log(response)

        //Make CartDetail inside Redux Store 
        // We need to add quantity data to Product Information that come from Product Collection. 

        userCart.forEach(cartItem => {
          response.data.forEach((productDetail, i) => {
            if (cartItem.id === productDetail._id) {
              response.data[i].quantity = cartItem.quantity;
            }
          })
        })
        console.log(response.data)
        pointerToThis.setState({ itemsDetails: response.data, loading: false });
        return response.data;
      });
    console.log(request)
    return request;


  }

  calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map(item => {
      var itemprice = item.price ? item.price : item.total_bill
      total += parseInt(itemprice, 10) * item.quantity
    });

    this.setState({ Total: total })
    this.setState({ showTotal: true })
  }
  success = (content) => {
    message.success({
      content: content,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };

  error = (content) => {
    message.error({
      content: content,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };

  placeOrder = () => {
    var pointerToThis = this;
    let { subname, subid } = this.state;
    var total = 0; var price = 0;
    var cart = this.props.auth.user.cart;
    cart.forEach((rest, i) => {
      rest.rest.forEach(item => {
        this.state.itemsDetails.forEach(cart_item => {
          if (item.id == cart_item._id) {
            var itemprice = cart_item.price ? cart_item.price : cart_item.total_bill
            total += parseInt(itemprice, 10) * cart_item.quantity
          }
        })

      })
      cart[i].sub_total = total;
      total = 0; price = 0;
    })
    console.log(cart);
    var body = {
      orderid: this.randomnumbergenerator(),
      customer_id: this.props.auth.user._id,
      ordered_food: cart,
      type: this.state.value
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios.post('http://localhost:4000/customer/order/addOrder', body, config)
      .then(async(res) => {
        // pointerToThis.setState({ subid: res.data._id });
        this.success('Order Placed Successfully')
        this.emptyCart();
        await this.setState({ redirect: true, orderId: body.orderid });
      })
      .catch(err => console.log(err))
        

  }

  emptyCart = () => {
    var body = {
      cid: this.props.auth.user._id,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    axios.post('http://localhost:4000/customer/cart/emptycart', body, config)
      .then(res => {
        // pointerToThis.setState({ subid: res.data._id });
        this.props.auth.user.cart = []
      })
      .catch(err => console.log(err))
  }

  randomnumbergenerator = () => {
    const min = 1000000;
    const max = 1000000000;
    const rand = Math.round(min + Math.random() * (max - min));
    return rand;
  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const gridStyle1 = {
      width: "40%",
      marginTop: "0em",
      marginLeft: '1em',
      textAlign: "center",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle2 = {
      width: "45%",
      textAlign: "left",
      justifyContent: "center",
      borderWidth: 0,
    };
    if(!this.state.isauth && this.state.redirect1) {
      return (<Redirect push to='/login'/>)
    }
    if(this.state.redirect2 && this.state.cart_length < 1){
      return <EmptyCart/>
    }
    if (this.state.redirect && this.state.value == 1) {
      return <CheckOut orderId={this.state.orderId}/>;
    }
    else if (this.state.redirect && this.state.value == 2) {
      return <SuccessMsg orderid={this.state.orderId}/>;
    }
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
      <div style={{ overflow: 'hidden' }}>
        <br /><br />
        <h4 style={{ marginLeft: '1.5em', paddingBottom: '0.5em', paddingTop:'1em' }}>Order Summary</h4>

        <div style={{ float: 'left', marginLeft: '2em', width: '45%', clear: 'left' }}>
          {this.state.itemsDetails.map(item =>
            <div>
              <Card className="view-card" >
                <Card.Grid hoverable={false} style={gridStyle1}>
                  <Image
                    className="image"
                    width={170}
                    height={150}
                    src={item.price ? `http://localhost:4000/restaurantadmin/item/image/${item._id}` : `http://localhost:4000/restaurantadmin/deal/image/${item._id}`} roundedCircle
                  />
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle2}>
                  <Card className="grid-card" style={{ marginTop: '0.8em' }}>
                    <p>
                      <span className="item-name">{item.name}</span>
                      <br />
                      <p>{item.description}</p>
                      <hr />
                      <span className='price'>{item.quantity} x Rs. {item.price ? item.price : item.total_bill}</span><hr />
                    </p>
                  </Card>
                </Card.Grid>
              </Card>
              <br />
            </div>
          )}

          <br />
          {/* style={{ float: 'Left' , marginLeft:'2em', marginTop: '2em', height:"175px", borderRadius: '5px', width: '45%', clear: 'Left'}} */}
          <Card>
            <h5>CART TOTALS</h5>
            <hr />
            <p style={{ overflow: "hidden" }}>
              <span style={{ float: 'left' }}>Sub Total</span>
              <span className='price' style={{ float: 'right' }}>Rs. {this.state.Total}</span>
            </p>
            <hr />
            <p style={{ overflow: "hidden" }}>
              <span style={{ float: 'left' }}>Grand Total</span>
              <span className='price' style={{ float: 'right' }}>Rs. {this.state.Total}</span>
            </p>
            <hr />
          </Card>
        </div>
        <div style={{ float: 'right', padding: '2em', paddingTop: '0em', marginRight: '4em', width: '35em', textAlign: 'Left', overflow: 'hidden' }}>

          <h6>Name</h6>
          <Input
            placeholder="Name"
            type="text"
            name="name"
            value={this.props.auth.user.name}
            disabled
          />
          <br /><br />
          <h6>Email</h6>
          <Input
            // placeholder="Email"
            type="email"
            name="email"
            value={this.props.auth.user.email}
            disabled
          />
          <br /><br />
          <h6>Phone Number</h6>
          <Input
            placeholder="Phonenumber"
            type="phonenumber"
            name="phonenumber"
          />
          {/* <br /><br />
          <h6>Gift Card or Discount Coupon</h6>
          <Input
            placeholder="Gift Card or Discount Coupon"
            type="text"
            name="giftcard"
          /> */}
          <br /><br />
          <h6>Payment</h6>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={1}>
              Credit Card
                    </Radio>
            <Radio style={radioStyle} value={2}>
              Cash on Delivery(COD)
                    </Radio>
          </Radio.Group>
          <br /><br />
          <span className='button-span'>
            {/* <a href={`/place/order/`}> */}
            <Button className='button' color={'#855b36'} onClick={() => this.placeOrder()}>Place Order</Button>
            {/* </a> */}
          </span>
        </div>
      </div>
      }
    </div>
    )
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null) (Proceedtocheckout)