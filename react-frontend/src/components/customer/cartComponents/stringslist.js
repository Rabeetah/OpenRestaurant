import React from 'react';
import "antd/dist/antd.css";
import {Card} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from "antd";
import axios from 'axios';

class OrdersStringsList extends React.Component
{

    componentDidMount=async()=>
    {
      
        this.getWords();
    }

    getWords = async () => {
        var pointerToThis = this;
        var body = JSON.stringify({ cid: '5fa7fe33910c3a1810eccbc9', orderId: '239471997' });
        await fetch(
          `http://localhost:4000/customer/order/extractstringsfromorders`,
          {
            method: "POST",
            body,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => console.log(data));
          // await this.getItems();
    }

    render()
    {
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
                <div>
                    lalala
                </div>
                }
            </div>
        )
    }
}

export default (OrdersStringsList);