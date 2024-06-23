import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Offcanvas, Button } from "react-bootstrap";

import { auth } from "../../firebase";
import "./assets/style.css";

import logo from "./assets/REYALYicon.png";

const menuName = [
  {
    name: "Menu",
    scroll: true,
    backdrop: true,
  },
];

function MenuOffCanvas({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser);
      else setUser(null);
      return () => unsubscribe();
    });
  }, [user]);

  const Logout = () => {
    auth.signOut();
    navigate("/");
    toggleShow();
  };

  return (
    <>
      {user ? (
        <div>
          <Button variant="info" onClick={toggleShow} className="me-2">
            {name}
          </Button>
          <Offcanvas
            className="bg-dark"
            show={show}
            onHide={handleClose}
            {...props}
          >
            <Offcanvas.Header closeButton>
              <div className="navigation">
                <Offcanvas.Title>Navigation</Offcanvas.Title>
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Link to={"/create"} onClick={toggleShow}>
                <div className="nav-menu" id="create">
                  Create New Post
                </div>
              </Link>
              <Link to={"/posts"} onClick={toggleShow}>
                <div className="nav-menu" id="posts">
                  View Your Posts
                </div>
              </Link>
              <Link to={"/gallery"} onClick={toggleShow}>
                <div className="nav-menu" id="gallery">
                  Public Gallery
                </div>
              </Link>
              <Link to={"/search"} onClick={toggleShow}>
                <div className="nav-menu" id="search">
                  Search
                </div>
              </Link>
              {/* <Link to={"/account"} onClick={toggleShow}>    
                <div className="nav-menu" id="account">Account</div>
            </Link>   */}
              <Link to={"/welcome"} onClick={toggleShow}>
                <div className="nav-menu" id="welcome">
                  Home
                </div>
              </Link>
              <div className="logout">
                <Button className="logout" variant="info" onClick={Logout}>
                  Logout
                </Button>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ) : (
        <div>
          <Button variant="info" onClick={toggleShow} className="me-2">
            {name}
          </Button>
          <Offcanvas
            className="bg-dark"
            show={show}
            onHide={handleClose}
            {...props}
          >
            <Offcanvas.Header closeButton>
              <div className="navigation">
                <Offcanvas.Title>Navigation</Offcanvas.Title>
              </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="loginRegister">
                <Link to={"/login"} onClick={toggleShow}>
                  <div className="nav-menu" id="login">
                    Login
                  </div>
                </Link>{" "}
                <p>--</p>
                <Link to={"/register"} onClick={toggleShow}>
                  <div className="nav-menu" id="register">
                    Register
                  </div>
                </Link>
              </div>
              <Link to={"/"} onClick={toggleShow}>
                <div className="nav-menu" id="home">
                  Home
                </div>
              </Link>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
    </>
  );
}

function Menu() {
  return (
    <>
      {menuName.map((props, idx) => (
        <MenuOffCanvas key={idx} placement="end" {...props} />
      ))}
    </>
  );
}
// src="https://via.placeholder.com/150/0000FF/FFFFFF/?text=Digital.com"
function Nav() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-left logo"
            />{" "}
            <Link to={"/"}>
              <div className="d-inline-block" id="brand">
                Reyaly Travel
              </div>
            </Link>
          </Navbar.Brand>

          {/* <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-info">Search</Button>
                </Form> */}

          <Menu />
        </Container>
      </Navbar>
    </div>
  );
}

export default Nav;
