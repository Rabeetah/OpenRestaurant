import React from "react";

import "./chinese.css";

const Chinese_options = (props) => {
   const chinese_options = [
    {
      text: "Kim mun",
      handler: props.actionProvider.handlekimmun,
      id: 1,
    }
 
    
  ];

  const buttonsMarkup = chinese_options.map((chinese_option) => (
    <button key={chinese_option.id} onClick={chinese_option.handler} className="option-button2">
      {chinese_option.text}
    </button>
    
  )); 

  return <div className="options-container2">{buttonsMarkup}</div>;
  

};

export default Chinese_options;