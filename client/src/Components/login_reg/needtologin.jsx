import './assets/style.css'
import LoginButton from './login';

const loginImage = require("./assets/login.png")

export const NeedToLogin = () => {
    return (
      <div className="header">
        <img id="loginImage" src={loginImage}  alt=""/>
        <h1 id="needToLogin">Please login to view this content.</h1>
        <div id="loginButton">
          <LoginButton />
        </div>
      </div>
    );
  };