import React from "react";
import "./Home.scss";
import Body from "../layout/Body.jsx";
import http from "../axios/index.js";

const Home = (props) => {
    console.log(props)
    return (
        <Body title="Here's Some of What We Have to Offer">
            <div className="home">
                {props.stores.map(
                     (i) => {
                        return (
                            <div className="home__item" key={i.address}>
                                <img src={`${import.meta.env.VITE_API_URL}/v1/storeplace/${i.id}/data`} alt=""/>
                                <div>
                                    <span>Address: {i.address}</span>
                                    <span>Price: {i.price}</span>
                                    <span>from: {i.startDate}</span>
                                    <span>To: {i.endDate}</span>
                                    <span>Description: {i.description}</span>
                                    <span>Seller: {i.user.name}</span>
                                </div>
                            </div>
                        )
                    }
                )}
            </div>
        </Body>
    );
};

export default Home;
