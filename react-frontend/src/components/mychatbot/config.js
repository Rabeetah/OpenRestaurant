import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "../widgets/chatbot_options/options";
import Info from "../widgets/chatbot_info/info";
import Desi from '../widgets/chatbot_desi/desi'
import Stripe from '../widgets/chatbot_link/Stripe';
import ActionProviderDocs from "./ActionProvider";
import BotAvatar from '../BotAvatar/BotAvatar';
import Chinese from "../widgets/chatbot_chinese/chinese";
import Contact from '../widgets/chatbot_contactus/contactus';
import Fastfood from '../widgets/chatbot_fastfood/fastfood';
import Monal from '../widgets/chatbot_menu/monal';
import Kfc from '../widgets/chatbot_menu/kfc';
import Optp from '../widgets/chatbot_menu/optp';
import Continental from '../widgets/chatbot_continental/continental';
import Kimmun from '../widgets/chatbot_menu/kimmun';
import Laterraza from '../widgets/chatbot_menu/laterraza';
import Texaschicken from '../widgets/chatbot_menu/texaschicken';

const botName = "OpenRestaurant";

const config = {
  botName: botName,
  
  customStyles: {
    botMessageBox: {
      backgroundColor: "#F99245",
    
    
    
    },
    chatButton: {
      backgroundColor: "#F99245",
    },
  },
  customComponents:{
  
      botAvatar: (props) => <BotAvatar {...props}/>,
  },
  initialMessages: [

    
    createChatBotMessage(
      "Welcome to open restaurant! How can i help you?",
      {
        
        delay: 500,
        widget: "options",
      }
    ),
  ],
  
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    
    },

    {
      widgetName: "Contact",
      widgetFunc: (props) => <Contact {...props} />,
    
    },
    
    
      {
        widgetName: "Info_options",
        widgetFunc: (props) => <Info {...props} />,
        
      },

      {
        widgetName: "Desi_options",
        widgetFunc: (props) => <Desi {...props} />,
      
      },
      {
        widgetName: "Continental_options",
        widgetFunc: (props) => <Continental {...props} />,
      
      },

      {
        widgetName: "Chinese_options",
        widgetFunc: (props) => <Chinese {...props} />,
        
      },
      {
        widgetName: "Fastfood_options",
        widgetFunc: (props) => <Fastfood {...props} />,
        
      },
    {
      widgetName: "Stripe",
      widgetFunc: (props) => <Stripe {...props} />,
    
    },

    {
      widgetName: "Monal",
      widgetFunc: (props) => <Monal {...props} />,
    
    },
    {
      widgetName: "Kfc",
      widgetFunc: (props) => <Kfc {...props} />,
    
    },
    {
      widgetName: "Optp",
      widgetFunc: (props) => <Optp {...props} />,
    
    },
    {
      widgetName: "Kimmun",
      widgetFunc: (props) => <Kimmun {...props} />,
    
    },
    {
      widgetName: "Laterraza",
      widgetFunc: (props) => <Laterraza {...props} />,
    
    },
    {
      widgetName: "Texaschicken",
      widgetFunc: (props) => <Texaschicken {...props} />,
    
    },
  ],
};

export default config;