import React from "react";
import "./Body.scss";

const Body = (props) => {
  return (
    <div className="body">
      <span className="body__title">{props.title}</span>
      <div className="body__content">{props.children}</div>
    </div>
  );
};

export default Body;
