import React from "react";
import "./AfterSearch.scss";
import Body from "../layout/Body.jsx";

const AfterSearch = (props) => {
  return (
    <Body>
      <div className="after_search">
        {props.result.map((p) => (
          <div className="after_search__item" key={p.address}>
            <img src={p?.image} alt="" />
            <div>
              <span>Address: {p.address}</span>
              <span>From: {p.fromDate}</span>
              <span>To: {p.toDate}</span>
              <span>Price: {p.price}</span>
              <span>Space: {p.space}</span>
            </div>
          </div>
        ))}
      </div>
    </Body>
  );
};

export default AfterSearch;
