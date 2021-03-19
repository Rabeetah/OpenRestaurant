import React, { Component } from "react";
import "antd/dist/antd.css";
import {Rate, Card, Button,Tooltip } from "antd";

class RatingComponent extends Component {
  state = {
    ratings: this.props.ratings,
    count: this.props.count,
    type: this.props.type
  };
  componentWillReceiveProps({rating}) {
  this.setState({...this.state,rating})
}
  render() {
    return (
      // <div className="rating-card">
        <Card className="rating-unit" size="small"  style={{width: '180px', alignItem: 'left'}}  type={this.state.type} >
        { this.state.ratings ?
          <Rate className="rate"  disabled allowHalf style={{color: '#bb8c63'}}  value={this.state.ratings} /> : 
          <Rate className="rate"  disabled allowHalf style={{color: '#aaa'}}  value={5} /> }
          {(this.state.count != null) ? <>({this.state.count})</> : ''}
        </Card>
      // </div>
    );
  }
}

export default RatingComponent;