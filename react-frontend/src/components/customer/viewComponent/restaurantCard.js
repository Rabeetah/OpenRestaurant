import React, { Component } from "react";
import "antd/dist/antd.css";
import "./restaurantCard.css";
import {Rate, Space, Card, Button,Tooltip } from "antd";
import Image from 'react-bootstrap/Image'
import RatingComponent from '../reviewRatingComponents/ratingComponent'
import img from '../../../assets/icons/rest.png';


const { Meta } = Card;

class RestaurantCard extends Component {
  state = {
    // img: this.props.img_id,
    description: this.props.description,
    name: this.props.name,
    location: this.props.location,
    // reviews: this.props.reviews,
    count: this.props.count,
    ratings: this.props.ratings
  };

  render() {
    return (
        <Card className="card-unit" hoverable size="small" style={{width: '200px', height: '320px', alignItem: 'center'}} 
          
            cover={<Image className="cover-image"
              width={100} height={150}
              src={img} roundedCircle
            />}
          >
            
            <Meta className="card-meta" title={this.state.name}  />
            <span className="location">Shop Location: {this.state.location}</span>
            {/* <RatingComponent ratings={3.9} count={this.state.count} type="inner"/> */}
        </Card>
    );
  }
}

export default RestaurantCard;
