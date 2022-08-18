import React from "react";
import {Outlet} from "react-router-dom";
import Nav from "./navbar";
import Footer from "./footer";
import "./assets/style.css";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
