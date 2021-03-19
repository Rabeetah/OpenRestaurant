import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, PageHeader, Typography } from 'antd';
import {
    LogoutOutlined,
    SettingOutlined,
    FormOutlined,
    TeamOutlined,
    UserOutlined,
    DatabaseOutlined,
    AppstoreOutlined,
    ProfileOutlined,
    LineChartOutlined,
    ContainerOutlined,
    AppstoreAddOutlined,
    FileAddOutlined,
    WindowsOutlined
} from '@ant-design/icons';
import { Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import additem from '../../restaurantAdmin/item/additems';
// import ViewItems from '../../restaurantAdmin/item/viewanddeleteitem';
// import adddeal from '../../restaurantAdmin/deal/adddeals';
// import viewanddeletedeal from '../../restaurantAdmin/deal/viewanddeletedeal';
// import restaurantstatistics from '../../restaurantAdmin/restaurantStatistics/restaurantstatistics';
// import adminstatistics from '../../restaurantAdmin/restaurantStatistics/adminstatistics';
// import addstaff from '../../restaurantAdmin/staff/addstaff';
// import viewanddeletestaff from '../../restaurantAdmin/staff/viewanddeletestaff';
// // import addwaiter from '../../restaurantAdmin/waiter/addwaiter';
// import Signupwaiter from './signupwaiter';
// import viewanddeletewaiter from '../../restaurantAdmin/waiter/viewanddeletewaiter';
// // import {findrestaurant} from '../../../fetch_requests/restaurant';
// import './restaurantadminlayout.css';
import WProfile from '../../waiter/wprofile';
import WSettings from '../../waiter/wsettings';
import ReadyOrders from '../../waiter/wpendingorders';
import CompleteOrders from '../../waiter/wcompleteorders';
import './waiterLayout.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from '../../userProfile/waiter/logout';
// import { Button } from 'reactstrap';
// import logo from '../assets/images/logo.png';
// import Title from 'antd/lib/skeleton/Title';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// const { Text } = Typography;

class WaiterLayout extends React.Component
{
    state = {
        collapsed: false,
        isOpen : false,
        user: this.props.user,
        rest: ''
      };

    static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
    }

    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });   
    };

    componentDidMount = async () => {
        var body = JSON.stringify({wid : this.state.user.id});
        const pointerToThis = this;
        await fetch("http://localhost:4000/waiter/restaurant/findwaiter/",  {
        method:'POST',
        body,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => pointerToThis.setState({ rest: data})); 
    }

      render() {
        return (
            <div>
                <Header> 
                <h2 style={{color: 'white'}}>Open Restaurant</h2>
                {/* <img src= { logo } height = "45" width = "45"></img> */}
                {/* <h5>{this.state.user ? `Welcome ${this.state.user.name}  ${this.state.rest.name}` : ''}</h5>    */}
                {/* <h3>{this.state.user ? `Welcome ${this.state.user.name} ${this.state.user.id}` : ''}</h3>     */}
                </Header>
                <div className="clear-div"></div>
                <Router>
                <Layout style={{ minHeight: '100vh' }} >
                    <Sider 
                      width="250" 
                      collapsible collapsed={this.state.collapsed} 
                      onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline" defaultOpenKeys={['1']}>
                  
                        <Menu.Item key="1" icon={<UserOutlined />}><Link className="link" to="/waiterprofile">
                            User Profile</Link></Menu.Item>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Order">
                            {/* <Menu.Item key="2" icon={<UserOutlined />}>Waiter</Menu.Item> */}
                           
                                <Menu.Item key="2" icon={<FileAddOutlined />}>                                
                                <Link className="link" to="/waiterreadyorders">Pending Orders</Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<ContainerOutlined />}>
                                <Link className="link" to="/waitercompleteorders">Complete Orders</Link>
                                </Menu.Item>
                                {/* <Menu.Item key="4" icon={<ContainerOutlined />}>
                                <Link className="link" to="/waiterallorders"> Order History</Link>
                                </Menu.Item> */}
                        </SubMenu>
            
                        <Menu.Item key="5" icon={<SettingOutlined />}><Link className="link" to="/waitersettings">
                            Settings</Link></Menu.Item>
                        <Menu.Item key="6" icon={<LogoutOutlined />}>Logout<Logout/></Menu.Item>
                        
                        
                        
                    </Menu>
                    </Sider>
                    <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} >

                    </Header> */}
                    <Content style={{ margin: '0px 16px'}}>
                        
                        <Switch>
                          <Route path="/waiterprofile" render={(props) => ( <WProfile {...props} user={this.state.user} />)}>
                          </Route>
                          <Route path="/waitersettings" render={(props) => ( <WSettings {...props} user={this.state.user} />)}>
                          </Route>
                          {/* <Route path="/waiterallorders" render={() => ( <Allorders />)}>
                          </Route> */}
                          <Route path="/waiterreadyorders" render={(props) => ( <ReadyOrders {...props} user={this.state.user} />)}>
                          </Route>
                          <Route path="/waitercompleteorders" render={(props) => ( <CompleteOrders {...props} user={this.state.user} />)}>
                          </Route>
                        </Switch>
                        
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©Copyrights 2020 || <b>Open Restaurant</b></Footer>
                    </Layout>
                </Layout>
                </Router>
            </div>
        );
      }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, null)(WaiterLayout);