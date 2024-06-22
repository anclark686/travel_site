import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, getDocs, orderBy } from "firebase/firestore";

import { auth, db } from "../../firebase";
import { NeedToLogin } from "../login_reg/needtologin";
import Post from "../functionality/post";
import Loading from "../layouts/loading";

export const Posts = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setPageLoading(false);
        getResults();
      } else {
        setUser(null);
        setPageLoading(false);
      }
      return () => unsubscribe();
    });
  }, [user]);

  const getResults = async () => {
    const tempPosts = [];
    if (user) {
      const path = `posts/${user.uid}/images`;
      const q = query(collection(db, path), orderBy("timestamp", "desc"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempPosts.push({
          id: doc.id,
          post: doc.data(),
        });
      });
      setPosts(tempPosts);
    }
  };

  return (
    <>
      {!pageLoading ? (
        <>
          {user ? (
            <div className="posts_container">
              <div className="header">
                <h1 id="posts">My Posts</h1>
              </div>
              <div className="search-add-btn-container">
                <div className="search_button">
                  <button className="btn btn-dark choices">
                    <Link to={`/search`}>Search</Link>
                  </button>
                </div>
                <div className="add_new_button">
                  <button className="btn btn-dark choices">
                    <Link to={"/create"}>Add New</Link>
                  </button>
                </div>
              </div>

              <div className="posts">
                {posts.length > 0 ? (
                  <>
                    {posts.map(({ id, post }) => (
                      <Link
                        key={id}
                        className="gallery_links"
                        to="/details"
                        state={{ post: post, postId: id }}
                      >
                        <Post
                          key={id}
                          postId={id}
                          user={user}
                          username={post.username}
                          title={post.title}
                          location={post.location}
                          caption={post.caption}
                          imageUrl={post.imageUrl}
                          publicAvail={post.public}
                        />
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    <h1 className="nada">
                      Nothing to see here! Click 'Add New' to get started.
                    </h1>
                  </>
                )}
              </div>
            </div>
          ) : (
            <NeedToLogin />
          )}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};
