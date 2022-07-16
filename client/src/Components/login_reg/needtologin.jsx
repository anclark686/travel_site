
const loginImage = require("./assets/login.png")

export const NeedToLogin = () => {
    return (
      <div className="header">
        <img id="loginImage" src={loginImage} style={{ width: '150px' }} alt=""/>
        <h1 id="needToLogin">NeedToLogin</h1>
      </div>
    );
  };