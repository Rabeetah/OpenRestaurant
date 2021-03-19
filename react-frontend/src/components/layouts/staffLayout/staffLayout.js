import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, PageHeader, Typography } from 'antd';
import {
    LogoutOutlined,
    SettingOutlined,
    FormOutlined,
    TeamOutlined,
    UserOutlined,
    WechatOutlined,
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
import SProfile from '../../staff/sprofile';
import SSettings from '../../staff/ssettings';
import Allorders from '../../staff/sallorders';
import ReadyOrders from '../../staff/sreadyorders';
import PendingOrders from '../../staff/spendingorders';
import CompleteOrders from '../../staff/scompleteorders';
import './staffLayout.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from '../../userProfile/staff/logout';
import {Spin} from 'antd';
// import { Button } from 'reactstrap';
// import logo from '../assets/images/logo.png';
// import Title from 'antd/lib/skeleton/Title';
import Chat from '../../staff/chat';
import zIndex from '@material-ui/core/styles/zIndex';
import '../../staff/sstyle.css';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// const { Text } = Typography;

class WaiterLayout extends React.Component
{
    state = {
        collapsed: false,
        isOpen : false,
        user: this.props.user,
        rest_id: '',
        rest: '',
        loading: true
      };


    static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }
    

    componentDidMount = async () => {
        var body = JSON.stringify({sid : this.props.user.id});
        const pointerToThis = this;
        await fetch("http://localhost:4000/staff/restaurant/findstaff/",  {
        method:'POST',
        body,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => pointerToThis.setState({ rest: data}));
        const { user } = this.props.auth;
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)
        console.log(this.props.user)


    //     var body1 = JSON.stringify({id : this.state.rest_id});
    //     const pointerToThis = this;
    //     await fetch("http://localhost:4000/restaurantadmin/restaurant/getrestaurant/",  {
    //     method:'POST',
    //     body1,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //     .then(response => response.json())
    //     .then(data => pointerToThis.setState({ rest: data}));
        
    }

    componentWillUnmount() {
      clearTimeout(this.id)
    }

      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });        
      };
    
      render() {
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
                ) :
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
                      onCollapse={this.onCollapse}
                      >
                    <div className="logo" />
                    <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline" defaultOpenKeys={['1']}>
                        
                        <Menu.Item key="1" icon={<UserOutlined />}><Link className="link" to="/staff/staffprofile">
                            User Profile</Link></Menu.Item>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Order">
                            {/* <Menu.Item key="2" icon={<UserOutlined />}>Waiter</Menu.Item> */}
                           
                                <Menu.Item key="2" icon={<FileAddOutlined />}>
                                <Link className="link" to="/staff/staffpendingorders">Pending Orders</Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<ContainerOutlined />}>
                                <Link className="link" to="/staff/staffreadyorders">Ready Orders</Link>
                                </Menu.Item>
                                <Menu.Item key="4" icon={<ContainerOutlined />}>
                                <Link className="link" to="/staff/staffcompleteorders">Complete Orders</Link>
                                </Menu.Item>
                                <Menu.Item key="5" icon={<ContainerOutlined />}>
                                <Link className="link" to="/staff/staffallorders">All Orders
                                </Link>
                                </Menu.Item>
                        </SubMenu>
                        {this.props.user.is_customer_support == true ? 
                        <Menu.Item key="6" icon={<WechatOutlined />}><Link className="link" to="/staff/chat">
                            Customer Support Chat</Link></Menu.Item> : ''}
                        <Menu.Item key="7" icon={<SettingOutlined />}><Link className="link" to="/staff/staffsettings">
                            Settings</Link></Menu.Item>
                        <Menu.Item key="8" icon={<LogoutOutlined />}>Logout<Logout/></Menu.Item>
                        
                        
                        
                    </Menu>
                    </Sider>
                    <Layout className="site-layout" >
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} >

                    </Header> */}
                    <Content style={{ margin: '0 16px' }} className='contentclass'>
                        
                        <Switch>
                          <Route path="/staff/staffprofile" render={(props) => ( <SProfile {...props} user={this.state.user} />)}>
                          </Route>
                          <Route path="/staff/staffsettings" render={(props) => ( <SSettings {...props} user={this.state.user} />)}>
                          </Route>
                          <Route path="/staff/staffallorders" render={(props) => ( <Allorders {...props} user={this.state.user} />)}>
                          </Route>
                          <Route path="/staff/staffreadyorders" render={(props) => ( <ReadyOrders {...props} user={this.state.user} />)}>
                          </Route>
                          <Route path="/staff/staffpendingorders" render={(props) => ( <PendingOrders {...props} user={this.state.user} />)}>
                          </Route>
                          <Route path="/staff/staffcompleteorders" render={(props) => ( <CompleteOrders {...props} user={this.state.user} />)}>
                          </Route>
                          <Route path="/staff/chat" render={(props) => ( <Chat {...props} user={this.state.user} />)}>
                          </Route>

                        </Switch>
                        
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©Copyrights 2020 || <b>Open Restaurant</b></Footer>
                    </Layout>
                </Layout>
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
  
export default connect(mapStateToProps, null)(WaiterLayout);