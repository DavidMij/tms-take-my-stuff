import React, { useState } from "react";
import Body from "../layout/Body.jsx";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
import http from "../axios/index.js";

const Search = (props) => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [price, setPrice] = useState("");
  const [space, setSpace] = useState("");
  const navigate = useNavigate();

  const images = [
    {
      image:
        "https://media.istockphoto.com/id/1344089225/photo/modern-warehouse-with-automated-goods-movement-system.jpg?b=1&s=170667a&w=0&k=20&c=gSNmRE4EgOUWLttyOMI3byG2fLANAiVbwtVq0chZhvQ=",
      address: "Room, 20 sqm Givataym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
    {
      image:
        "https://media.istockphoto.com/id/1405246054/photo/empty-warehouse-in-logistic-center.jpg?b=1&s=170667a&w=0&k=20&c=sNDJa2o9NLuVqkEVHFy21Xxj-BJMCLbkWcM69vAE5SQ=",
      address: "Room, 20 sqm Givataym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
    {
      image:
        "https://media.istockphoto.com/id/1299083810/photo/parcels-on-conveyor-belt-in-a-warehouse.jpg?b=1&s=170667a&w=0&k=20&c=gcKD93K_UvTRyb1zZ0OFAWOWjF9pvCpuxwjmk0k1kAQ=",
      address: "Room, 20 sqm Givataym",
      fromDate: "02-02-2000",
      toDate: "02-02-2000",
      price: "100",
      space: "adada",
    },
  ];

  return (
    <Body title="How Can we Focus Your Search?">
      <form
        className="search"
        onSubmit={async (e) => {
          e.preventDefault();
          const stores = await http.get(`/v1/storeplace`)
          props.setResult(stores.data);
          navigate("/search-result");
        }}
      >
        <div className="search__item">
          <span>By Location:</span>
          <input
            type="text"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="search__item">
          <span>By Category:</span>
          <input
            type="text"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="search__item">
          <span>From Date:</span>
          <input
            type="date"
            name="fromDate"
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="search__item">
          <span>To Date:</span>
          <input
            type="date"
            name="dateTo"
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="search__item">
          <span>By Price:</span>
          <input
            type="text"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="search__item">
          <span>By Space:</span>
          <input
            type="text"
            name="space"
            onChange={(e) => setSpace(e.target.value)}
          />
        </div>

        <button className="search__submit">Lets Go Searching!</button>
      </form>
    </Body>
  );
};

export default Search;
