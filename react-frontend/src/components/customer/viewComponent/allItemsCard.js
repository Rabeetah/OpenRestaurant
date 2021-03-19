import React, { Fragment } from "react";
import "antd/dist/antd.css";
import RateComponent from "../../customer/reviewRatingComponents/addRatings";
import RestaurantCard from "../../customer/viewComponent/restaurantCard";
import ItemCard from "../../customer/viewComponent/itemCard";
import DealCard from "../../customer/viewComponent/dealCard";
import "../../customer/customer.css";
import { message, Card, Col, Row, Divider, Input } from "antd";
import Slider from "react-slick";
import { Spin } from "antd";
import ViewItem from "../../customer/viewComponent/viewItem";
import P2Layout from "../../customer/viewComponent/viewRestaurant";
import {
  Link,
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const { Meta } = Card;
const { Search } = Input;

class CLayout extends React.Component {
  state = {
    items: [],
    link: "",
    itemId: "",
    restId: "",
    viewItem: false,
    viewRest: false,
    loading: true,
  };

  componentDidMount = () => {
    const pointerToThis = this;
    fetch("http://localhost:4000/api/ratings/allratingswithitems/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ items: data.items, loading:false }));
  };

  render() {
    const gridStyle = {
      width: "20%",
      textAlign: "center",
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      borderWidth: 0,
      borderColor: '#FFDAB9'
    };

    return (
      <div className='app-container' >
        {this.state.loading ? (
          <center>
            <Spin
              className="spinner"
              tip="Loading...Please Wait" 
              size="large"
            />
          </center>
        ) : (
          <div className="item-card-div" style={{marginTop:"5em"}}>
            <br/>
            {this.state.items.map((item) => (
              <Link style={{ cursor:"pointer" }} to={`/view/${item._id}`} key={item._id}>
              <Card.Grid hoverable={false} style={gridStyle}>
                <a
                  style={{ cursor: "pointer" }}
                >
                  <ItemCard style={{ cursor:"pointer" }}                 
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      ratings={item.avg_rating}
                      count={item.count}
                      img_url={item._id}
                    />
                </a>
              </Card.Grid>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CLayout;
