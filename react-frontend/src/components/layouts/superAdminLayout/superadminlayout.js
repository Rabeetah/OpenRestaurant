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
import Signupra from './restaurantadmin';
import viewanddeleterestaurant from '../../superAdmin/restaurant/viewanddeleterestaurant';
import RegisterModal from '../../userProfile/restaurantAdmin/signup';
import Complains from '../../customer/complainComponents/viewcomplains';
import Logout from '../../userProfile/superAdmin/logout';
import './superadminlayout.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Button } from 'reactstrap';
// import logo from '../assets/images/logo.png';
// import Title from 'antd/lib/skeleton/Title';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// const { Text } = Typography;

class SaLayout extends React.Component
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

    // componentDidMount = async () => {
    //     var body = JSON.stringify({wid : this.state.user.id});
    //     const pointerToThis = this;
    //     await fetch("http://localhost:4000/waiter/restaurant/findwaiter/",  {
    //     method:'POST',
    //     body,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //     .then(response => response.json())
    //     .then(data => pointerToThis.setState({ rest: data})); 
    // }

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
                    <Sider width="250" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline" defaultOpenKeys={['1']}>
                        
                        {/* <Menu.Item key="1" icon={<UserOutlined />}>User Profile</Menu.Item> */}
                        
                        <Menu.Item key="2" icon={<FileAddOutlined />}><Link className="link" to="/signup" >Add Restaurant</Link></Menu.Item>
                        <Menu.Item key="3"icon={<ContainerOutlined />}><Link className="link" to="/viewanddeleterestaurant" >View Restaurants</Link></Menu.Item>
                        <Menu.Item key="4" icon={<FormOutlined />}>
                            <Link className="link" to="/customercomplain" >Customer Complaints</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<LogoutOutlined />}>Logout<Logout/></Menu.Item>
                        
                        
                        
                    </Menu>
                    </Sider>
                    <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} >

                    </Header> */}
                    <Content style={{ margin: '0 16px' }}>
                        
                        <Switch>
                            <Route path="/viewanddeleterestaurant" component={viewanddeleterestaurant}/>
                            <Route exact path="/signup" component={Signupra}/>
                            <Route exact path="/customercomplain" component={Complains}/>
                        </Switch>
                        
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
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
  
  export default connect(mapStateToProps, null)(SaLayout);