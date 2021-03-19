class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message)
      const lowerCase = message.toLowerCase();

    if (
        lowerCase.includes("billing") ||
        lowerCase.includes("bill") ||
        lowerCase.includes("billing information") ||
        lowerCase.includes("bill info")
      ) {
        return this.actionProvider.handleMessageParser();
      }
      if (
        lowerCase.includes("thanks") ||
        lowerCase.includes("ok") 
       
      ) {
        return this.actionProvider.handleBye();
      }
    if (
      lowerCase.includes("info")
    )
    {
      return this.actionProvider.handleinfo();
    }
    if (
      lowerCase.includes("laterraza")
    )
    {
      return this.actionProvider.handlelaterraza();
    }
    if (
      lowerCase.includes("texaschicken")
    )
    {
      return this.actionProvider.handletexaschicken();
    }
    if (
      lowerCase.includes("kimmun")
    )
    {
      return this.actionProvider.handlekimmun();
    }
    if (
      lowerCase.includes("monal") ||
      lowerCase.includes("monal downtown") ||
      lowerCase.includes("downtown") 

    )
    {
      return this.actionProvider.handlemonaldowntown();
    }
    if (
      lowerCase.includes("kfc") 
  
    )
    {
      return this.actionProvider.handlekfc();
    }
    if (
      lowerCase.includes("optp") 
  
    )
    {
      return this.actionProvider.handleoptp();
    }
    if (
      lowerCase.includes("Fastfood") 
      
    ) {
      return this.actionProvider.handleFastfood();
    }
    if (
      lowerCase.includes("Continental") 
      
    ) {
      return this.actionProvider.handleContinental();
    }


  /*   if (
      lowerCase.includes("Desi") 
      
    ) {
      return this.actionProvider.handleDesi();
    }

    if (
      lowerCase.includes("Italian") 
      
    ) {
      return this.actionProvider.handleItalian();
    }
   
    if (
      lowerCase.includes("Chinese") 
      
    ) {
      return this.actionProvider.handleChinese();
    }
    */

      return this.actionProvider.handleDefault();
    };
  }
  
  export default MessageParser;
  