import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { Redirect } from 'react-router';

const API = 'http://localhost:4000/restaurantadmin/item/additem';
const API1 = 'http://localhost:4000/restaurantadmin/item/addphoto';
const axios = require('axios');

class Additem extends React.Component {

    state = {
        subid: '',
        menu_id: '',
        rest: this.props.rest,
        user: this.props.user,
        name: '',
        price: '',
        rest_id: '',
        decription: '',
        image: null,
        counter: 0,
        fileSize: 0,
        item_id: '',
        category: '',
        subname: '',
        isOtherSelected: false,
        loading: true
    }
    static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    componentDidMount = async () => {
        this.itemData = new FormData();
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)
        this.getrest();
        // this.setState({ menu_id: this.state.rest.menu._id })
        // console.log(this.props.rest.menu.submenus[0]._id)
        console.log(this.props.rest)
       
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
            .then(data => pointerToThis.setState({ rest: data, rest_id: data._id }));
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    // refresh = () => {
    //     this.setState({ counter: this.state.counter++ });
    // };

    onChange = (e) => {
        this.itemData.set(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    };

    onCategoryChange = (e) => {
        this.setState({ subid: e.target.value });
        this.setState({ category: e.target.value });
        this.state.category === 'other' ? this.setState({ isOtherSelected: true })
            : this.setState({ isOtherSelected: false });
        console.log(this.state.subid)
    };

    uploadImage = (name) => (event) => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'image' ? event.target.files[0].size : 0;
        this.itemData.set(name, value);
        this.setState({ [name]: value, fileSize })
    };

    addSubmenu = async () => {
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

        await axios.post('http://localhost:4000/restaurantadmin/submenu/addsubmenu', data1, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            pointerToThis.setState({ subid: res.data._id });
            alert('Submenu Added Successfully')
        })
            .catch(err => console.log(err))

        const body1 = { mid: this.state.rest.menu._id, sid: this.state.subid }
        await axios
            .post('http://localhost:4000/restaurantadmin/menu/addsubmenutomenu', body1, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => {
                console.log(res);
                alert('Submenu Added To Menu Successfully')
            })
            .catch(err => console.log(err))
        console.log(this.state)
    }
    itemHandler = async (e) => {
        e.preventDefault();
        if (this.state.category === 'other') this.addSubmenu();
        var pointerToThis = this;
        let { name, price, description, rest_id, menu_id, image, subname } = this.state;
        var data = {
            name, price, description, rest_id
        }
        await axios.post(API, data, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            console.log(res);
            pointerToThis.setState({
                item_id: res.data._id
            });
            alert('Item Added Successfully')
        })
            .catch(err => console.log(err))
        var item_id = this.state.item_id
        await axios.put(API1 + `/${item_id}`, this.itemData, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            console.log(res);
            alert('Photo Added Successfully')
        })
            .catch(err => console.log(err))

        // this.refresh();

        const body2 = { cid: this.state.subid, rid: item_id }
        await axios
            .post('http://localhost:4000/restaurantadmin/submenu/additemtosubmenu', body2, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => {
                console.log(res);
                alert('Item Added to Submenu Successfully')
                document.getElementById("form").reset();
                
            })
            .catch(err => console.log(err))  
    }

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
                        <center><h2>Add New Item</h2></center>
                        <form name="addform" enctype="multipart/form-data" id="form">
                            <div class="form-group">


                                <label for="submenu">Select Category </label>&nbsp;&nbsp;
                        {/* <input list="submenus" name="subid" id="submenu" onChange={this.onCategoryChange} />  */}
                                <select name="subid" id="submenu" value={this.state.subid} onChange={this.onCategoryChange}>

                                    {this.state.rest.menu.submenus.map(submenu =>
                                        <option value={submenu._id} key={submenu._id} >{submenu.name}</option>
                                    )}
                                    <option key="subid" id="subid">other</option>
                                </select>
                                <input type="text" name="subname"
                                    placeholder="enter new category" onChange={this.onChange} />
                                {/* {this.state.category == "other" ? 
                        <input type="text" name="subid" id="submenu1" 
                        onChange={this.onCategoryChange} placeholder="enter new category"/> 
                        : ''} */}
                            </div>
                            <div class="form-group">
                                <label for="name">Item Name</label>
                                <input class="form-control" type="text" ref="name" name="name" placeholder="Enter name" onChange={this.onChange} id="name" />
                            </div>

                            <div class="form-group">
                                <label for="price">Item Price</label>
                                <input class="form-control" type="text" ref="price" name="price" placeholder="Enter price" onChange={this.onChange} id="price" />
                            </div>
                            <div class="form-group">
                                <label for="description">Item Description</label>
                                <input class="form-control" type="text" ref="description" name="description" placeholder="Enter description" onChange={this.onChange} id="description" />
                            </div>
                            <br />
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
                            <br /> <br />

                            <div class="form-group">
                                <button type="submit" class="btn btn-dark" onClick={this.itemHandler}>Submit</button>
                            </div>
                            {/* <input type="hidden" ref="hid" value={this.state.counter}></input> */}
                        </form>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Additem);