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
    rests: [],
    link: "",
    itemId: "",
    restId: "",
    viewItem: false,
    viewRest: false,
    loading: true,
  };

  componentDidMount = () => {
    const pointerToThis = this;
    fetch("http://localhost:4000/customer/restaurant/viewrestaurant/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ rests: data, loading: false }));
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
      <div className='app-container'>
        {this.state.loading ? (
          <center>
            <Spin
              className="spinner"
              tip="Loading...Please Wait"
              size="large"
            />
          </center>
        ) : (
          <div className="rest-card-div" style={{marginTop:"5em"}}>
            {this.state.rests.map((rest) => (
              <Link style={{ cursor:"pointer" }} to={`/restaurantview/${rest._id}`} key={rest._id}>
              <Card.Grid hoverable={false} style={gridStyle}>
                  <RestaurantCard
                    name={rest.name}
                    location={rest.location}
                    ratings={rest.average_ratings}
                    count={rest.rating_count}
                  />
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
