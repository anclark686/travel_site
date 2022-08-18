import './assets/style.css'
import { Link } from "react-router-dom";

const loginImage = require("./assets/login.png")

export const NeedToLogin = () => {
    return (
      <div className="header">
        <img id="loginImage" src={loginImage}  alt=""/>
        <h1 id="needToLogin">Please login to view this content.</h1>
        <div id="loginButton">
        <button className="btn btn-dark choices">
          <Link to={"/login"}>    
            Login
          </Link> 
        </button>
        </div>
      </div>
    );
  };