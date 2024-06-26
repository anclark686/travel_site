import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import {
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

import { auth, db } from "../../firebase";
import { NeedToLogin } from "../login_reg/needtologin";
import Post from "./post";
import Loading from "../layouts/loading";

export const Search = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("Select");
  const [searchVal, setSearchVal] = useState("");
  const [posts, setPosts] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchPosts, setSearchPosts] = useState(posts);
  const [pageLoading, setPageLoading] = useState(true);
  const [scope, setScope] = useState("all");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        getInitialPosts("all");
      } else {
        setUser(null);
        setPageLoading(false);
      }
      return () => unsubscribe();
    });
  }, [user]);

  const getUsersPosts = async () => {
    setPageLoading(true);
    const tempPosts = {};

    const privQuery = query(collection(db, `posts/${user.uid}/private`));
    const privQuerySnapshot = await getDocs(privQuery);
    privQuerySnapshot.forEach((doc) => {
      tempPosts[doc.id] = {
        id: doc.id,
        post: doc.data(),
      };
    });

    const pubQuery = query(collection(db, `posts/${user.uid}/public`));
    const pubQuerySnapshot = await getDocs(pubQuery);
    pubQuerySnapshot.forEach((doc) => {
      tempPosts[doc.id] = {
        id: doc.id,
        post: doc.data(),
      };
    });

    return tempPosts;
  };

  const getInitialPosts = async (scope) => {
    if (user) {
      let allPosts = {};
      getUsersPosts().then(async (data) => {
        allPosts = { ...allPosts, ...data };

        if (scope === "all") {
          
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

              if (!Object.keys(allPosts).includes(data.id)) {
                allPosts[data.id] = data;
              }
            });

            setPosts(Object.values(allPosts));
            setSearchPosts(Object.values(allPosts));
            setPageLoading(false);
          });
        } else {
          setPosts(Object.values(allPosts));
          setSearchPosts(Object.values(allPosts));
          setPageLoading(false);
        }
      });
    }
  };

  const searchDB = (scope) => {
    let newPosts = [];

    posts.forEach((element) => {
      if (scope === "user" && element.post.username !== user.displayName) {
        return;
      }

      if (search === "Title") {
        if (
          element.post.title.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          newPosts.push(element);
        }
      } else if (search === "Location") {
        if (
          element.post.location.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          newPosts.push(element);
        }
      } else if (search === "Username") {
        if (
          element.post.username.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          newPosts.push(element);
        }
      } else if (search === "Caption") {
        if (
          element.post.caption.toLowerCase().includes(searchVal.toLowerCase())
        ) {
          newPosts.push(element);
        }
      } else {
        const everything = `${element.post.title.toLowerCase()} ${element.post.location.toLowerCase()} ${element.post.username.toLowerCase()} ${element.post.caption.toLowerCase()}`;

        if (
          everything.includes(searchVal.toLowerCase()) &&
          !newPosts.includes(element)
        ) {
          newPosts.push(element);
        }
      }
    });

    if (newPosts.length === 0) {
      setMsg("No Results Found");
    } else {
      setMsg("");
      setSearchPosts(newPosts);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchDB(search, searchVal);
    }
  };

  const clearResults = () => {
    setSearchPosts(posts);
    setMsg("");
    setSearchVal("");
  };

  const checkInput = (e) => {
    if (e.target.value === "") {
      clearResults();
    } else {
      setSearchVal(e.target.value);
    }
  };

  const changeScope = (value) => {
    setScope(value);
    getInitialPosts(value);
  };


  return (
    <>
      {!pageLoading ? (
        <>
          {user ? (
            <div className="search">
              <div className="header">
                <h1 id="search">Search</h1>
              </div>

              <div className="search-filters ">
                <InputGroup className="search-bar">
                  {user ? (
                    <div className="radio-search">
                      <Form>
                        <Form.Check
                          inline
                          type="radio"
                          id="user-posts"
                          name="group1"
                          label="Only your posts"
                          onClick={() => changeScope("user")}
                        />
                        <Form.Check
                          inline
                          type="radio"
                          id="all-posts"
                          name="group1"
                          label="All posts"
                          onClick={() => changeScope("all")}
                        />
                      </Form>
                    </div>
                  ) : null}

                  <DropdownButton
                    className="search-button"
                    title={search}
                    variant="dark"
                    id="input-group-dropdown-1"
                    style={{ borderRadius: "5px" }}
                  >
                    <Dropdown.Item
                      id="Title"
                      onClick={() => setSearch("Title")}
                    >
                      Title
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="Author"
                      onClick={() => setSearch("Location")}
                    >
                      Location
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="Genre"
                      onClick={() => setSearch("Username")}
                    >
                      Username
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="Notes"
                      onClick={() => setSearch("Caption")}
                    >
                      Caption
                    </Dropdown.Item>
                  </DropdownButton>
                  <Form.Control
                    className="search-input"
                    aria-label="Text input with dropdown button"
                    onChange={checkInput}
                    onKeyDown={handleEnter}
                  />
                  <Button
                    variant="dark"
                    className="search-button"
                    onClick={() => searchDB(search, searchVal)}
                  >
                    Search
                  </Button>
                </InputGroup>
              </div>

              {searchPosts.length === 0 ? (
                <h1 style={{ textAlign: "center" }}>No Results Found. Try adjusting your search filters.</h1>
              ) : (
                <div className="posts">
                  {searchPosts.map(({ id, post }) => (
                    <Link
                      key={id}
                      className="gallery_links"
                      to="/details"
                      state={{ post: post, postId: id }}
                    >
                      <Post
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
              )}
            </div>
          ) : (
            <NeedToLogin />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
