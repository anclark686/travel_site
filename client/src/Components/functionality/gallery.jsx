import React, { useState, useEffect } from "react";
import { auth, db } from '../../firebase'
import Post from "./post";
import { Link } from "react-router-dom";
  
export const Gallery = () => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser)
      else setUser(null)
      return () => unsubscribe()
    })
  }, [user])

  useEffect(() => {
    // .orderBy('timestamp', 'desc')
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()      
      })))
    })
  }, [])

  return (
    <div className="gallery">
      <div className="header">
        <h1 id="details">Gallery</h1>
      </div>
      
      <div className="search_button">
        <button className="btn btn-dark choices">
          <Link to={"/search"}>    
            Search
          </Link> 
        </button>
      </div>

      <div className="posts" >
        {posts.map(({id, post}) => (

              <Link key={id} className="gallery_links" to="/details" state={{post: post, postId: id}}>
                <Post 
                  key={id} 
                  postId={id} 
                  user={user} 
                  username={post.username} 
                  title={post.title} 
                  location={post.location} 
                  caption={post.caption} 
                  imageUrl={post.imageUrl}
                />
              </Link>

          ))}

      </div>
    </div>
  );
};