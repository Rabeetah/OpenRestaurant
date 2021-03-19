import React, { Component } from "react";
import "antd/dist/antd.css";
import {Rate, Card, Button,Tooltip } from "antd";

class RateComponent extends Component {
  state = {
    ratings: this.props.ratings,
    count: this.props.count,
  };

  render() {
    return (
      <div className="rating-card">
        <Card className="rating-unit">
          <Rate className="rate" allowHalf style={{color: '#278d7c'}} defaultValue= {2.5}/>
        </Card>
      </div>
    );
  }
}

export default RateComponent;
