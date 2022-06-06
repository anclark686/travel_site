import React from "react";
import {Outlet} from "react-router-dom";
import Nav from "./navbar";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Layout;
