import React from "react";

import "./continental.css";

const Continental_Options = (props) => {
   const continental_options = [
    {
      text: "la terraza",
      handler: props.actionProvider.handlelaterraza,
      id: 1,
    },
    {
      text: "Texas chicken",
      handler: props.actionProvider.handletexaschicken,
      id: 1,
    }
    
  ];

  const buttonsMarkup = continental_options.map((continental_option) => (
    <button key={continental_option.id} onClick={continental_option.handler} className="option-button2">
      {continental_option.text}
    </button>
    
  )); 

  return <div className="options-container2">{buttonsMarkup}</div>;
  

};

export default Continental_Options;