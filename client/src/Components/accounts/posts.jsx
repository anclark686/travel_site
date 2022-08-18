import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase'
import { NeedToLogin } from "../login_reg/needtologin";
import Post from "../functionality/post"
import { Link } from "react-router-dom";


export const Posts = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser)
      else setUser(null)
      return () => unsubscribe()
    })

    getResults()
  }, [user])
  

  const getResults = async () => {
    db.collection('posts')
    .where("username", "==", user.displayName)
    .onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  console.log(posts) 
  }



  return (
    <>
      {user ? <div className="posts_container">
        <div className="header">
          <h1 id="posts">My Posts</h1>
        </div>

        <div className="search_button">
          <button className="btn btn-dark choices">
            <Link to={"/search"}>    
              Search
            </Link> 
          </button>
        </div>
        
        {/* <div className="sort-post-dropdown">
          <label htmlFor="sort-by">Sort by:</label>
          <select name="sort-by" id="sort-by-dropdown">
            <option value="name-a">Name Ascending</option>
            <option value="name-d">Name Descending</option>
            <option value="date-a">Date Ascending</option>
            <option value="date-d">Date Descending</option>
          </select>
          </div> */}

          <div className="posts">
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
      </div> : <NeedToLogin />} 
    </>    
  )
};
  