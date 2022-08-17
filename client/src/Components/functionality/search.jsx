import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { auth, db } from '../../firebase'
import { NeedToLogin } from "../login_reg/needtologin";
  
export const Search = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser)
      else setUser(null)
      return () => unsubscribe()
    })
  }, [user])

  return (
    <>
      {user ? <div className="header">
        <div className="header">
          <h1 id="search">Search</h1>
        </div>
        <div className="search-filters d-flex ">
          <div className="radio-search">
            <input type="radio" id="user-posts" />
            <label for="user-posts">Only your posts</label>
            <br />
            <input type="radio" id="all-posts" />
            <label for="user-posts">All posts</label>
          </div>
          <div className="search-posts">
            <input  type="text" id="search-posts" placeholder="Search" />
          </div>
        </div>
      </div> : <NeedToLogin />}
    </>
  );
};

