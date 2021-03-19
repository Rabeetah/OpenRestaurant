import React, { Component } from "react";
import "antd/dist/antd.css";
import "./review.css";
import { Popconfirm, Card, Button,Tooltip } from "antd";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

class ReviewComponent extends Component {
  state = {
    likes: this.props.likes,
    dislikes: this.props.dislikes,
    review: this.props.review,
    review_id: this.props.review_id,
    item_id: this.props.item_id,
    primary: this.props.primary,
    disprimary: this.props.disprimary,
    redirect: false,
    visible: false
  };

  static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
    // error : PropTypes.object.isRequired
  }

  confirm = (e) => {
    console.log(e);
    this.setState({redirect:true});
  }
  cancel =(e)=> {
    console.log(e);
    this.setState({visible: false});
  }

  onLike = async() => {
    if(this.props.auth.isAuthenticated){
      if(this.state.primary == 'primary'){
        this.setState({primary: 'false', likes: this.state.likes - 1})
        this.likeDislikeReview(true, false, this.state.review_id, false)
      }
      else {
        if (this.state.disprimary == 'primary') {
          this.setState({disprimary: 'false', dislikes: this.state.dislikes - 1})
          await this.likeDislikeReview( false, true, this.state.review_id, false)
        }
        this.setState({primary: 'primary', likes: this.state.likes + 1})
        await this.likeDislikeReview(true, false, this.state.review_id, true)
      }
    }
    else {
        this.setState({visible: true});
    }
  }

  onDisLike = async() => {
    if(this.props.auth.isAuthenticated){
      if(this.state.disprimary == 'primary'){
        this.setState({disprimary: 'false', dislikes: this.state.dislikes - 1})
        this.likeDislikeReview( false, true, this.state.review_id, false)
      }
      else {
        if (this.state.primary == 'primary') {
          this.setState({primary: 'false', likes: this.state.likes - 1})
          await this.likeDislikeReview( true, false, this.state.review_id, false)
        }
        this.setState({disprimary: 'primary', dislikes: this.state.dislikes + 1})
        await this.likeDislikeReview(false, true, this.state.review_id, true)
      }
    }
    else {
      this.setState({visible: true});
    }
  }

  likeDislikeReview = (like=false, dislike=false, review_id, inc=true) => {
    const pointerToThis = this;
    if(like){
        if(inc){
          fetch(
            `http://localhost:4000/api/reviews/thumbsup`,
            {
              method: "PUT",
              body: JSON.stringify({ _id: review_id, cid: pointerToThis.props.auth.user._id, itemid: this.state.item_id}),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
        }
        else{
          fetch(
            `http://localhost:4000/api/reviews/decthumbsup`,
            {
              method: "PUT",
              body: JSON.stringify({ _id: review_id, cid: pointerToThis.props.auth.user._id, itemid: this.state.item_id}),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
        }
    }
    else if(dislike){
        if(inc){
          fetch(
            `http://localhost:4000/api/reviews/thumbsdown`,
            {
              method: "PUT",
              body: JSON.stringify({ _id: review_id, cid: pointerToThis.props.auth.user._id, itemid: this.state.item_id}),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
        }
        else{
          fetch(
            `http://localhost:4000/api/reviews/decthumbsdown`,
            {
              method: "PUT",
              body: JSON.stringify({ _id: review_id, cid: pointerToThis.props.auth.user._id, itemid: this.state.item_id}),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
        }
    }
  }

  render() {
    if(this.state.redirect) return (<Redirect push to={'/login'}/>)
    return (
      <div className="review-card">
        <Card className="card-review">
          <h4>
            <Tooltip title="Like">
              <Button shape="omitted" 
              type={this.state.primary}
              onClick={()=> this.onLike()} 
              icon={<LikeOutlined />}
              >
               {this.state.likes}
               </Button>
            </Tooltip>
            <Popconfirm
            title="You can not complete this action without login. Would you like to login?"
            onConfirm={()=>this.confirm()}
            visible={this.state.visible}
            onCancel={()=>this.cancel()}
            okText="Login"
            cancelText="Cancel"
          >
          </Popconfirm>
            <Tooltip title="Dislike">
              <Button shape="omitted" 
              type={this.state.disprimary}
              onClick={()=> this.onDisLike()} 
              icon={<DislikeOutlined />}
              > 
              {this.state.dislikes} 
              </Button>
            </Tooltip>
          </h4>
          <p className="content">
            {this.state.review}
            </p>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null) (ReviewComponent);
