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
    TransactionOutlined,
    MoneyCollectOutlined,
    KeyOutlined,
    ContainerOutlined,
    AppstoreAddOutlined,
    FileAddOutlined,
    WindowsOutlined,
    GroupOutlined
} from '@ant-design/icons';
import { Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Additem from '../../restaurantAdmin/item/additems';
import ViewItems from '../../restaurantAdmin/item/viewanddeleteitem';
import EditItem from '../../restaurantAdmin/item/edititem';
import AddDeal from '../../restaurantAdmin/deal/adddeals';
import ViewDeals from '../../restaurantAdmin/deal/viewanddeletedeal';
// import addstaff from '../../restaurantAdmin/staff/addstaff';
import Signupstaff from './signupstaff';
import ViewStaff from '../../restaurantAdmin/staff/viewanddeletestaff';
// import addwaiter from '../../restaurantAdmin/waiter/addwaiter';
import Signupwaiter from './signupwaiter';
import ViewWaiter from '../../restaurantAdmin/waiter/viewanddeletewaiter';
// import {findrestaurant} from '../../../fetch_requests/restaurant';
import './restaurantadminlayout.css';
import RaProfile from '../../restaurantAdmin/profile/raprofile';
import RaSettings from '../../restaurantAdmin/settings/rasetting';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logout from '../../userProfile/restaurantAdmin/logout';
import SalesStats from '../../restaurantAdmin/restaurantStatistics/itemstats'
import { Button } from 'reactstrap';
import {Spin} from 'antd';
import SetTransactionKeys from '../../payment_gateways/setKeyTransaction';
import ViewTransactions from '../../payment_gateways/viewTransactions';
// import logo from '../assets/images/logo.png';
// import Title from 'antd/lib/skeleton/Title';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// const { Text } = Typography;

class RaLayout extends React.Component
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
        console.log(this.state.user)
        var body = JSON.stringify({rid : this.state.user.id});
        const pointerToThis = this;
        await fetch("http://localhost:4000/restaurantadmin/restaurant/findrestaurant/",  {
        method:'POST',
        body,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => pointerToThis.setState({ rest: data, rest_id: data._id}));
        const { user } = this.props.auth;
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)
        console.log(this.state.rest)
        console.log(this.state.user)


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
            <div style={{backgroundColor: 'white'}}>
                <Header> 
                <h2 style={{color: 'white'}}>Open Restaurant</h2>
                {/* <img src= { logo } height = "45" width = "45"></img> */}
                {/* <h5>{this.state.user ? `Welcome ${this.state.user.name}  ${this.state.rest.name}` : ''}</h5>    */}
                {/* <h3>{this.state.user ? `Welcome ${this.state.user.name} ${this.state.user.id}` : ''}</h3>     */}
                </Header>
                <div className="clear-div"></div>
                <Router>
                <Layout style={{ minHeight: '100vh', backgroundColor: 'white' }} >
                    <Sider width="250" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline" defaultOpenKeys={['1']}>
                        <Menu.Item key="1" icon={<GroupOutlined/>}><Link className="link" to="/dashboard">
                            Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}><Link className="link" to="/userprofile">
                            User Profile</Link>
                        </Menu.Item>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Restaurant Team">
                            {/* <Menu.Item key="2" icon={<UserOutlined />}>Waiter</Menu.Item> */}
                            <SubMenu key="sub3" title="Manage Waiter" icon={<UserOutlined />}>
                                <Menu.Item key="3" icon={<FileAddOutlined />}><Link className="link" to="/addwaiter">
                                Add Waiters
                                </Link>
                                </Menu.Item>
                                {/* <Menu.Item key="3" icon={<ContainerOutlined />}><Link className="link" to="">
                                Remove Waiters
                                </Link>
                                </Menu.Item> */}
                                <Menu.Item key="4" icon={<ContainerOutlined />}><Link className="link" to="/viewanddeletewaiter">
                                View Waiters
                                </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title="Manage Staff" icon={<UserOutlined />}>
                                <Menu.Item key="5" icon={<FileAddOutlined />}><Link className="link" to="/addstaff">
                                Add Staff
                                </Link>
                                </Menu.Item>
                                {/* <Menu.Item key="6" icon={<ContainerOutlined />}><Link className="link" to="">
                                Remove Staff
                                </Link>
                                </Menu.Item> */}
                                <Menu.Item key="7" icon={<ContainerOutlined />}><Link className="link" to="/viewanddeletestaff">
                                View Staff
                                </Link>
                                </Menu.Item>
                            </SubMenu>
                            {/* <Menu.Item key="3" icon={<UserOutlined />}>Staff</Menu.Item> */}
                        </SubMenu>
                        <SubMenu key="sub5" icon={<FormOutlined />} title="Restaurant Work">
                            <SubMenu key="sub6" title="Manage Items" icon={<DatabaseOutlined />}>
                                <Menu.Item key="8" icon={<FileAddOutlined />}><Link className="link" to="/additem">
                                Add Items
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="9" icon={<ContainerOutlined />}><Link className="link" to="/viewanddeleteitem">
                                View Items
                                </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub7" title="Manage Deals"  icon={<AppstoreOutlined />}>
                                <Menu.Item key="10" icon={<AppstoreAddOutlined />}>
                                <Link className="link" to="/adddeal">
                                Add Deals
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="11" icon={<WindowsOutlined />}>
                                <Link className="link" to="/viewanddeletedeal">
                                View Deals
                                </Link>
                                </Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub8" icon={<TransactionOutlined />} title="Transactions">
                            <Menu.Item key="12" title="View Transactions" icon={<MoneyCollectOutlined />}>
                                <Link className="link" to="/viewtransactions">View Transactions
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="13" title="Transaction Keys Setting"  icon={<KeyOutlined />}>
                                <Link className="link" to="/keysettings">Transaction Keys Setting</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="14" icon={<SettingOutlined />}><Link className="link" to="/usersettings" >Settings</Link></Menu.Item>
                        {/* <Menu.Item key="13" icon={<LineChartOutlined />}>
                            <Link className="link" to="/adminstatistics" >Statistics</Link>
                            </Menu.Item> */}
                        <Menu.Item key="15" icon={<LogoutOutlined />}>Logout<Logout/></Menu.Item>
                        
                        
                        
                    </Menu>
                    </Sider>
                    <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} >

                    </Header> */}
                    <Content style={{ margin: '0 16px' }}>
                        
                        <Switch>
                            <Route path="/additem" render={(props) => ( <Additem {...props} rest={this.state.rest} user={this.state.user}/>)}>
                            </Route>
                            <Route path="/viewanddeleteitem" render={(props) => ( <ViewItems {...props} rest={this.state.rest} user={this.state.user} />)}>
                            </Route>
                            <Route path="/adddeal" render={(props) => ( <AddDeal {...props} rest={this.state.rest} user={this.state.user}/>)}>
                            </Route>
                            <Route path="/viewanddeletedeal" render={(props) => ( <ViewDeals {...props} rest={this.state.rest} user={this.state.user} />)}>
                            </Route>
                            <Route path="/addstaff" render={(props) => ( <Signupstaff {...props} restid={this.state.rest_id} />)}>
                            </Route>
                            <Route path="/viewanddeletestaff" render={(props) => ( <ViewStaff {...props} rest={this.state.rest} />)}>
                            </Route>
                            <Route path="/addwaiter" render={(props) => ( <Signupwaiter {...props} restid={this.state.rest_id} />)}>
                            </Route>
                            <Route path="/viewanddeletewaiter" render={(props) => ( <ViewWaiter {...props} rest={this.state.rest} />)}>
                            </Route>
                            <Route path="/userprofile" render={(props) => ( <RaProfile {...props} user={this.state.user} />)}>
                            </Route>
                            <Route path="/usersettings" render={(props) => ( <RaSettings {...props} user={this.state.user} />)}>
                            </Route>
                            <Route path="/dashboard" render={(props) => ( <SalesStats {...props} user={this.state.user} restid={this.state.rest_id} />)}>
                            </Route>
                            <Route path="/viewtransactions" render={(props) => ( <ViewTransactions {...props} restid={this.state.rest_id} />)}>
                            </Route>
                            <Route path="/keysettings" render={(props) => ( <SetTransactionKeys {...props} user={this.state.user.id} />)}>
                            </Route>
                        </Switch>
                        
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                        </div> */}
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
  
  export default connect(mapStateToProps, null)(RaLayout);