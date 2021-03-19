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
import { Link, Redirect, BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
const { Meta } = Card;
const { Search } = Input;

class Tablet extends React.Component {

  render() {
      return(
            <div className="app-container" style={{height: 'max-content'}}>
                <Router>
                <Container style={{marginRight:'0em', marginLeft:'0em'}}>
                    <br/>
                    {/* <Navbar bg="light" variant="light" sticky="top" style={{width: '100%', margin: 0, left: '-1', sticky: '-1', positon: 'fixed', top: '-1'}}>
                        <Navbar.Brand href="/">Open Restaurant</Navbar.Brand>
                        </Navbar> */}
                        <h3 style={{padding: '0.5em', backgroundColor: 'white', width: 'inherit'}}>Open Restaurant</h3>
                        <Navbar bg="light" variant="light" sticky="top" style={{ margin: 0, justifyContent: 'space-between', alignContent: 'left', left: '-1', sticky: '-1', positon: 'fixed', top: '-1'}}>
                        <Nav >
                            <Nav.Link href="" style={{paddingRight:'1em'}}><Link className="link" to="/home" >Home</Link></Nav.Link>
                            <Nav.Link href="" style={{paddingRight:'1em'}}>Restaurants</Nav.Link>
                            {/* <Nav.Link href="" style={{paddingRight:'5em'}}>Menu</Nav.Link> */}
                            <NavDropdown title="Menu" id="collasible-nav-dropdown" style={{paddingRight:'1em'}}>
                                <NavDropdown.Item href="">Items</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="">Deals</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="" style={{paddingRight:'1em'}}>Sign Up/Sign In</Nav.Link>
                        </Nav>
                        <Form inline>
                            <i class="material-icons" style={{paddingRight:'0.5em'}}>shopping_cart</i>
                        </Form>
                    </Navbar>
                    <br/>
                    <Search
              className="search-box"
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              enterButton
            />
                </Container>
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

export default Tablet;
