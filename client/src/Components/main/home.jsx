import React from "react";
import { Link } from "react-router-dom";

const chicago = require("./assets/chicago.jpg")
const atlanta = require("./assets/Atlanta.jpg")
const beach = require("./assets/beach1.jpg")
const waterfall = require("./assets/waterfall1.jpg")
  
export const Home = () => {
  return (
    <div className="home">
      <div className="home-photos">
        <img className="left-photo" id="chicago" src={chicago} alt="chicago"/>
        <img className="right-photo" id="atlanta" src={atlanta} alt="atlanta"/>
      </div>
      <div className="header">
        <h1>Reyaly Travel</h1>
        <h5>Share your travel photos</h5>
        <button className="btn btn-info choices">
          <Link to={"/gallery"}>    
            Gallery
          </Link> 
        </button>
      </div>

      <div className="home-photos">
        <img className="right-photo" id="beach" src={beach} alt="beach"/>
        <img className="left-photo" id="waterfall" src={waterfall} alt="waterfall"/>
      </div>
    </div>
  );
};
