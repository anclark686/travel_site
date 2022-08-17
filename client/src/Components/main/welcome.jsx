import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { auth, db } from '../../firebase'
import { NeedToLogin } from "../login_reg/needtologin";

const charlotte = require("./assets/charlotte.JPG")
const gotg = require("./assets/gotg.jpg")
const beach = require("./assets/beach3.jpg")
const toronto = require("./assets/toronto.jpg")

export const Welcome = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser)
      else setUser(null)
      return () => unsubscribe()
    })
  }, [user])

  return (
    <div className="welcome">
      {user ? 
      <>
      <div className="welcome-photos">
        <img id="charlotte" src={charlotte} alt="charlotte"/>
        <img id="gotg" src={gotg} alt="garden of the gods"/>
        <img id="beach" src={beach} alt="beach"/>
        <img id="toronto" src={toronto} alt="toronto"/>
      </div>
      <div className="welcome-options">
        <h1>Welcome {user.displayName[0].toUpperCase()+ user.displayName.substring(1)}!</h1>
        <button className="btn btn-dark choices">
          <Link to={"/create"}>    
            Create a Post
          </Link> 
        </button>
        <button className="btn btn-dark choices">
          <Link to={"/posts"}>    
            View Posts
          </Link> 
        </button>
        <button className="btn btn-dark choices">
          <Link to={"/gallery"}>    
            Gallery
          </Link> 
        </button>
      </div> 
      </> : 
      <NeedToLogin />}
    </div>
    )
};
