import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import ChatBox from "./Chat/ChatBox";
//import { getUsersDropdowndoctors } from "./Reports/pathreportapi";
import Typography from "@material-ui/core/Typography";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import Avatar from "@material-ui/core/Avatar";
import socketIOClient from "socket.io-client";

import commonUtilites from "./Utilities/common";


class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res_id:this.props.match.params.id,
      user_id: this.props.match.params.id1,
    
    };

  }
  
  render() {
    return (
        <div style={{paddingTop: '5em'}}>
      <h4>Chat with Restaurant Customer Support Officer</h4>
      <div style={{ marginLeft:'0', paddingRight:'0', paddingLeft: '0', borderRadius: '10px'}}>
      <React.Fragment>
        <Grid container >
          <Grid item md={2}>
          </Grid>
          <Grid item md={12}>
          <Paper square elevation={5} style={{opacity:'65%'}}>
          <ChatBox res_id={this.state.res_id} user_id={this.state.user_id} />
          </Paper>
          
        </Grid>
        </Grid>
      </React.Fragment>
      </div></div>
    );
  }
};

export default Chat;
