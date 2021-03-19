import React from "react";

import { ReactComponent as UrlIcon } from "../../../assets/icons/link.svg";

import "./link.css";

const Link = ({ url, title }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="url-link"
    >
      <UrlIcon className="url-icon" />
      <h1 className="url-header">{title}</h1>
    </a>
  );
};

export default Link;