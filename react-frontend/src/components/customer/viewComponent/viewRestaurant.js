import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { message, Button, Card, Spin } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import img from '../../../assets/icons/rest.png';
class P2Layout extends React.Component {
  state = {
    // user: this.props.user,
    rest_id: this.props.id,
    rest: "",
    loading: true,
    addCart: true,
    user: '',
    redirect: false,
  };
    
   static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
    // error : PropTypes.object.isRequired
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

  componentDidMount = () => {
    var body = JSON.stringify({ id: this.state.rest_id });
    const pointerToThis = this;
    fetch("http://localhost:4000/restaurantadmin/restaurant/getrestaurant/", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ rest: data, loading: false }));
  };


  addToCart = async(itemId) => {
    if(this.props.auth.user){
      this.setState({addCart: false});
      var body =
      {
        cid: this.props.auth.user._id,
        iid: itemId,
        quantity: 1,
        rid: this.state.rest._id
      }
      var header= {
        'Content-Type': 'application/json'
      }
      var res = await axios.post(`http://localhost:4000/customer/cart/addCart`, body, header
      )
      if (res.status == 200){
        this.success('Added to cart')
        this.props.auth.user.cart = res.data;
      } 
      else  this.error('Try Again')
      this.setState({addCart: true});
    }
    else await this.setState({redirect: true});
    
};


  render() {
    const {isAuthenticated, user} = this.props.auth;
    const gridStyle = {
      width: "20%",
      textAlign: "left",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle2 = {
      width: "65%",
      textAlign: "left",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle1 = {
      padding: '2em',
      width: "10%",
      textAlign: "center",
      justifyContent: "center",
      borderWidth: 0,
    };
    if(!isAuthenticated && this.state.redirect) {
      return (<Redirect push to='/login'/>)
    }
    return (
      <div style={{ padding: "1.5em 1.5em" }}>
        {this.state.loading ? (
          <center>
          <Spin
            className="spinner"
            tip="Loading...Please Wait"
            size="large"
          />
        </center>
        ) : (
          <div style={{paddingTop:"3em", justifyContent:'center'}}>
            <div href="#" class="list-group-item list-group-item-action">
              <div
                style={{ alignContent: "space-between" }}
                class="d-flex w-55 "
              >
                <img
                  src={img}
                  style={{ margin: "0.75em" }}
                  width="250"
                  height="250"
                  class="rounded-circle"
                />
                <div
                  class="justify-content-between"
                  style={{
                    display: "inline",
                    alignContent: "space-between",
                    marginTop: "5em ",
                  }}
                >
                  <h2 key={this.state.rest.name}>{this.state.rest.name}</h2>
                  <p key={this.state.rest.location}>
                    {this.state.rest.location}
                  </p>
                  <p class="mb-1" style={{ display: "block" }}>
                    It is a leading international fast food brand that
                    specializes in the crispy fried chicken and is well known
                    for its zinger burgers.
                  </p>
                </div>
              </div>
            </div>
            <br />
            <h2>MENU</h2>
            <hr/>
            {this.state.rest.menu ? 
            <div class="list-group">
              <div>
              {this.state.rest.menu.submenus.map((submenu) => (
                <div>
                    <div>
                      <h4 key={submenu.name}>{submenu.name}</h4>
                      <hr />
                    </div>
                    {submenu.items.map((item) => (
                      <div style={{justifyContent:'center' }}>
                        <Card className="view-card" style={{ height: "12em" }}>
                        <Card.Grid hoverable={false} style={gridStyle}>
                            <Link style={{ cursor:"pointer" }} to={`/view/${item._id}`} key={item._id}>
                            <img
                              src={`http://localhost:4000/restaurantadmin/item/image/${item._id}`}
                              style={{ marginRight: "40px" }}
                              width="110"
                              height="110"
                              class="rounded-circle"
                            />
                            </Link>
                          </Card.Grid>
                          <Card.Grid hoverable={false} style={gridStyle2}>
                            <Link style={{ cursor:"pointer" }} to={`/view/${item._id}`} key={item._id}>
                            <div>
                              <h5 class="mb-1" key={item.name}>
                                {item.name}
                              </h5>
                              <h6 class="mb-1" key={item.price}>
                                Rs. {item.price}
                              </h6>
                              <p key={item.description}>
                                {item.description}
                              </p>
                            </div>
                            </Link>
                          </Card.Grid>
                          <Card.Grid hoverable={false} style={gridStyle1}>
                          <div style={{justifyContent:'center', padding: '2em'}}>
                            <i style={{ cursor:"pointer" }} loading={!this.state.addCart} onClick={()=>this.addToCart(item._id)} class="material-icons">add_shopping_cart</i>
                          </div>
                          </Card.Grid>
                          </Card>
                        <hr />
                      </div>
                    ))}
                  <br />
                </div>
              ))}
              </div>

              <div>
                <div class="list-group">
                <h4>DEALS MENU</h4>
                    {this.state.rest.menu.deals.map(deal =>
                    <div>
                    <Card className="view-card" style={{ height: "150px", justifyContent:'center' }}>
                        <Card.Grid hoverable={false} style={gridStyle}>
                            <Link style={{ cursor:"pointer" }} to={`/viewdeal/${deal._id}`}  key={deal._id}>
                            <img src = {`http://localhost:4000/restaurantadmin/deal/image/${deal._id}`} 
                            style={{marginRight: '40px' }} 
                            width="100" 
                            height="100" 
                            />
                            </Link>
                          </Card.Grid>
                          <Card.Grid hoverable={false} style={gridStyle2}>
                            <Link style={{ cursor:"pointer" }} to={`/viewdeal/${deal._id}`}  key={deal._id}>
                            <div>
                              <h5 class="mb-1" key={deal.name}>{deal.name}</h5>
                              <p class="mb-1" key={deal.total_bill}>{deal.total_bill}</p>
                              <small key={deal.description}>{deal.description}</small>
                          </div>
                            </Link>
                          </Card.Grid>
                          <Card.Grid hoverable={false} style={gridStyle1}>
                            <i style={{ cursor:"pointer" }} loading={!this.state.addCart} onClick={()=>this.addToCart(deal._id)} class="material-icons" >add_shopping_cart</i>
                      </Card.Grid>
                    </Card>
                  <hr />
                  </div>
                )}
                </div>      
              </div>
            </div>
            : ''}
            {this.props.auth.isAuthenticated ?
             <Link style={{ cursor:"pointer" }} to={`/chat/${this.state.rest_id}/${this.props.auth.user._id}`}>
            <Button  className='app-chatbox-button' type='primary' icon={<WechatOutlined id='chat-icon' color='#fff' height='4em' width='4em'/>}></Button></Link>
          : ''}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(P2Layout);
