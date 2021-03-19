import React from "react";

import "./fastfood.css";

const Fastfood = (props) => {
   const fastfood_options = [
    {
      text: "Kfc",
      handler: props.actionProvider.handlekfc,
      id: 1,
    },
    {
         text: "OPTP", 
        handler:props.actionProvider.handleoptp, 
        id: 2 
    }
 
    
  ];

  const buttonsMarkup = fastfood_options.map((fastfood_option) => (
    <button key={fastfood_option.id} onClick={fastfood_option.handler} className="option-button2">
      {fastfood_option.text}
    </button>
    
  )); 

  return <div className="options-container2">{buttonsMarkup}</div>;
  

};

export default Fastfood;