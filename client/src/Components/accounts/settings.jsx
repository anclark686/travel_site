import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NeedToLogin } from "../login_reg/needtologin";
  
export const Settings = () => {
  const { isAuthenticated } = useAuth0();
  return (
    
    (isAuthenticated && (
      <div className="header">
        
      <h1 id="settings">Settings</h1>
    </div>
  )) ||
    (!isAuthenticated && (
      <>
      <NeedToLogin />
      </>
    ))
  );
};
 