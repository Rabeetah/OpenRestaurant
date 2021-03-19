import { link } from "fs";

class ActionProvider {
    // The action provider receives createChatBotMessage which you can use to define the bots response, and 
    // the setState function that allows for manipulating the bots internal state.
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage
    }
  
    handleMessageParser = () => {
      const messages = this.createChatBotMessage(
       `Billing Methods: 
        Payment through card stripe,
        Cash on delivery`, {
          delay: 500,
          widget: "Stripe",
        });

      
  
      this.addMessageToBotState(messages);
    };

    handleBye =() => {
      const messages = this.createChatBotMessage("Thanks for visiting Open Restaurant");
   
       this.addMessageToBotState(messages);

    };

    handleinfo =() => {
      const messages = this.createChatBotMessage("Open restaurant has variety of restaurants.Choose your category", {
        delay: 500,
        widget: "Info_options",
      });
      this.addMessageToBotState(messages);

    };

    handleDesi=() => {
      const messages = this.createChatBotMessage("Displaying desi restaurants:", {
        delay: 500,
        widget: "Desi_options",
      });
      
      this.addMessageToBotState(messages);

    };

    
    handleChinese=() => {
      const messages = this.createChatBotMessage("Displaying chinese restaurants:", {
        delay: 500,
        widget: "Chinese_options",
      });
      
      this.addMessageToBotState(messages);

    };

    handleFastfood=() => {
      const messages = this.createChatBotMessage("Displaying restaurants:", {
        delay: 500,
        widget: "Fastfood_options",
      });
      
      this.addMessageToBotState(messages);

    };

    handleContinental=() => {
      const messages = this.createChatBotMessage("Displaying continental restaurants:", {
        delay: 500,
        widget: "Continental_options",
      });
      
      this.addMessageToBotState(messages);

    };

    handlemonaldowntown=() => {
      const messages = this.createChatBotMessage("Monal" ,{
        delay:500,
        widget: "Monal"
      });
      this.addMessageToBotState(messages);

    };

    handlekfc=() => {
      const messages = this.createChatBotMessage("Kfc" ,{
        delay:500,
        widget: "Kfc"
      });
      this.addMessageToBotState(messages);

    };
    handlelaterraza=() => {
      const messages = this.createChatBotMessage("La terraza" ,{
        delay:500,
        widget: "Laterraza"
      });
      this.addMessageToBotState(messages);

    };
    handletexaschicken=() => {
      const messages = this.createChatBotMessage("Texas chicken" ,{
        delay:500,
        widget: "Texaschicken"
      });
      this.addMessageToBotState(messages);

    };


    handleoptp=() => {
      const messages = this.createChatBotMessage("Optp" ,{
        delay:500,
        widget: "Optp"
      });
      this.addMessageToBotState(messages);

    };

    handlekimmun=() => {
      const messages = this.createChatBotMessage("Kim mun" ,{
        delay:500,
        widget: "Kimmun"
      });
      this.addMessageToBotState(messages);

    };

    handleContact= () => {
      const messages = this.createChatBotMessage(`Contact us at:` , {
        delay:500,
        widget: "Contact"
      });
      this.addMessageToBotState(messages);

    }
  
    handleDefault = () => {
      const message = this.createChatBotMessage("How can I help?",{
        delay: 500,
        widget: "options",
      });
  
      this.addMessageToBotState(message)
    };
  
    addMessageToBotState = (messages) => {
      if (Array.isArray(messages)) {
        this.setState((state) => ({
          ...state,
          messages: [...state.messages, ...messages],
        }));
      } else {
        this.setState((state) => ({
          ...state,
          messages: [...state.messages, messages],
        }));
      }
    };
  }
  
  export default ActionProvider;
  