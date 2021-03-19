import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {EditDeal} from './editdeal'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Spin} from 'antd';
import 'material-design-icons/iconfont/material-icons.css';
const API = 'http://localhost:4000/restaurantadmin/deal/viewdeal';
const API1 = 'http://localhost:4000/restaurantadmin/deal/removedeal/';


class ViewDeals extends React.Component
{
  state = {
        rest: this.props.rest,
        user: this.props.user,
        deals: [],
        editItemModalShow: false,
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
        console.log(this.state.rest)
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
      }
    
      componentWillUnmount() {
        clearTimeout(this.id)
      }


  deletedeal(id)
  {
    if(window.confirm('Are you sure?')){
      fetch(API1+ id, {
        method:'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then(function(response) {
        if (response.ok) {
          alert('Deal Deleted Successfully')
         
              } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
    }
  }

  render()
  {
    const { deals, deal_name, deal_total_bill, deal_description, deal_id } = this.state;
    let editDealModalClose=()=> this.setState({editDealModalShow:false});
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
          <h2 class="mb-1">DEALS MENU</h2>
          {/* <a href = "#" class="mb-1 ml-auto"><i class="material-icons">add</i></a> */}
        </div>
        <hr></hr>
        <div class="list-group">
        {this.state.rest.menu.deals.map(deal =>
              <a href="#" class="list-group-item list-group-item-action">
                <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                <img src = {`http://localhost:4000/restaurantadmin/deal/image/${deal._id}`} style={{marginRight: '40px' }} width="100" height="100" />
                <div>
                    <h5 class="mb-1" key={deal.name}>{deal.name}</h5>
                    <p class="mb-1" key={deal.total_bill}>Rs. {deal.total_bill}</p>
                    <small key={deal.description}>{deal.description}</small>
                </div>
                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                  <i class="material-icons" style={{marginRight: '30px' }} onMouseDown={()=>this.setState({editDealModalShow: true, deal_name:deal.name, deal_total_bill:deal.total_bill, deal_description:deal.description, deal_id: deal._id})}>edit</i>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="material-icons" onClick={()=>this.deletedeal(deal._id)} >delete</i>
                </div>
                
                <EditDeal
                 show={this.state.editDealModalShow}
                 onHide={editDealModalClose}
                 deal_name={ deal_name }
                 deal_total_bill = { deal_total_bill }
                 deal_description = { deal_description }
                 deal_id={deal_id}>
                </EditDeal>
                </div>
              </a>   
        )}
        </div>
      </div>
  }
  </div>
    );
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(ViewDeals);

