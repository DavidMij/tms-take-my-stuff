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
              console.log(p)
            <div>
              <span>Address: {p.address}</span>
              <span>From: {p.startDate}</span>
              <span>To: {p.endDate}</span>
              <span>Price: {p.price}</span>
              <span>Space: {p.availableSpace}</span>
            </div>
          </div>
        ))}
      </div>
    </Body>
  );
};

export default AfterSearch;
