import React from "react";
import FormPage from "./contactEmail";

import contactImage from "./assets/apple.png";

export const Contact = () => {
  return (
    <div>
      <h1 className="header">Contact Me</h1>
      <img
        id="contactImage"
        src={contactImage}
        style={{ width: "150px" }}
        alt=""
      />

      <FormPage />
    </div>
  );
};
