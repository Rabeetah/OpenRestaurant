import React, {Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import { Navbar, Nav, Form, NavDropdown, Container } from 'react-bootstrap';
import "antd/dist/antd.css";
import RateComponent from "../../customer/reviewRatingComponents/addRatings";
import RestaurantCard from "../../customer/viewComponent/restaurantCard";
import ItemCard from "../../customer/viewComponent/itemCard";
import AllItemsCard from "../../customer/viewComponent/allItemsCard";
import DealCard from "../../customer/viewComponent/dealCard";
import AllRestaurantsCard from "../../customer/viewComponent/allRestaurantsCard";
import "../../customer/customer.css";
import { message, Card, Col, Row, Divider, Input } from "antd";
import Slider from "react-slick";
import { Spin } from "antd";
import Home from './home';
import ViewItem from "../../customer/viewComponent/viewItem";
import P2Layout from "../../customer/viewComponent/viewRestaurant";
import ViewRest from "../../customer/viewComponent/callViewRest";
import CallViewItem from "../../customer/viewComponent/callViewItem";
import Mobile from './mobileNav';
import Table from './tabletNav';
import { Drawer, Button, Radio, Space } from 'antd';
import { Link, Redirect, BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
const { Meta } = Card;
const { Search } = Input;

class MobileLayout extends React.Component {
    state={
        visible: false
    }
    showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    
      return(
            <div className="app-container" style={{height: 'max-content'}}>
            <div style={{backgroundColor: 'white', height: '2em', overflow: 'hidden', width: 'inherit'}}>
            <Button shape="circle" style={{border: 'none', color: '#855b36', float: 'left'}} onClick={this.showDrawer} icon={<span class="material-icons md-light" >menu</span>}> </Button>
            <h3 style={{float: 'right'}}><a href="/">Open Restaurant</a></h3></div>
            
                <Router>
               <Drawer
                    title="Menu"
                    onClose={this.onClose}
                    visible={this.state.visible}
                    placement="left"
                    footer="Open Restaurant"
                    >
                    
                    <Link className="link" to="/home" >Home</Link><br/><hr/><br/>
                    <Link className="link" to="/allrestaurants" >Restaurants</Link><br/><hr/><br/>
                    <NavDropdown title="Menu" id="collasible-nav-dropdown" style={{paddingRight:'5em'}}>
                                <NavDropdown.Item href=""><Link className="link" to="/allfoods" >Items</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href=""><Link className="link" to="/alldeals" >Deals</Link></NavDropdown.Item>
                            </NavDropdown>
                            <Link to="" style={{paddingRight:'5em'}}>Sign Up/Sign In</Link>
                            <br/><hr/><br/>
                        <Form inline>
                            <i class="material-icons" style={{paddingRight:'2.5em'}}><Link className="link" to="/home" >shopping_cart</Link></i>
                        </Form>
                    </Drawer>
                    <br/>
                    <Search
              className="search-box"
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              enterButton
            />
                <Container className='App-intro' style={{marginRight:'1em', marginLeft:'1em'}}>
                <Switch>
                  <Route exact path="/" component={Home}/>    
                  <Route path="/home" component={Home}/>
                  <Route path='/allrestaurants' component={AllRestaurantsCard}/>
                  <Route path='/allfoods' component={AllItemsCard}/>
                  <Route path='/restaurantview/:id' component={ViewRest}/>
                  <Route path='/view/:id' component={CallViewItem}/>
                </Switch>
                </Container>
                </Router>
            </div>
    );
  }
}

export default MobileLayout;
