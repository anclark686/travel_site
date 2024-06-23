import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";

import { auth, db } from "../../firebase";
import Post from "./post";
import Loading from "../layouts/loading";
import { NeedToLogin } from "../login_reg/needtologin";

export const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        getPosts();
      } else {
        setUser(null);
        setPageLoading(false);
      }
      return () => unsubscribe();
    });
  }, [user]);

  const getPosts = async () => {
    const tempPosts = {};

    const q = query(collection(db, "posts/public/references"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const newQ = query(
        collection(db, doc.data().reference),
        where("public", "==", true)
      );
      const newQuerySnapshot = await getDocs(newQ);
      newQuerySnapshot.forEach((reference) => {
        const data = {
          id: reference.id,
          post: reference.data(),
        };

        if (!Object.keys(tempPosts).includes(data.id)) {
          tempPosts[data.id] = data;
        }
      });

      setPosts(Object.values(tempPosts));
      setPageLoading(false);
    });
  };

  return (
    <>
      {user ? (
        <div className="gallery">
          <div className="header">
            <h1 id="details">Gallery</h1>
          </div>
          {!pageLoading ? (
            <>
              {user ? (
                <div className="search-add-btn-container">
                  <div className="search_button">
                    <button className="btn btn-dark choices">
                      <Link to={"/search"}>Search</Link>
                    </button>
                  </div>
                  <div className="add_new_button">
                    <button className="btn btn-dark choices">
                      <Link to={"/create"}>Add New</Link>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="search_button">
                  <button className="btn btn-dark choices">
                    <Link to={"/search"}>Search</Link>
                  </button>
                </div>
              )}

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
                        />
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    <h1 className="nada">Nothing to see here!</h1>
                  </>
                )}
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <NeedToLogin />
      )}
    </>
  );
};
