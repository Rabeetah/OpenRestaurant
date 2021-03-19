import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {EditItem} from './edititem'; 
import {EditSubmenu} from './editsubmenu';
import 'material-design-icons/iconfont/material-icons.css';
import { ResponsiveEmbed } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Spin} from 'antd';
const API = 'http://localhost:4000/restaurantadmin/menu/viewmenu';
const API1 = 'http://localhost:4000/restaurantadmin/item/removeitem/';
const API2 = 'http://localhost:4000/restaurantadmin/submenu/removesubmenu/';

class ViewItems extends React.Component
{
  
    state = {
        rest: this.props.rest,
        user: this.props.user,
        submenu: [],
        items: [],
        editItemModalShow: false,
        editSubmenuModalShow: false,
        loading: true
      };
      static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }


      componentDidMount =async()=> {
        console.log(this.state.user)
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)
        this.getrest();
        
      }

      getrest = async() =>
      {
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
        .then(data => pointerToThis.setState({ rest: data}));
        console.log('rest'+this.state.rest)
      }
    
      componentWillUnmount() {
        clearTimeout(this.id)
      }

  
  deleteitem = async(id) =>
  {
    if(window.confirm('are you sure?')){
      fetch(API1+ id, {
        method:'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then(function(response) {
        if (response.ok) {
          alert('Record Deleted Successfully')
          
              } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
    }
    this.getrest();
  }

  deletesubmenu = async(id) =>
  {
    if(window.confirm('are you sure?')){
      fetch(API2+ id, {
        method:'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then(function(response) {
        if (response.ok) {
          alert('Record Deleted Successfully')
          
          
              } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })

    }
    this.getrest();
  }

  render()
  {
    
    const {  item_name, item_price, item_description, item_id, submenu_name, submenu_id } = this.state;
    let editItemModalClose=()=> this.setState({editItemModalShow:false});
    let editSubmenuModalClose=()=> this.setState({editSubmenuModalShow:false});
    return(
      
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
      <div class="container mt-3">
        <div class = "d-flex w-50">
          <h2 class="mb-1">ITEMS MENU</h2>
          {/* <a href = "#" class="mb-1 ml-auto"><i class="material-icons">add</i></a> */}
        </div>
        <hr></hr>
        <div class="list-group">
        {this.props.rest.menu.submenus.map(submenu =>
        
              <a href="#" class="list-group-item list-group-item-action">
                
                <div style={{alignContent: 'space-between' }} class="d-flex w-55 ">
                  <h4 key={submenu.name}>{submenu.name}</h4>
                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                    <i class="material-icons" style={{marginRight: '40px' }} onMouseDown={()=>this.setState({editSubmenuModalShow: true, submenu_name:submenu.name, submenu_id:submenu._id })}>edit</i>
                    <i class="material-icons" onClick={()=>this.deletesubmenu(submenu._id)}>delete</i>
                  </div>
                </div>
                <hr/>
                
                {submenu.items.map(item =>
                <div>
                <div style={{alignContent: 'space-between' }} class="d-flex w-55 ">
                  <img src = {`http://localhost:4000/restaurantadmin/item/image/${item._id}`} style={{marginRight: '40px' }} width="100" height="100" />
                  <div>
                      <h5 class="mb-1" key={item.name}>{item.name}</h5>
                      <p class="mb-1" key={item.price}>Rs. {item.price}</p>
                      <small key={item.description}>{item.description}</small>
                  </div>
                  <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                    <i class="material-icons" style={{marginRight: '40px' }} onMouseDown={()=>this.setState({editItemModalShow: true, item_name:item.name, item_price:item.price, item_description:item.description, item_id: item._id})}>edit</i>
                    <i class="material-icons" onClick={()=>this.deleteitem(item._id)} >delete</i>
                  </div>
                  <EditItem
                    show={this.state.editItemModalShow}
                    onHide={editItemModalClose}
                    item_name={ item_name }
                    item_price = { item_price }
                    item_description = { item_description }
                    item_id={item_id}>
                  </EditItem>
                  <EditSubmenu
                    show={this.state.editSubmenuModalShow}
                    onHide={editSubmenuModalClose}
                    submenu_name={ submenu_name }
                    submenu_id={ submenu_id }>
                  </EditSubmenu>
                </div>
                <hr/>
                </div>
                )}
                
                
              </a>
                 
        )}

        
        </div>
      </div>}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(ViewItems);



