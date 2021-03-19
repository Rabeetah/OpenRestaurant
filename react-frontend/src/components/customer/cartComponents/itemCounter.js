// import React, { Component } from "react";
// import "antd/dist/antd.css";
// import "./cartComponents.css";
// import { Card, Space, Button, Tooltip } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// class ItemCounter extends Component {
//   state = {
//     default: this.props.default,
//     min: this.props.min,
//     max: this.props.max,
//   };

//   render() {
//     return (
//       <div className="input-number">
//         <Space direction='Horizontal'>
//             <Button icon={<LeftOutlined />} type="primary" size='small' shape="circle"/>
//             <p className='input-value'>{this.state.default}</p>
//             <Button type="primary" size='small' shape="circle" icon={<RightOutlined />}/>
//         </Space>
//       </div>
//     );
//   }
// }

// export default ItemCounter;






class Itemcounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks:0,
      show:true
    };
  }
  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  }
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  }
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  }


  render()
  {
    return(
      <div>
        <button onClick={this.IncrementItem}>Click to increment by 1</button>
        <button onClick={this.DecreaseItem}>Click to decrease by 1</button>
        <button onClick={this.ToggleClick}>
          { this.state.show ? 'Hide number' : 'Show number' }
        </button>
        { this.state.show ? <h2>{ this.state.clicks }</h2> : '' }
      </div>
    );
  }


}
export default Itemcounter;
