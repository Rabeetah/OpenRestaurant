import React from "react";

import "./options.css";

const Options = (props) => {
  const options = [
    {
      text: " Billing Info",
      handler: props.actionProvider.handleMessageParser,
      id: 1,
    },
    { 
      text: "Restaurants Info",
      handler: props.actionProvider.handleinfo,
       id: 2 },
    {
       text: "Contact us",
       handler: props.actionProvider.handleContact,
        id: 3 },
    
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;