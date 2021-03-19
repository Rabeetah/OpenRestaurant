import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import {SendOutlined as SendIcon} from "@ant-design/icons";
import List from "@material-ui/core/List";
import {message} from 'antd';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import socketIOClient from "socket.io-client";
import classnames from "classnames";
import commonUtilites from "../Utilities/common";
import Pusher from 'pusher-js';
import { pusher } from '../../pusher';

//import { sendmessage,getconversations,getmessages } from "./../Reports/pathreportapi";
Pusher.logToConsole = true;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    color:'black'
  },
  headerRow: {
    maxHeight: 60,
    zIndex: 5,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: theme.palette.primary.dark,
  },
  messageContainer: {
    height: "100%",
    display: "flex",
    alignContent: "flex-end",
  },
  messagesRow: {
    maxHeight: "calc(100vh - 184px)",
    overflowY: "auto",
  },
  newMessageRow: {
    width: "100%",
    padding: theme.spacing(0, 2, 1),
  },
  messageBubble: {
    padding: 10,
    border: "1px solid white",
    backgroundColor: "white",
    borderRadius: "0 10px 10px 10px",
    boxShadow: "-3px 4px 4px 0px rgba(0,0,0,0.08)",
    marginTop: 8,
    maxWidth: "40em",
  },
  messageBubbleRight: {
    borderRadius: "10px 0 10px 10px",
  },
  inputRow: {
    display: "flex",
    alignItems: "flex-end",
  },
  form: {
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1, 1.5),
  },
  listItem: {
    display: "flex",
    width: "100%",
  },
  listItemRight: {
    flexDirection: "row-reverse",
  },
}));

const ChatBox = (props) => {
  const [currentUserId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  let chatBottom = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    loadmessages();
    scrollToBottom();
  }, [lastMessage, props.scope, props.conversationId]);

  useEffect(() =>{
    Pusher.logToConsole = true;
    //console.log(this.props.user)
    var chan = `${props.res}`; 
    var channel = pusher.subscribe(chan);
    channel.bind('messages', function(data) {
      
        loadmessages();
      
    });
})
  const loadmessages = () => {
    
    const body1 = {
      restaurant: props.res,
      customer: props.user._id,
    }

    var body = JSON.stringify(body1);
    fetch("http://localhost:4000/customer/chat/conversation/query", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => setMessages(data));
     console.log("messages loaded")
  }
 

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  const success = (content) => {
    message.success({
      content: content,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };

  const error = (content) => {
    message.error({
      content: content,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
        restaurant: props.res,
        customer: props.user._id,
        body: newMessage,
        date: new Date(),
        sender:"restaurant"
      }
      var body = JSON.stringify(message);
    fetch("http://localhost:4000/customer/chat/sendmessage", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {response.json()
       if (response.status==200)
      {
        success('Message sent')
      } 
      else
      {
        error('Try again')
      }
    });
      //console.log(props.user)
      var m = messages
      m.push(message)
      setMessages(m)
      setNewMessage("")
      console.log(message)
    
    }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.headerRow}>
        <Paper className={classes.paper} square elevation={2}>
          <Typography color="inherit" variant="h6">
            {props.scope}
          </Typography>
        
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.messageContainer}>
          <Grid item xs={12} className={classes.messagesRow}>
            {messages && (
              <List>
                {messages.map((m) => (
                  <ListItem
                    key={m._id}
                    className={classnames(classes.listItem, {
                      [`${classes.listItemRight}`]:
                        m.sender=== "restaurant",
                    })}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar className={classes.avatar}>
                      <Avatar>
                        OR
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      classes={{
                        root: classnames(classes.messageBubble, {
                          [`${classes.messageBubbleRight}`]:
                          m.sender=== "restaurant",
                        }),
                      }}
                      primary={m.body}
                     // secondary={m.body}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <div ref={chatBottom} />
          </Grid>
          <Grid item xs={12} className={classes.inputRow}>
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid
                container
                className={classes.newMessageRow}
                alignItems="flex-end"
              >
                <Grid item xs={11}>
                  <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton type="submit">
                    <SendIcon style={{paddingTop:'0.5em'}}/>
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatBox;
