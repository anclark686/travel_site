import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NeedToLogin } from "../login_reg/needtologin";
  
export const Create = () => {
  const { isAuthenticated } = useAuth0();
  const { isLoading, error } = useAuth0;
  return (
    (isAuthenticated && (
      <div className="header">
      {!error && isLoading && <p>Loading...</p>}
      <h1 id="create">Create</h1>
    </div>
  )) ||
    (!isAuthenticated && (
      <NeedToLogin />
    ))
  );
};
