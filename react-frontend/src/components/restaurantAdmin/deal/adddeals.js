import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
const API = 'http://localhost:4000/restaurantadmin/deal/adddeal';
const API1 = 'http://localhost:4000/restaurantadmin/deal/addphoto';
const axios = require('axios');

class AddDeal extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.adddeal = this.adddeal.bind(this);
    //     this.refresh=this.refresh.bind(this);
    //     this.initialState = {
    //         name:'',
    //         total_bill:'',
    //         decription:'',
    //         image:'',
    //         counter:0
    //     }
    // }

    state = {
        // subid:this.props.rest.menu.submenus._id,
       
        rest: this.props.rest,
        user: this.props.user,
        menu_id:this.props.rest.menu._id,
        name:'',
        total_bill:'',
        decription:'',
        image: null,
        counter: 0,
        fileSize: 0,
        deal_id: '',
        loading: true,
        rest_id: '',
        // category: '',
        // subname:'',
        // isOtherSelected: false
    }

    componentDidMount = async () => {
        this.dealData = new FormData();
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)
        this.getrest();
        this.setState({ menu_id: this.state.rest.menu._id })
        
    }

    componentWillUnmount() {
        clearTimeout(this.id)
      }

    getrest = async () => {
        var body = JSON.stringify({ rid: this.state.user.id });
        const pointerToThis = this;
        await fetch("http://localhost:4000/restaurantadmin/restaurant/findrestaurant/", {
            method: 'POST',
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => pointerToThis.setState({ rest: data ,rest_id: data._id }));
    }

    onChange = (e) => {
        this.dealData.set(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };

    uploadImage = (name) => (event) => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'image' ? event.target.files[0].size : 0;
        this.dealData.set(name, value);
        this.setState({ [name]: value, fileSize })
    };

    addMenu = async () => {
        var pointerToThis = this;
        let { subname, subid } = this.state;
        var data1 = { name: subname }
        var s_id = '';
        if (this.state.rest.menu == null) {
            await axios.post('http://localhost:4000/restaurantadmin/menu/addmenu', data1, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => {
                pointerToThis.setState({ subid: res.data._id });
                alert('Submenu Added Successfully')
            })
                .catch(err => console.log(err))

        }
    }

    dealHandler = async (e) => {
        this.addMenu();
        e.preventDefault();
        var pointerToThis = this;
        let { name, total_bill, description, rest_id, menu_id, image, subname } = this.state;
        var data = {
            name, total_bill, description, rest_id
        }
        await axios.post(API, data, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            console.log(res);
            pointerToThis.setState({
                deal_id: res.data._id
            });
            alert('Deal Added Successfully')
        })
            .catch(err => console.log(err))
        var deal_id = this.state.deal_id
        await axios.put(API1 + `/${deal_id}`, this.dealData, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            console.log(res);
            alert('Photo Added Successfully')
        })
            .catch(err => console.log(err))
        
        const body2={ mid: this.state.menu_id, did: deal_id}
        await axios
          .post('http://localhost:4000/restaurantadmin/menu/adddealstomenu', body2, {
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res); 
            alert('Deal Added to Menu Successfully')
            document.getElementById("form").reset();
        }) 
        .catch(err=>console.log(err)) 
    }

    // adddeal(e) {
    //     e.preventDefault();
    
    //     let { name, total_bill, description, image } = this.state;
    
    //     let data = {
    //       name,
    //       total_bill,
    //       description,
    //       image
    //     };
    //     fetch(API, {
    //         method: "POST",
    //         body: JSON.stringify(data),
    //         headers: {
    //         "Content-Type": "application/json"
    //     }}).then(function(response) {
    //       if (response.ok) {
    //         alert('Deal Added Successfully')    
    //       } else {
    //         var error = new Error(response.statusText)
    //         error.response = response
    //         throw error
    //       }
    //     })
    //   this.refresh();
    // }

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
           

            <div class="container mt-5">
                <center><h2>Add New Deal</h2></center>
                <form name="addform" enctype="multipart/form-data" id="form">
                    <div class = "form-group">
                        <label for="name">Deal Name</label>
                        <input class="form-control" type="text" ref="name" name="name" placeholder="Enter name" onChange={this.onChange} id="name"/>
                    </div>

                    <div class = "form-group">
                        <label for="total_bill">Deal total_bill</label>
                        <input class="form-control" type="text" ref="total_bill" name="total_bill" placeholder="Enter total_bill" onChange={this.onChange} id="total_bill"/>
                    </div>
                    <div class = "form-group">
                        <label for="description">Deal Description</label>
                        <input class="form-control" type="text" ref="description" name="description" placeholder="Enter description" onChange={this.onChange} id="description"/>
                    </div>
                    <br/>
                    <div class="custom-file">
                        <input
                            onChange={this.uploadImage("image")}
                            type="file"
                            id="image"
                            accept="image/*"
                            class="form-control"
                        />
                        <label class="custom-file-label" for="image" >Choose file</label>
                    </div>
                    <br/> <br/> 
                    
                    <div class="form-group">
                        <button type="submit" class="btn btn-dark" onClick={this.dealHandler}>Submit</button>
                    </div>
                    {/* <input type="hidden" ref="hid" value={this.state.counter}></input> */}
                </form>
            </div>
            }
        </div>
        );
    }
}

export default AddDeal;