import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase";

import chicago from "./assets/chicago.jpg";
import atlanta from "./assets/Atlanta.jpg";
import beach from "./assets/beach1.jpg";
import waterfall from "./assets/waterfall1.jpg";

export const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser);
      else setUser(null);
      return () => unsubscribe();
    });
  }, [user]);
  return (
    <div className="home">
      <div className="home-photos">
        <img className="left-photo" id="chicago" src={chicago} alt="chicago" />
        <img className="right-photo" id="atlanta" src={atlanta} alt="atlanta" />
      </div>
      <div className="header">
        <h1>Reyaly Travel</h1>
        <h5>Share your travel photos</h5>

        {user ? (
          <div className="home_buttons">
            <div className="home_buttons">
              <button className="btn btn-dark choices">
                <Link to={"/gallery"}>Gallery</Link>
              </button>
              <button className="btn btn-dark choices">
                <Link to={"/welcome"}>Homepage</Link>
              </button>
            </div>
          </div>
        ) : (
          <div className="home_buttons">
            <button className="btn btn-dark choices">
              <Link to={"/login"}>Login</Link>
            </button>
          </div>
        )}
      </div>

      <div className="home-photos">
        <img className="right-photo" id="beach" src={beach} alt="beach" />
        <img
          className="left-photo"
          id="waterfall"
          src={waterfall}
          alt="waterfall"
        />
      </div>
    </div>
  );
};
