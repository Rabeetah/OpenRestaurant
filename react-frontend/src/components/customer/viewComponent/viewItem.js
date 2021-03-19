import React, { Component } from "react";
import "antd/dist/antd.css";
import "./viewItem.css";
import axios from 'axios';
import { message, Divider, Tabs, Spin, Rate, Space, Card, Button, Tooltip, InputNumber} from "antd";
import Image from "react-bootstrap/Image";
import RatingComponent from "../reviewRatingComponents/ratingComponent";
import ReviewComponent from "../reviewRatingComponents/reviewComponent";
// import ItemCounter from "../cartComponents/itemCounter";
// import ItemCounter from '../../layouts/customerLayout/counter'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import Pusher from 'pusher-js';
import { pusher } from '../../pusher';
const { Meta } = Card;
const { TabPane } = Tabs;

class ViewItem extends Component {
  state = {
    itemId: this.props.id,
    rest: '',
    item: "",
    loading: true,
    addCart: true,
    quantity:1,
    update: true,
    redirect: false,
    likedreviews: [],
    isauth: true
  };
  static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
    // error : PropTypes.object.isRequired
}
  onChange = (value) => {
    this.setState({ quantity:value })
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

  addToCart = async() => {
    if(this.props.auth.user){
      this.setState({addCart: false});
      var body =
      {
        cid: this.props.auth.user._id,
        iid: this.state.itemId,
        quantity: this.state.quantity,
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

  componentDidMount= async() => {
    
    var pointerToThis = this;
    var body1 = JSON.stringify({ item: this.state.itemId})
    await fetch(
      `http://localhost:4000/api/ratings/getratings-reviews-item`,
      {
        method: "POST",
        body: JSON.stringify({ item: this.state.itemId}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ item: data }));
    var body = JSON.stringify({ id: this.state.item.rest_id });
    await fetch("http://localhost:4000/restaurantadmin/restaurant/getrestaurant/", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => pointerToThis.setState({ rest: data}));
        if(this.props.auth.isAuthenticated){
          await fetch("http://localhost:4000/api/reviews/review-liked-customer-item", {
              method: "POST",
              body:JSON.stringify({ 
                cid: this.props.auth.user._id, 
                _id: this.state.item._id 
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                if(data) pointerToThis.setState({  likedreviews: data, loading: false });
              });
    }
    else pointerToThis.setState({ loading: false });
    var chan = `${this.state.itemId}`; 
      var channel = pusher.subscribe(chan);
      channel.bind('reviews', async(data) => {
            await fetch(
          `http://localhost:4000/api/ratings/getratings-reviews-item`,
          {
            method: "POST",
            body: JSON.stringify({ item: this.state.itemId}),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then(async(data) => {
            await pointerToThis.setState({update: false })
            await pointerToThis.setState({ item: data, update:true });
          })
      })
       channel.bind('like_dislike', async(data) => {
         await fetch(
          `http://localhost:4000/api/ratings/getratings-reviews-item`,
          {
            method: "POST",
            body: JSON.stringify({ item: this.state.itemId}),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then(async(data) => {
            await pointerToThis.setState({update: false })
            await pointerToThis.setState({ item: data, update:true });
          })
          if(this.props.auth.isAuthenticated){
            await fetch("http://localhost:4000/api/reviews/review-liked-customer-item", {
                method: "POST",
                body:JSON.stringify({ 
                  cid: this.props.auth.user._id, 
                  _id: this.state.item._id 
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then(async(data) => {
                  await pointerToThis.setState({update: false })
                  if(data) pointerToThis.setState({ review_like: data.like_dislike, likedreviews: data, update:true });
                  else pointerToThis.setState({ review_like: [], likedreviews: [], update:true });
                });
          }else pointerToThis.setState({ loading: false });
      })

      channel.bind('undo_like_dislike', async(data) => {
        await fetch(
          `http://localhost:4000/api/ratings/getratings-reviews-item`,
          {
            method: "POST",
            body: JSON.stringify({ item: this.state.itemId}),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then(async(data) => {
            await pointerToThis.setState({update: false })
            await pointerToThis.setState({ item: data, update:true });
          })
          if(this.props.auth.isAuthenticated){
            await fetch("http://localhost:4000/api/reviews/review-liked-customer-item", {
                method: "POST",
                body:JSON.stringify({ 
                  cid: this.props.auth.user._id, 
                  _id: this.state.item._id 
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then(async(data) => {
                  await pointerToThis.setState({update: false })
                  if(data) pointerToThis.setState({ review_like: data.like_dislike, likedreviews: data, update:true });
                  else pointerToThis.setState({ review_like: [], likedreviews: [], update:true });
                });
          }else pointerToThis.setState({ loading: false });
      })
      
  }
  wasInLiked = async(_id) => {
    await this.state.item.reviews.find(review => {
        return review._id === _id
    })
  }
  render() {
    const {isAuthenticated, user} = this.props.auth;
    const gridStyle = {
      width: "45%",
      textAlign: "left",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle1 = {
      width: "30%",
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
    if(!isAuthenticated && this.state.redirect) {
      return (<Redirect push to='/login'/>)
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
        ) : (
          <div style={{ paddingTop:'4em'}} >
            <Card className="view-card" style={{ height: "280px" }}>
              <Card.Grid hoverable={false} style={gridStyle1}>
                <Image
                  className="image"
                  width={250}
                  height={220}
                  src={`http://localhost:4000/restaurantadmin/item/image/${this.state.itemId}`}
                  roundedCircle
                />
                
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle2}>
                <Card className="grid-card">
                  <p>
                    <span className="item-name">{this.state.item.name}</span>
                    <br/>
                    {this.state.item.description}<hr/>
                    <span className='price'>Rs. {this.state.item.price}</span><hr/>
                  </p>
                  <RatingComponent
                    ratings={this.state.item.avg_rating}
                    count={this.state.item.count}
                    type="inner"
                  />
                </Card>
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Card className="grid-card card1">
                  <p>{this.state.rest.name}</p>
                  {/* <RatingComponent
                    ratings={4.1}
                    count={32}
                    type="inner"
                  /> */}
                </Card>
                <hr/>
                <Card className="button-card">
                <Space directon='Horizontal' size='large'>
                {/* <ItemCounter default={1} min={1} max={10}/> */}
                <InputNumber min={1} max={20} defaultValue={1} onChange={this.onChange} />
                <Button className='button' loading={!this.state.addCart} id='add-cart-button' color={'#855b36'} onClick={()=>this.addToCart()}>Add to Cart</Button>
                </Space>
                </Card>
              </Card.Grid>
            </Card>
            <Divider/>
            <Card>
            <Tabs className='review-tabs' defaultActiveKey="1">
              <TabPane tab="All Reviews" key="1">
              {this.state.item.reviews.map(review =>
              (this.state.update ?
              (this.state.likedreviews.length>0 ? 
              <div>
                {this.state.likedreviews.map(review_id => 
                  review_id.review == review._id ?
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  c_name={review.c_name}
                  date={review.date_time}
                  primary={review_id.like_dislike == 1 ? 'primary' : 'false'} 
                  disprimary={review_id.like_dislike == -1 ? 'primary' : 'false'} 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.item._id}
                  />
                  :
                  this.state.likedreviews.some(x => x.review === review._id) ?  "" :
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id}
                  c_name={review.c_name}
                  date={review.date_time} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.item._id}
                  />)
                
                }
                </div>
                :
                <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  c_name={review.c_name}
                  date={review.date_time}
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.item._id}
                  />
              )
              : ''
              )
              )}
              </TabPane>
              <TabPane tab="Positive Reviews" key="2">
                {this.state.item.reviews.map(review =>
                (this.state.update ?
                (review.good_review == 1 ?
                <>
                {this.state.likedreviews.length>0 ?
                this.state.likedreviews.map(review_id => 
                  review_id.review == review._id ?
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  c_name={review.c_name}
                  date={review.date_time}
                  primary={review_id.like_dislike == 1 ? 'primary' : 'false'} 
                  disprimary={review_id.like_dislike == -1 ? 'primary' : 'false'} 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.item._id}
                  />
                  :
                  this.state.likedreviews.some(x => x.review === review._id) ?  "" :
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id}
                  c_name={review.c_name}
                  date={review.date_time} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.item._id}
                  />
                )
                :
                <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id}
                  c_name={review.c_name}
                  date={review.date_time} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.item._id}
                  />
                }
                </>
                : '')
                :"")
              )}
              </TabPane>
              <TabPane tab="Critical Reviews" key="3">
                {this.state.item.reviews.map(review =>
                (this.state.update ?
                (review.good_review != 1 ?
                <>
                {this.state.likedreviews.length>0 ?
                this.state.likedreviews.map(review_id => 
                  review_id.review == review._id ?
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  c_name={review.c_name}
                  date={review.date_time}
                  primary={review_id.like_dislike == 1 ? 'primary' : 'false'} 
                  disprimary={review_id.like_dislike == -1 ? 'primary' : 'false'} 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.item._id}
                  />
                  :
                  this.state.likedreviews.some(x => x.review === review._id) ?  "" :
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id}
                  c_name={review.c_name}
                  date={review.date_time} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.item._id}
                  />
                )
                :
                <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id}
                  c_name={review.c_name}
                  date={review.date_time} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.item._id}
                  />
                }
                </>
                : '')
                :"")
              )}
              </TabPane>
            </Tabs>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null) (ViewItem);
