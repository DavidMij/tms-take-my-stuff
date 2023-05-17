import React from "react";
import Header from "../components/shared/Header";
import { Outlet } from "react-router-dom";

const Main = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Header {...props} />
      <Outlet />
    </div>
  );
};

export default Main;
