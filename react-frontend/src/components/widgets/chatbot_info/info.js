import React from "react";

import "./info.css";

const Info_options = (props) => {
  const info_options = [
    {
      text: "Desi",
      handler: props.actionProvider.handleDesi,
      id: 1,
    },
    {
         text: "Fastfood", 
        handler:props.actionProvider.handleFastfood, 
        id: 2 
    },
    { 
        text: "Chinese", 
        handler:props.actionProvider.handleChinese, 
        id: 3 
    },
    { 
      text: "Continental", 
      handler:props.actionProvider.handleContinental, 
      id: 3 
  },
    
    
  ];

  const buttonsMarkup = info_options.map((info_option) => (
    <button key={info_option.id} onClick={info_option.handler} className="option-button1">
      {info_option.text}
    </button>
  ));

  return <div className="options-container1">{buttonsMarkup}</div>;
};

export default Info_options;