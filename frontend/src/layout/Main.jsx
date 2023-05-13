import React from "react";
import Header from "../components/shared/Header";
import { Outlet } from "react-router-dom";

const Main = (props) => {
  return (
    <>
      <Header user={props.user} />
      <Outlet />
    </>
  );
};

export default Main;
