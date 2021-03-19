import React from 'react';
import io from "socket.io-client";
import axios from "axios";
import URLs from "./URLs";
 
export default class Allorders extends React.Component{

    state = {
        orders: [],
      };

    componentDidMount = async () => {
        //socket.io connection
        const socket = io(`${URLs.socketURL}/socket`);
    
        socket.on("newOrder", (order) => {
          this.setState({ orders: [...this.state.orders, order] });
        });
    
        // socket.on("deletedThought", (id) => {
        //   const updatedThoughts = this.state.thoughts.filter((thought) => {
        //     return thought._id !== id;
        //   });
    
        //   this.setState({ thoughts: updatedThoughts });
        // });
    
        // socket.on("thoughtsCleared", () => {
        //   this.setState({ thoughts: [] });
        // });
    
        await this.fetchOrders();
    };

    fetchOrders = async () => {
        try {
          const response = await axios.post(`${URLs.baseURL}/customer/order/getallorders`);
          if (response.data.success) {
            console.log(response.data.message);
            this.setState({ orders: response.data.message });
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.log("Error with fetching orders: ", error);
          alert(
            "Error with fetching orders. Please check the console for more info."
          );
        }
      };

    render()
    {
        return(
            <div>
                <h4>
                    My Orders
                </h4>
            </div>
        );
    }

}