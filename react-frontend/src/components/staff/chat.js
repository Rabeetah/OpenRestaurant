// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import List from "@material-ui/core/List";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

// import ChatBox from "./Chat/ChatBox";
// //import { getUsersDropdowndoctors } from "./Reports/pathreportapi";
// import Typography from "@material-ui/core/Typography";

// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";

// import Avatar from "@material-ui/core/Avatar";
// import socketIOClient from "socket.io-client";

// import commonUtilites from "./Utilities/common";


// class Chat extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log(this.props.user)
//     this.state = {

//       res_id:this.props.user.rest_id,
//       user_id: this.props.user._id,
    
//     };

//   }
  
//   render() {
//     return (
//       <React.Fragment>
//         <Grid container>
//           <Grid item md={2}>
//           </Grid>
//           <Grid item md={8}>
//           <Paper square elevation={5}>
//           <ChatBox res_id={this.state.res_id} user_id={this.state.user_id} />
//           </Paper>
          
//         </Grid>
//         </Grid>
//       </React.Fragment>
//     );
//   }
// };

// export default Chat;


import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ChatBox from "./Chat/ChatBox";
//import Conversations from "./Chat/Conversations";
//import Users from "./Chat/Users";
//import { getUsersDropdowndoctors } from "./Reports/pathreportapi";
import Typography from "@material-ui/core/Typography";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Avatar from "@material-ui/core/Avatar";
import socketIOClient from "socket.io-client";
import './sstyle.css';
import commonUtilites from "./Utilities/common";


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.user)
    this.state = {
      allCustomers: [],
      scope: "Global Chat",
      user: null,
      res_id:this.props.user.rest_id,
      user_id: this.props.user._id,
      
    };
  }
  componentDidMount() {
    var body = JSON.stringify({id: this.state.res_id});
      fetch(
      `http://localhost:4000/customer/chat/getcustomers`,
      {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => this.setState({ allCustomers:data }));
  }
  handleChange = (e, newVal) => {
    this.setState({ tab: newVal });
  };

  render() {
    return (
      <React.Fragment>
        <div className='staffchat'>
        <Grid container style={{paddingTop:'2em'}} >
          <Grid item md={4}>
            <Paper square elevation={5}>
              <Paper square>
                <Tabs
                  onChange={this.handleChange}
                  variant="fullWidth"
                  value={this.state.tab}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Users" />
                </Tabs>
              </Paper>
              {/* {this.state.tab === 0 && (
              <Conversations setUser={this.state.user} setScope={this.state.scope} />
            )} */}
              <List
                  style={{
                    maxHeight: "calc(100vh - 112px)",
                    overflowY: "auto",
                  }}
                >
                  {this.state.allCustomers.map((u) => (
                    <ListItem
                      key={u._id}
                      onClick={() => {
                        this.setState({ user: u });
                        this.setState({ scope: u.email });
                      }}
                      style={{
                        color: "black",
                      }}
                      button
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {commonUtilites.getInitialsFromName(u.firstname)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography type="body2" style={{ color: "black" }}>
                            {u.email}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

            </Paper>
          </Grid>
          <Grid item md={8} style={{paddingTop:'2em'}}>
            {this.state.scope!=="Global Chat" &&
            <ChatBox scope={this.state.scope} user={this.state.user} res={this.state.res_id}/>
            }
          
        </Grid>
        </Grid>
        </div>
      </React.Fragment>
    );
  }
};