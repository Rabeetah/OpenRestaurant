import React, { Component } from "react";
import "antd/dist/antd.css";
import "../viewComponent/viewItem.css";
import { Divider, Tabs, Spin, Rate, Space, Card, Button, Tooltip, message, InputNumber } from "antd";
import Image from "react-bootstrap/Image";
import '../customer.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import Checkout from './proceedtocheckout';
import RatingComponent from "../reviewRatingComponents/ratingComponent";
import ReviewComponent from "../reviewRatingComponents/reviewComponent";
// import ItemCounter from "../cartComponents/itemCounter";
// import ItemCounter from '../../layouts/customerLayout/counter';
import EmptyCart from './emptycart';
import { connect } from 'react-redux';
import { Link,Redirect } from "react-router-dom";
const { Meta } = Card;
const { TabPane } = Tabs;

class Cart extends Component {

  state = {
    // itemId: '5f96df9e379eb6263093e39d',
    itemsDetails: [],
    item:"",
    quantity: 1,
    loading: true,
    Total: 0,
    // customerId: '5fa7fe33910c3a1810eccbc9',
    itemid: this.props.id,
    user:'',
    cart_length: 0,
    update: false,
    showTotal: false,
    redirect1: false,
    redirect2: false,
    isauth: true
    
  };

