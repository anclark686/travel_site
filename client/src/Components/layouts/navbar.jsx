import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Offcanvas, Button, Form, FormControl } from 'react-bootstrap';
import LoginButton from '../login_reg/login'
import LogoutButton from '../login_reg/logout'
import { useAuth0 } from "@auth0/auth0-react";
import "./assets/style.css";


const logo = require("./assets/AC_ICON.png")
const menuName = [
    {
      name: 'Menu',
      scroll: true,
      backdrop: true,
    },
  ];


function MenuOffCanvas({ name, ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    const { isAuthenticated } = useAuth0();
    return (
      
      (isAuthenticated && (
      <div>
        <Button variant="info" onClick={toggleShow} className="me-2">
          {name}
        </Button>
        <Offcanvas className="bg-dark" show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <div className="navigation">
              <Offcanvas.Title>Navigation</Offcanvas.Title>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Link to={"/create"} onClick={toggleShow}>    
                <div className="nav-menu" id="create">Create New Post</div>
            </Link> 
            <Link to={"/posts"} onClick={toggleShow}>    
                <div className="nav-menu" id="posts">View Your Posts</div>
            </Link>  
            <Link to={"/gallery"} onClick={toggleShow}>    
                <div className="nav-menu" id="gallery">Public Gallery</div>
            </Link>
            <Link to={"/search"} onClick={toggleShow}>    
                <div className="nav-menu" id="search">Search</div>
            </Link>
            <Link to={"/account"} onClick={toggleShow}>    
                <div className="nav-menu" id="account">Account</div>
            </Link>  
            <Link to={"/welcome"} onClick={toggleShow}>    
                <div className="nav-menu" id="welcome">Home</div>
            </Link> 
            <div className="logout">
              <LogoutButton />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>)) 
      || 
      (!isAuthenticated && (
      <div>
        <Button variant="info" onClick={toggleShow} className="me-2">
          {name}
        </Button>
        <Offcanvas className="bg-dark" show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <div className="navigation">
              <Offcanvas.Title>Navigation</Offcanvas.Title>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="loginRegister">
              <LoginButton /> 
            </div>
            <Link to={"/gallery"} onClick={toggleShow}>    
                <div className="nav-menu" id="gallery">Public Gallery</div>
            </Link>
            <Link to={"/"} onClick={toggleShow}>    
                <div className="nav-menu" id="home">Home</div>
            </Link> 
          </Offcanvas.Body>
        </Offcanvas>
      </div>))
    );
  }
  
  function Menu() {
    return (
      <>
        {menuName.map((props, idx) => (
          <MenuOffCanvas key={idx} placement='end' {...props} />
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
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-left"
                    />{' '}
                <Link to={"/"}>    
                    <div className="d-inline-block" id="brand">Reyaly Travel</div>
                </Link>    
                </Navbar.Brand>

                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-info">Search</Button>
                </Form>

                <Menu />

                </Container>
            </Navbar>
        </div>

    );
  }
  
export default Nav;