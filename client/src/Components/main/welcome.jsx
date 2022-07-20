import React from 'react'
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NeedToLogin } from "../login_reg/needtologin";

const charlotte = require("./assets/charlotte.JPG")
const gotg = require("./assets/gotg.jpg")
const beach = require("./assets/beach3.jpg")
const toronto = require("./assets/toronto.jpg")

export const Welcome = () => {
  const { isAuthenticated } = useAuth0();
  
  return (
    (isAuthenticated && (<div className="welcome">
      <div className="welcome-photos">
        <img id="charlotte" src={charlotte} alt="charlotte"/>
        <img id="gotg" src={gotg} alt="garden of the gods"/>
        <img id="beach" src={beach} alt="beach"/>
        <img id="toronto" src={toronto} alt="toronto"/>
      </div>
      <div className="welcome-options">
        <h1>Choices</h1>
        <button className="btn btn-info choices">
          <Link to={"/create"}>    
            Create a Post
          </Link> 
        </button>
        <button className="btn btn-info choices">
          <Link to={"/posts"}>    
            View Posts
          </Link> 
        </button>
        <button className="btn btn-info choices">
          <Link to={"/gallery"}>    
            Gallery
          </Link> 
        </button>
      </div>
    </div>)) ||
    (!isAuthenticated && (
      <NeedToLogin />
    ))
  );
};
