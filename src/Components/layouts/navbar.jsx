import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Offcanvas, Button, Form, FormControl } from 'react-bootstrap';


const logo = require("./AC_ICON.png")
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
  
    return (
      <>
        <Button variant="info" onClick={toggleShow} className="me-2">
          {name}
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Navigation</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="loginRegister">
              <Link to={"/login"} onClick={toggleShow}>    
              Login |
              </Link> 
              <Link to={"/signup"} onClick={toggleShow}>    
               | Sign Up 
              </Link> 
            </div>
            <Link to={"/search"} onClick={toggleShow}>    
                <div id="search">Search</div>
            </Link> 
            <Link to={"/home"} onClick={toggleShow}>    
                <div id="home">Home</div>
            </Link> 
            
          </Offcanvas.Body>
        </Offcanvas>
      </>
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