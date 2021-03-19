import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Navbar, Nav, Form, NavDropdown, Container } from "react-bootstrap";
import "antd/dist/antd.css";
// import RateComponent from "../../customer/reviewRatingComponents/addRatings";
// import RestaurantCard from "../../customer/viewComponent/restaurantCard";
// import ItemCard from "../../customer/viewComponent/itemCard";
import AllItemsCard from "../../customer/viewComponent/allItemsCard";
import AllDealsCard from "../../customer/viewComponent/allDealsCard";
// import DealCard from "../../customer/viewComponent/dealCard";
import AllRestaurantsCard from "../../customer/viewComponent/allRestaurantsCard";
import Checkout from "../../customer/cartComponents/proceedtocheckout";
import CallViewOrder from "../../customer/cartComponents/callViewOrder";
import Successmsg from "../../customer/cartComponents/successmsg";
// import OrderHistory from "../../customer/cartComponents/vieworder";
import "../../customer/customer.css";
import { Avatar, message, Card, Col, Row, Divider, Input, Badge, Button } from "antd";
import { ShoppingCartOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
// import Slider from "react-slick";
import { Spin } from "antd";
import Home from "./home";
// import ViewItem from "../../customer/viewComponent/viewItem";
// import P2Layout from "../../customer/viewComponent/viewRestaurant";
import Cart from "../../customer/cartComponents/cartCard";
import ViewRest from "../../customer/viewComponent/callViewRest";
import CallViewItem from "../../customer/viewComponent/callViewItem";
import CallViewDeals from "../../customer/viewComponent/callViewDeals";
import EmptyCart from '../../customer/cartComponents/emptycart';
import NotFound from '../../customer/viewComponent/notfound';
import CurrentOrders from '../../customer/cartComponents/currentorders';
import OrdersHistory from '../../customer/cartComponents/ordershistory';
import PaymentGateway from "../../payment_gateways/call_payment_methods";
import ViewPreviousOrder from '../../customer/cartComponents/callViewPreviousOrder';
import ViewCurrentOrder from '../../customer/cartComponents/callViewCurrentOrder';
import Profile from '../../customer/profile/customerprofile';
import LoginForm from '../../userProfile/customer/loginform'
import SignupForm from '../../userProfile/customer/signupform';
import Logout from '../../userProfile/customer/logout';
import Mobile from "./mobileNav";
import Tablet from "./tabletNav";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Faq from '../../customer/complainComponents/faq';
import Contactus from '../../customer/complainComponents/complaintform';
import Aboutus from '../../customer/complainComponents/aboutus';
import ChatBox from '../../customer/viewComponent/chat';
import Activate from '../../userProfile/customer/Activate';
import {
  Link,
  // Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Chatbot from '../../mychatbot/chatbot';
import OrdersStringsList from "../../customer/cartComponents/funfacts";
const { Meta } = Card;
const { Search } = Input;

class CLayout extends React.Component {
  state = {
    screenWidth: null,
    // customerId: "5fa7fe33910c3a1810eccbc9",
    user: '',
    cart_length: 0,
    loading: true
  };


  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    // error : PropTypes.object.isRequired
  }


  async componentDidMount() {
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    window.addEventListener("resize", this.updateWindowDimensions());
    // console.log(this.state.user)
    this.id = setTimeout(() => {
      if (!this.props.auth.isLoading) {
        this.setState({ loading: false })
        this.setCartLength();
      }
    }, 3000)
    if (!this.state.loading) await this.setCartLength();
  }

  componentDidUpdate(prevProps) {
    if (this.props.yourUpdatedReducer !== prevProps.yourUpdatedReducer) {
      this.setState({
        loading: false
      })
      if (!this.props.auth.isLoading && this.props.auth.user) this.setCartLength()
    }
  }



  // async isLoading(){
  //   while(this.props.auth.isLoading){}
  // }

  // componentDidUpdate(){
  //   if(this.props.auth.user){
  //     this.setCartLength();
  //   }
  // }

  componentWillUnmount() {
    clearTimeout(this.id)
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ screenWidth: window.innerWidth });
  }

  setCartLength = () => {
    var count = 0;
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.cart.length > 0) {
        this.props.auth.user.cart.forEach((rest) => {
          count = count + rest.rest.length;
        });
        this.setState({ cart_length: count })
        return count;
      }
      console.log(count)
      return 0;
    }
    return 0;
  };

  render() {
    const { isAuthenticated, user } = this.props;
    const enterButton = (
      <Button
        style={{ backgroundColor: '#bb8c63', border: '1px solid #bb8c63', borderRadius: '1pxm', margin: '0' }}
        icon={<SearchOutlined
          style={{
            color: '#fff',
            paddingTop: '0em',
            paddingBottom: '0.3em'
          }} />}></Button>
    );
    if (this.state.screenWidth <= 652)
      return (
        <div>
          <Mobile />
        </div>
      );
    if (this.state.screenWidth <= 1024)
      return (
        <div>
          <Tablet />
        </div>
      );
    return (
      <div>
        {this.state.loading || this.props.auth.isLoading ? (
          <center>
            <Spin
              className="spinner"
              tip="Loading...Please Wait"
              size="large"
            />
          </center>
        ) :
        <div>
          <Router>
          <div className="app-container" style={{ height: "max-content" }}>
            
              <Container
                style={{
                  marginRight: "0em",
                  marginLeft: "0em",
                  textAlign: "center",
                }}
              >
                <br />
                <Navbar
                  bg="light"
                  variant="light"
                  sticky="top"
                  style={{
                    width: "100%",
                    margin: 0,
                    left: "-1",
                    right: "0",
                    sticky: "-1",
                    position: "fixed",
                    top: "-1",
                    borderBottom: "4px solid #bb8c63"
                  }}
                >
                  <Navbar.Brand href="" style={{ fontFamily: 'serif', color: '#bb8c63', fontSize: 26 }}>Open Restaurant</Navbar.Brand>
                  <br />

                  <Nav className="ml-auto">
                    <Nav.Link href="" style={{ paddingRight: "3em" }}>
                      <Link className="link" to="/home">
                        Home
                  </Link>
                    </Nav.Link>
                    <Nav.Link href="" style={{ paddingRight: "3em" }}>
                      <Link className="link" to="/allrestaurants">
                        Restaurant
                  </Link>

                    </Nav.Link>
                    {/* <Nav.Link href="" style={{paddingRight:'5em'}}>Menu</Nav.Link> */}
                    <NavDropdown
                      title="Menu" color='#bb8c63'
                      id="collasible-nav-dropdown"
                      style={{ paddingRight: "2em", color: '#bb8c63' }}
                    >
                      <NavDropdown.Item href="">
                        <Link className="link" to="/allfoods">
                          Items
                    </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="">
                        <Link className="link" to="/alldeals">
                          Deals
                    </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="Orders"
                      id={this.props.auth.isAuthenticated ? "collasible-nav-dropdown" : "collasible-nav-dropdown disabled"}
                      style={{ paddingRight: "2em" }}
                      disabled={this.props.auth.isAuthenticated ? false : true}
                    >
                      <NavDropdown.Item href="">
                        <Link className="link" to="/currentorders">
                          Current Orders
                    </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="">
                        <Link className="link" to="/ordershistory">
                          History
                    </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  {/* <Form inline>
                            <i class="material-icons" style={{paddingRight:'2.5em'}}> <Link className="link" to="/cart" >shopping_cart</Link></i>
                        </Form> */}
                  {/* <Search style={{ width: '30%', border: '0.5px solid #bb8c63', borderRight: '0px', borderRadius: '2px', padding: '0', marginRight: "2em" }}
                    className="search-box"
                    size='medium'
                    placeholder="Search here"
                    enterButton={enterButton}
                    onSearch={(value) => console.log(value)}

                  /> */}
                  <Nav key="user" style={{ padding: 0, margin: 0, paddingRight: "0.5em" }}>
                    {this.props.auth.isAuthenticated ?
                      <NavDropdown
                        title={<Avatar
                          style={{
                            backgroundColor: '#bb8c63',
                            verticalAlign: 'middle',
                          }}
                          size={30}
                          gap={4}
                        >
                          {this.props.auth.user.name.split(" ").map((n, i, a) => i === 0 || i + 1 === a.length ? n[0] : null).join("").toUpperCase()}
                        </Avatar>}
                        drop='left' color='#bb8c63'
                        id="collasible-nav-dropleft"
                        style={{ padding: 0, paddingRight: "0.5em", margin: 0, left: '-1' }}
                      >
                        <NavDropdown.Item>
                          Logged In as <br />
                          <NavDropdown.Divider />
                          <strong>{this.props.auth.user.name}</strong>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link className="link" to="/profile">
                            Profile
                    </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <Link className="link" to="/logout">
                            <Logout />
                          </Link>
                        </NavDropdown.Item>
                      </NavDropdown>
                      :
                      <Link className="link"
                        to='/login'
                        style={{ color: "#bb8c63" }}
                      >
                        <UserOutlined
                          type="customer"
                          style={{ fontSize: 25, marginTop: 3, paddingRight: "0.8em" }}
                        ></UserOutlined>
                      </Link>
                    }
                  </Nav>
                  <Nav key="cart" style={{ paddingBottom: 0, paddingRight: "1.5em" }}>
                    <Badge count={this.state.cart_length}>
                      <Link className="link"
                        to="/cart"
                        style={{ marginRight: -22, color: "#bb8c63" }}
                      >
                        <ShoppingCartOutlined
                          type="shopping-cart" color='#bb8c63'
                          style={{ fontSize: 28, fontWeight: 500, marginTop: 3 }}
                        />
                      </Link>
                    </Badge>
                  </Nav>
                  <br />
                </Navbar>

              </Container>

              <Container
                className="App-intro"
                style={{ marginRight: "1em", marginLeft: "1em" , paddingBottom: '4em'}}
              >
                {/* <Redirect push to='/'/> */}
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path={`/user/customer/activate-account/:token`} component={Activate}/>
                  <Route exact path="/restaurantview/:id" component={ViewRest} />
                  <Route exact path="/view/:id" component={CallViewItem} />
                  <Route exact path="/viewdeal/:id" component={CallViewDeals} />
                  <Route exact path="/ordershistory/order/:id" component={ViewPreviousOrder} />
                  <Route exact path="/myorders/order/:id" component={ViewCurrentOrder} />
                  <Route exact path="/pending/order/:orderId" component={CallViewOrder} />
                  <Route exact path="/home" component={Home} />
                  <Route exact path="/allrestaurants" component={AllRestaurantsCard} />
                  <Route exact path="/allfoods" component={AllItemsCard} />
                  <Route exact path="/allfoods" component={AllItemsCard} />
                  <Route exact path="/alldeals" component={AllDealsCard} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/order/checkout" component={Checkout} />
                  <Route exact path="/currentorders" component={CurrentOrders} />
                  <Route exact path="/ordershistory" component={OrdersHistory} />
                  {/* <Route path="/place/order/:orderId" component={Successmsg} /> */}
                  {/* <Route path='/emptycart' component={EmptyCart} /> */}
                  <Route exact path='/login' component={LoginForm} />
                  <Route exact path='/signup' component={SignupForm} />
                  <Route exact path='/profile' component={Profile} />
                  <Route exact path='/logout' component={Logout} />
                  <Route exact path='/faq' component={ Faq }/>
                  <Route exact path='/contactus' component={Contactus}/>
                  <Route exact path='/aboutus' component={Aboutus}/>
                  {/* <Route exact path="/funfacts" component={OrdersStringsList} /> */}
                  <Route exact path='/chat/:id/:id1' component={ChatBox}/>
                  <Route path='*' exact={true} component={NotFound} />
                  {/* <Route
                    path="/order/payment/:orderId"
                    component={PaymentGateway}
                  /> */}
                </Switch>
              </Container>
            
            
          </div>
        <Chatbot />
        <div style={{ paddingLeft: '2em', paddingRight: '2em', borderTop: '4px solid #bb8c63' }}>
          <Navbar
            sticky="bottom"
            style={{
              display: 'flex',
            }} >

            <Nav style={{ flex: '50%', padding: '2em', display: 'block', fontSize: '0.8em', color: 'var(--color3)', fontWeight: '600' }}>
              <span style={{ fontSize: '1.4em' }}>About Us</span><br />
            <Link className="link" to="/aboutus">Our Story</Link><br/>
            <Link className="link" to="/faq">FAQs</Link><br/>
            <Link className="link" to="/contactus">Contact Us</Link><br/>
            </Nav>

            <Nav style={{ flex: '50%', padding: '2em', display: 'block', fontSize: '0.8em', color: 'var(--color3)', fontWeight: '600' }}>
              <span style={{ fontSize: '1.4em' }}>Explore Food World</span><br />
            <Link className="link" to="/allrestaurants">Visit Restaurants</Link><br/>
            <Link className="link" to="/allfoods">Visit Food Menu</Link><br/>
            <Link className="link" to="/alldeals">Visit Deals</Link><br/>
            </Nav>

          </Navbar>
          <div style={{ flex: '100%' }}>
            <p
              style={{
                padding: '3em',
                paddingTop: '0',
                paddingBottom: '1em',
                fontSize: '0.8em',
                color: 'var(--color3)'
              }}
            >
              <center>&copy; Copyrights 2020 || <b>Open Restaurant</b></center></p>
          </div>
        </div>
        </Router>
        </div>
        }


      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(CLayout);
