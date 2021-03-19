import React from "react";

import "./desi.css";

const Desi_Options = (props) => {
   const desi_options = [
    {
      text: "Monal Downtown",
      handler: props.actionProvider.handlemonaldowntown,
      id: 1,
    }
    
  ];

  const buttonsMarkup = desi_options.map((desi_option) => (
    <button key={desi_option.id} onClick={desi_option.handler} className="option-button2">
      {desi_option.text}
    </button>
    
  )); 

  return <div className="options-container2">{buttonsMarkup}</div>;
  

};

export default Desi_Options;