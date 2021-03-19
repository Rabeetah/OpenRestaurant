import React, {Fragment} from "react";
import "antd/dist/antd.css";
import RateComponent from "../../customer/reviewRatingComponents/addRatings";
import RestaurantCard from "../../customer/viewComponent/restaurantCard";
import ItemCard from "../../customer/viewComponent/itemCard";
import AllItemsCard from "../../customer/viewComponent/allItemsCard";
import DealCard from "../../customer/viewComponent/dealCard";
import SuggestionCard from "../../customer/viewComponent/suggestionCard";
import AllRestaurantsCard from "../../customer/viewComponent/allRestaurantsCard";
import "../../customer/customer.css";
import { message, Card, Col, Row, Divider, Input } from "antd";
import Slider from "react-slick";
import { Spin } from "antd";
import CallViewItem from "../../customer/viewComponent/callViewItem";
import ViewRest from "../../customer/viewComponent/callViewRest";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const { Meta } = Card;
const { Search } = Input;

class Home extends React.Component {
  state = {
    rests: [],
    items: [],
    deals: [],
    link: '',
    itemId: '',
    restId: '',
    viewItem: false,
    viewRest: false,
    loading: true,
    suggestions: []
  };


  componentWillMount = async() => {
    const pointerToThis = this;
    fetch("http://localhost:4000/customer/restaurant/viewrestaurant/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ rests: data, loading: false }));

    fetch("http://localhost:4000/api/ratings/allratingswithitems/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ items: data.items, deals: data.deals }));
    
    if(!this.props.auth.isLoading && this.props.auth.isAuthenticated){
      await fetch("http://localhost:4000/api/ratings/suggestions/", {
        method: "POST",
        body: JSON.stringify({
          user_id: this.props.auth.user._id
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          pointerToThis.setState({ suggestions: data.items });
        })
    }
  }

  render() {
    const settings = {
      className: "center",
      infinite: true,
      lazyLoad: true,
      centerPadding: "80px",
      slidesToShow: 5,
      autoplay: true,
      speed: 500,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const settings1 = {
      className: "center",
      infinite: true,
      lazyLoad: true,
      centerPadding: "80px",
      slidesToShow: 3,
      autoplay: true,
      speed: 500,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        }
      ],
    };

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
          <div className="rest-card App-intro">
            {this.props.auth.isAuthenticated && this.state.suggestions ?
             <Card
              className="all-rest-card"
              title="You May Like"
            >
            {this.state.suggestions.length > 3 ?
              <Slider {...settings1}>
                {this.state.suggestions.map((item) => (
                  <Link style={{ cursor:"pointer" }} to={item.price ? `/view/${item._id}` : `/viewdeal/${item._id}`} key={item._id}>
                    <SuggestionCard style={{ cursor:"pointer" }}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      ratings={item.avg_rating}
                      count={item.count}
                      img_url={item._id}
                      isItem={item.price ? true : false}
                    />
                  </Link>
                ))}
              </Slider>
              :
              <div style={{overflow: 'hidden'}}>
               {this.state.suggestions.map((item) => (
                  <Link style={{ cursor:"pointer", float: 'left', marginRight: '4em' }} to={item.price ? `/view/${item._id}` : `/viewdeal/${item._id}`} key={item._id}>
                    <SuggestionCard style={{ cursor:"pointer" }}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      ratings={item.avg_rating}
                      count={item.count}
                      img_url={item._id}
                      isItem={item.price ? true : false}
                    />
                  </Link>
                  
                ))}</div>}
            </Card>
            : ''}
            <Card
              className="all-rest-card"
              title="All Restaurants"
              extra={<a className="link" href="/allrestaurants" >Show All</a>}
            >
              <Slider {...settings}>
                {this.state.rests.map((rest) => (
                  <Link style={{ cursor:"pointer" }} to={`/restaurantview/${rest._id}`} key={rest._id}>
                  <RestaurantCard
                    name={rest.name}
                    location={rest.location}
                    ratings={rest.average_ratings}
                    count={rest.rating_count}
                  /></Link>
                ))}
                {this.state.rests.map((rest) => (
                  <Link style={{ cursor:"pointer" }} to={`/restaurantview/${rest._id}`} key={rest._id}>
                  <RestaurantCard
                    name={rest.name}
                    location={rest.location}
                    ratings={rest.average_ratings}
                    count={rest.rating_count}
                  />
                  </Link>
                ))}
              </Slider>
            </Card>
            {/* {this.state.viewRest ? 
            ViewRestLink
            : ''} */}
            {/* <Divider className="divider" orientation="left" /> */}
            <Card
              className="all-rest-card"
              title="All Items"
              extra={<a className="link" href="/allfoods" >Show All</a>}
            >
              <Slider {...settings}>
                {this.state.items.map((item) => (
                  <Link style={{ cursor:"pointer" }} to={`/view/${item._id}`} key={item._id}>
                    <ItemCard style={{ cursor:"pointer" }}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      ratings={item.avg_rating}
                      count={item.count}
                      img_url={item._id}
                    />
                  </Link>
                ))}
              </Slider>
            </Card>
            {/* {this.state.viewItem ? 
            ViewItemLink
            : ''} */}
            <Card
              className="all-rest-card"
              title="All Deals"
              extra={<a className="link" href="/alldeals" >Show All</a>}
            >
              <Slider {...settings1}>
                {this.state.deals.map((deal) => (
                <Link style={{ cursor:"pointer" }} to={`/viewdeal/${deal._id}`} key={deal._id}>
                    <DealCard style={{ cursor:"pointer" }}
                      name={deal.name}
                      description={deal.description}
                      price={deal.total_bill}
                      ratings={deal.avg_rating}
                      count={deal.count}
                      img_url={deal._id}
                    />
                </Link>
                ))}
              </Slider>
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

export default connect(mapStateToProps, null) (Home);
