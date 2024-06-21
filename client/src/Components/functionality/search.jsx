import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { NeedToLogin } from "../login_reg/needtologin";
import {
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import Post from "./post";

export const Search = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("Select");
  const [searchVal, setSearchVal] = useState("");
  const [posts, setPosts] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser);
      else setUser(null);
      return () => unsubscribe();
    });
    console.log(user);
  }, [user]);

  useEffect(() => {
    // .orderBy('timestamp', 'desc')
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        })),
      );
    });
  }, []);

  const searchDB = () => {
    let newPosts = [];

    posts.forEach((element) => {
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
      }
    });

    if (newPosts.length === 0) {
      console.log("No Results Found");
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

  return (
    <>
      {user ? (
        <div className="search">
          <div className="header">
            <h1 id="search">Search</h1>
          </div>

          <div className="search-filters ">
            <InputGroup className="search-bar">
              <div className="radio-search">
                {/* <Form>
              <Form.Check 
                inline 
                type="radio" 
                id="user-posts" 
                name="group1" 
                label="Only your posts"
                onClick={() => setScope("user")}
              />
              <Form.Check 
                inline 
                type="radio" 
                id="all-posts" 
                name="group1" 
                label="All posts" 
                onClick={() => setScope("all")}
              />
            </Form> */}
              </div>

              <DropdownButton
                className="search-button"
                title={search}
                variant="dark"
                id="input-group-dropdown-1"
                style={{ borderRadius: "5px" }}
              >
                <Dropdown.Item id="Title" onClick={() => setSearch("Title")}>
                  Title
                </Dropdown.Item>
                <Dropdown.Item
                  id="Author"
                  onClick={() => setSearch("Location")}
                >
                  Location
                </Dropdown.Item>
                <Dropdown.Item id="Genre" onClick={() => setSearch("Username")}>
                  Username
                </Dropdown.Item>
                <Dropdown.Item id="Notes" onClick={() => setSearch("Caption")}>
                  Caption
                </Dropdown.Item>
              </DropdownButton>
              <Form.Control
                className="search-input"
                aria-label="Text input with dropdown button"
                onChange={(e) => setSearchVal(e.target.value)}
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

          {msg ? (
            <h1 style={{ textAlign: "center" }}>No Results</h1>
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
  );
};
