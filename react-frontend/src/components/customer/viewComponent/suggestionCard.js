import React, { Component } from "react";
import "antd/dist/antd.css";
import "./restaurantCard.css";
import {Rate, Space, Card, Button,Tooltip } from "antd";
import Image from 'react-bootstrap/Image'
import RatingComponent from '../reviewRatingComponents/ratingComponent'

const { Meta } = Card;

class SuggestionCard extends Component {
  state = {
    img: this.props.img_url,
    price: this.props.price,

    isItem: this.props.isItem
  };

  render() {
    return (
        <Card className="card-unit" hoverable size="small" style={{width: '350px', height: '200px', overflow: 'hidden', alignItem: 'center'}} >
            <br/>
            <Image
              width={100} height={100} style={{float: 'left'}}
              src={this.state.isItem ? `http://localhost:4000/restaurantadmin/item/image/${this.state.img}`: `http://localhost:4000/restaurantadmin/deal/image/${this.state.img}`} roundedCircle/>
            
            <span style={{float: 'left', maxWidth: '200px'}}>
            <center> <span><b>{this.props.name}</b></span><br/>
            <span style={{maxWidth: '100px'}}>{this.props.description}</span><br/>
            <span className="price">Rs. {this.state.price}</span> 
            </center>
            <RatingComponent ratings={this.props.ratings} count={this.props.count} type="inner"/>
            </span>
        </Card>
    );
  }
}

export default SuggestionCard;
