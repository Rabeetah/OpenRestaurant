import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import NoOrder from './noorder';
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


class Orderhistory extends React.Component {

    state = {
        orderId: this.props.orderId,
        user: '',
        order: '',
        loading: true,
        itemsDetails: [],
        Total: 0,
        redirect: false,
        redirect1: false,
        showTotal: false,
        orders: []
    }

    
   static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
    // error : PropTypes.object.isRequired
}
    // const { orderId } = '804779893';


    componentDidMount = async () => {
        while (this.props.auth.isLoading){}
        await this.setState({user: this.props.auth.user, isauth: this.props.auth.isAuthenticated})
        await this.getOrderCustomer();
    };

    date = (ordertime) => {
        // const a = Date.now();
        // console.log(a)
        var today = new Date(ordertime);
        return today.toString()
        // const today = this.state.order.ordertime;

        return (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today));
    }

    cartDisplay = async () => {
        var pointerToThis = this;
        let cartItems = [];
        let userCart = [];
        // message.info('we are inside')
        this.state.orders.forEach(rest => {
            // console.log('c')
            rest.ordered_food.forEach(item => {
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
                pointerToThis.setState({ itemsDetails: response.data,  loading: false  });
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
            console.log('totalllll ' + total)
        });

        this.setState({ Total: total })
        this.setState({ showTotal: true })
    }

    getOrderCustomer = async () => {
        var body = {
            cid: this.props.auth.user._id,
            orderid: this.state.orderId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        var pointerToThis = this; var ordersNotExist = true;
        await axios.post('http://localhost:4000/customer/order/viewordercustomer', body, config)
            .then((res) => {
                if(res.data.length > 0) pointerToThis.setState({ orders: res.data});
                else pointerToThis.setState({redirect1: true});
                // alert(' Order Viewed')
                console.log(res)
                
            })
            .catch(err => console.log(err))
        console.log(this.state.orders)
        this.cartDisplay();
        
    }

    render()
    {
        const {isAuthenticated, user} = this.props.auth;
        if(!isAuthenticated && this.state.redirect) {
        return (<Redirect push to='/login'/>)
        }
        if(this.state.redirect1 && this.state.orders.length < 1) {
        return (<NoOrder/>)
        }
        return(
            <div>
                {this.state.loading ? (
                <center>
                    <Spin
                    className="spinner"
                    tip="Loading...Please Wait"
                    size="large"
                    />
                </center>
                ) : (
                    <div style={{paddingTop: '2em'}}>
                <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                    <h4>
                        ORDER SUMMARY
                    </h4>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Order Number</span>
                        <span className='price' style={{float: 'right'}}>{this.state.orderId}</span>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Status</span>
                        <span className='price' style={{float: 'right'}}>Pending</span>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Date</span>
                        <span className='price' style={{float: 'right'}}>{this.date(this.state.orders[0].ordertime)}</span>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Email</span>
                        <span className='price' style={{float: 'right'}}>{this.state.user.email}</span>
                    </p>
                    <hr/>
                   
                </Card> 
                <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                    <h4>
                        CART DETAILS
                    </h4>
                    <hr/>
                    <div>
                        {this.state.itemsDetails.map(item =>
                        <p>
                            <p style={{overflow: "hidden"}}>
                                {/* <span style={{float: 'left'}}>Email</span>
                                <span className='price' style={{float: 'right'}}>{this.state.user.email}</span> */}
                                <div style={{float: 'left'}}>
                                <span className="item-name">{item.name}</span>
                                <br/>
                                <p>{item.description}</p>
                                </div>
                                <div style={{float: 'right'}}>
                                <span className='price'>{item.quantity} x Rs. {item.price ? item.price : item.total_bill}</span>
                                </div>
                                
                            </p> 
                            <hr/>
                        </p> 
                        )}
                    </div>
                </Card>
                <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                    <p style={{overflow: "hidden"}}>
                        <h5 style={{float: 'left'}}>Sub Total</h5>
                        <h5 className='price' style={{float: 'right'}}>PKR. {this.state.Total}</h5>
                    </p>
                    {/* <hr/>
                    <p style={{overflow: "hidden"}}>
                        <h6 style={{float: 'left'}}>Discount</h6>
                        <h6 className='price' style={{float: 'right'}}>PKR. 0</h6>
                    </p> */}
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <h4 style={{float: 'left'}}>Total</h4>
                        <h4 className='price' style={{float: 'right'}}>PKR. {this.state.Total}</h4>
                    </p>
                </Card>
                <br/> <br/>
                </div>
                )}
            </div>
        )
    }

}


const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null) (Orderhistory)