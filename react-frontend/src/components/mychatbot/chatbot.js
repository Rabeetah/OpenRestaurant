import { render } from 'jade';
import React,   { useState }from 'react';
import Chatbot from 'react-chatbot-kit';
import  './chatbot.css';
import config from "./config";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import { ConditionallyRender } from "react-util-kit";
import { ReactComponent as ButtonIcon } from "../../assets/icons/robot.svg";


function Testing() {
   const [showChatbot, toggleChatbot] = useState(false); 


    return (
        <div className="App1">
          <center>
   
         <div className="app-chatbot-container">
     
              <ConditionallyRender
            ifTrue={showChatbot}
            show={ 
             <Chatbot  config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}/>
            }
        /> 
  
         </div>
          <button
          className="app-chatbot-button"
          onClick={() => toggleChatbot((prev) => !prev)}
        >
          <ButtonIcon className="app-chatbot-button-icon" />
        </button> 

         </center>
        </div>
        
      );
  }

  
 
   
   
   
   
   export default Testing;
   