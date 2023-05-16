import React from "react";
import Header from "../components/shared/Header";
import { Outlet } from "react-router-dom";

const Main = (props) => {
  return (
    <>
      <Header setUser={props.setUser} user={props.user} />
      <Outlet />
    </>
  );
};

export default Main;
