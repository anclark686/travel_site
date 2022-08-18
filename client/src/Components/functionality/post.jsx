import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { auth, db } from '../../firebase'
import firebase from 'firebase/compat/app';

function Post({ postId, user, username, title, location, caption, imageUrl}) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")


  return (
    <div className="post">
        <div className="post_header" >
            <h3>{title}</h3>
        </div>

            <img 
                className="post_image" 
                src={imageUrl} 
                alt=""
            />

        <h4 className="post_text"><strong>{username} </strong> {location}</h4>
        <h5 className="post_text">{caption}</h5>


    </div>
  )
}

export default Post
