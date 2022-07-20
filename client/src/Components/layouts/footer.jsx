import React from "react";
import { Link } from "react-router-dom";
import "./assets/style.css";

const github = require("./assets/github.png")
const linkedin = require("./assets/linkedin.png")

const Footer = () => {
  const today = new Date();
    return (

    <div>
        <div className="phantom" />
        <div className="footer">
            <div className="footerLinks">
                <a href="https://github.com/anclark686" target="_blank" rel="noreferrer">
                    <img
                        alt=""
                        src={github}
                        width="35"
                        height="35"
                        className="d-inline-block align-left"
                    />
                </a>
                <a href="https://www.linkedin.com/in/anclark686/" target="_blank" rel="noreferrer">
                    <img
                        alt=""
                        src={linkedin}
                        width="35"
                        height="35"
                        className="d-inline-block align-left"
                    />
                </a>
               
            </div>
            <Link 
                to={"/about"} 
                className="d-inline-block align-left" 
                style={{paddingLeft:"10px", paddingRight:"10px"}}>    
                <div id="aboutFooter">About </div>
            </Link> 
            <Link 
                to={"/contact"} 
                className="d-inline-block align-left" 
                style={{paddingLeft:"10px", paddingRight:"10px"}}>    
                <div id="contactFooter">Contact </div>
            </Link> 
            <a 
                href="https://reyaly-portfolio.herokuapp.com/" 
                className="d-inline-block align-left" 
                style={{paddingTop: "10px", paddingLeft:"10px", paddingRight:"10px"}}>    
                <div id="portfolioFooter">Portfolio </div>
            </a> 

            <p>Copyright &copy; Reyaly Tech {today.getFullYear()}</p>
        </div>
    </div>

  );
};

export default Footer;