  static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
    // error : PropTypes.object.isRequired
}


  // onChange = (value) => {
  //   this.setState({ quantity:value })
  // }
  
  setCartLength = () => {
    var count = 0;
    if(this.state.user){
      if(this.state.user.cart.length > 0 ){
        this.state.user.cart.forEach((rest) => {
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


  componentDidMount = async() => {
    while (this.props.auth.isLoading){}
    await this.setState({user: this.props.auth.user, redirect1:true, isauth: this.props.auth.isAuthenticated})
    this.cartDisplay();
    console.log(this.props.auth)
  }


  cartDisplay = async() => {
    // this.setState({user: this.props.auth.user})
    this.setCartLength();
    var pointerToThis = this;
    let cartItems = [];
    let userCart = [];
    // message.info('we are inside')
        if (this.state.user && this.state.cart_length) {
          // message.success('wooohooo')
          // console.log('a')
            if (this.state.cart_length > 0) {
              // console.log('b')
              this.state.user.cart.forEach(rest => {
                // console.log('c')
                  rest.rest.forEach(item => {
                    cartItems.push(item.id);
                    userCart.push({id: item.id, quantity:item.quantity})
                  })
                    
                });
                // console.log('d')
                  await this.getCartItems(cartItems, userCart)
                  // console.log('e')
                    if(this.state.itemsDetails)  {
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
        type : 'array',
        id : cartItems
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
            pointerToThis.setState({ loading: false,itemsDetails: response.data});
            return response.data;
        });
        console.log(request)
    return request;

   
}

  calculateTotal = (cartDetail) => {
    let total = 0;
    console.log(cartDetail)
    cartDetail.map(item => {
      var itemprice = item.price ? item.price : item.total_bill
        total += parseInt(itemprice, 10) * item.quantity
        console.log('totalllll '+ total)
    });

    this.setState({Total: total})
    this.setState({showTotal: true})
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

removeFromCartNew = async (restId,productId) => {
  // var response = await this.removeCartItem(productId)
  const body2 = { 
    cid : this.props.auth.user._id,
    rid : restId,
    iid : productId 
  }
  const request = await axios.post(`http://localhost:4000/customer/cart/removeFromCart`, body2)
      .then(response => {
          if (response.status == 200 ){
            var user = this.state.user;
            this.props.auth.user.cart = response.data.cart;
            this.setState({user: this.props.auth.user});
            this.success('Removed From Cart')
            this.cartDisplay();
          } 
          else
          {
            this.error('Error while removing your item.Try again later.')
          }
      });
}

addToCart = async(rest_id, item_id, quantity_new, quantity_old) => {
  console.log(quantity_new)
  if(quantity_new){
    var body =
    {
      cid: this.props.auth.user._id,
      iid: item_id,
      quantity: quantity_new - quantity_old,
      rid: rest_id
    }
    var header= {
      'Content-Type': 'application/json'
    }
    var res = await axios.post(`http://localhost:4000/customer/cart/addCart`, body, header
    )
    if (res.status == 200){
        this.success('Item Quantity Is Updated')
        this.props.auth.user.cart = res.data;
        this.cartDisplay();
      } 
    else  this.error('Try Again')
    // this.setState({addCart: true});
  }
};
  
  // onChange = (e,i) => {
  //   this.state.itemsDetails[i].quantity_new = e.target.value;
        
  //   }

  render() {
    const gridStyle = {
      width: "45%",
      textAlign: "right",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle1 = {
      width: "20%",
      marginTop: "1.8em",
      textAlign: "center",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle2 = {
      width: "25%",
      textAlign: "left",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle3 = {
        width: "100%",
        textAlign: "right",
        justifyContent: "center",
        borderWidth: 0,
        
      };

    if(!this.state.isauth && this.state.redirect1) {
      return (<Redirect push to='/login'/>)
    }
      // if (!this.state.loading && this.state.user.cart.length < 1) return (<div><h1>Cart is Empty</h1><h3>Add food in the cart first</h3></div>)
    if(this.state.cart_length == 0 && this.state.redirect2)
    {
      return (<EmptyCart/>);
    }
      return (
      <div>
      { this.state.loading ? 
         <center>
            <Spin
              className="spinner"
              tip="Loading...Please Wait"
              size="large"
            />
          </center>
      :
      <div>
      {/* {  this.state.cart_length > 0 ?   */}
          <div style={{ padding:'8em', paddingTop: '2em'}}>
              
              <h2 style={{padding: '0.8em'}} >FOOD CART</h2>
              {this.state.itemsDetails.map(item =>
            <Card className="view-card" style={{ height: "280px", marginBottom: '2em' }}>
              <Card.Grid hoverable={false} style={gridStyle1}>
                <Image
                  className="image"
                  width={190}
                  height={160}
                  src={item.price ? `http://localhost:4000/restaurantadmin/item/image/${item._id}` : `http://localhost:4000/restaurantadmin/deal/image/${item._id}`}
                  roundedCircle
                />
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle2}>
                <Card className="grid-card">
                  <p>
                    <span className="item-name">{item.name}</span>
                    <br/>
                    <p>{item.description}</p>
                    <hr/>
                    <span className='price'>{item.quantity} x Rs. {item.price ? item.price : item.total_bill}</span><hr/>
                  </p>
                </Card>
              </Card.Grid>
           
               
              <Card.Grid hoverable={false} style={gridStyle}>
                
                <Card className="button-card">
                <Space directon='Horizontal' size='large'>
                <span>Quantity : </span>
                {/* <ItemCounter default={item.quantity} min={1} max={20} onChange={this.onChange.bind(this)} /> */}
                <InputNumber 
                min={1} 
                max={20}  
                value={item.quantity_new ? item.quantity_new: item.quantity}  
                onChange={(value) => {
                  item.quantity_new=value; 
                  item.update = true; 
                  // this.setState(prevState => ({
                  //   update: !prevState.update
                  // }));
                  this.setState({update: false})
                }} 
                />
                </Space>
                </Card><hr/>
                <Card className="grid-card card1">
                {/* <span className='price'>Rs. {item.price ? item.price : item.total_bill}</span> */}
                <span className='price'>Rs. {item.price ? item.price * item.quantity : item.total_bill * item.quantity}</span>

                {/* <span className='price'>Rs. {this.state.Total}</span> */}

                </Card>
                <hr/>
                <span className='button-span'>
                  <Space direction={'horizontal'}>
                { this.state.update || item.update ?
            <Button className='button'  color={'#855b36'} onClick={() => this.addToCart(item.rest_id, item._id, item.quantity_new, item.quantity)}>Update</Button> :
            <Button className='button' disabled color={'#855b36'} onClick={() => this.addToCart(item.rest_id, item._id, item.quantity_new, item.quantity)}>Update</Button>
            }
            {/* <Button className='button'  color={'#855b36'} onClick={() => this.addToCart(item.rest_id, item._id, item.quantity_new, item.quantity)}>Update</Button> */}
          
            <Button className='button'  color={'#855b36'} onClick={()=>this.removeFromCartNew(item.rest_id,item._id)}>Remove</Button>
            {/* onClick={()=>this.removeFromCartNew(item._id)} */}
            </Space>
            </span>

              </Card.Grid>
            </Card>
            
            )}

                
           
            {/* <Divider/> */}
            <br/>
            
             <Card style={{height:"300px", borderRadius: '5px'}}>
            {/* <Card.Grid hoverable={false} style={gridStyle3}> */}
                {/* <Card className="grid-card"> */}
                    <h2>CART TOTALS</h2>
                    <hr/>
                  <p style={{overflow: "hidden"}}>
                    <span className="item-name" style={{float: 'left'}}>Sub Total</span>
                    <span className='price' style={{float: 'right'}}>Rs. {this.state.Total}</span>
                  </p>
                  <hr/>
                  <p style={{overflow: "hidden"}}>
                    <span className="item-name"  style={{float: 'left'}}>Grand Total</span>
                    <span className='price' style={{float: 'right'}}>Rs. {this.state.Total}</span>
                  </p>
                  <hr/>
                  <span className='button-span'>
                  <Button className='button' style={{marginTop: '1em'}} color={'#855b36'} ><Link to="/order/checkout" > Proceed to Checkout</Link></Button>
                  </span>
                {/* </Card> */}
              {/* </Card.Grid> */}
             </Card> 
            <span className='button-span'>
            <Link to={`/home`}>
            <Button className='button' ghost style={{margin:'2em', color: '#855b36'}} color={'#fff'} >Continue Shopping</Button></Link>
            </span>
          </div>
      {/* //  :
      //  <div>
      //     <Redirect push to={'/emptycart'}/>
      //     </div>   
      // } */}
      </div>
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Cart);
