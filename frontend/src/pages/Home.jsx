import React from "react";
import "./Home.scss";
import Body from "../layout/Body.jsx";

const Home = (props) => {
  return (
    <Body title="Here's Some of What We Have to Offer">
      <div className="home">
        {props.images.map((i) => (
          <div className="home__item" key={i.address}>
            <img src={i?.image} alt="" />
            <span className="home__item__caption">{i.address}</span>
          </div>
        ))}
      </div>
    </Body>
  );
};

export default Home;
