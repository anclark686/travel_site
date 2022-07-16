import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NeedToLogin } from "../login_reg/needtologin";

  
export const Account = () => {
  const { isAuthenticated } = useAuth0();
  
  return (
    (isAuthenticated && (
      <div className="header">
      <h1 id="account">Account</h1>
    </div>
  )) ||
    (!isAuthenticated && (
      <NeedToLogin />
    ))
  );
};
  
 