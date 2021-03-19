import React, { Component } from "react";
import "antd/dist/antd.css";
import "./cardComponents.css";
import { Card, Button, Tooltip } from "antd";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

class IconButton extends Component {
  state = {
    icon: this.props.icon,
    text: this.props.text,
    type: this.props.type,
  };

  render() {
    let button;
    if (this.state.icon === 'addToCart') {
        button = <Tooltip title="Add to Cart">
      <Button type="primary" icon={<i  class="material-icons md-24 #855b36">add_shopping_cart</i>} >Add to Cart </Button>
    </Tooltip>
    }
    else if (this.state.icon === 'add') {
        button = <Tooltip title="Add to Cart">
        <Button type="primary" shape="circle" icon={<i  class="material-icons md-24 #855b36">add_shopping_cart</i>} />
        </Tooltip>
    }
    return (
      <div className="icon-button">
        {button}
      </div>
    );
  }
}

export default IconButton;
