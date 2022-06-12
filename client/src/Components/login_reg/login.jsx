import { React, useState } from "react";
import { Form, Button, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";


// <a href="https://www.flaticon.com/free-icons/login" title="login icons">Login icons created by Freepik - Flaticon</a>


const loginImage = require("./assets/login.png")

export const Login = () => {
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const [userMatch, setUserMatch] = useState(true)
  const [passMatch, setPassMatch] = useState(true)

  const [loggedInErr, setLoggedInErr] = useState(false)

  const navigate = useNavigate();

  const loginMethod = async (e) => {

    await Axios.post("http://localhost:5000/users/login", {
      username: username,
      password: password
    }).then((response) => {
      if (response.data === "Not Found") {
        setUserMatch(false)
      } else if (response.data === "password invalid") {
        setPassMatch(false)
        setUserMatch(true)
      } else if (response.data === "password valid") {
        navigate("/welcome")
      } else {setLoggedInErr(true)}
    });
    // await Axios.get("http://localhost:5000/users/login").then((response) => {
    //   if (response.username === username) {
    //     if (response === password) {
    //       navigate("/home")
    //     } else {
    //       setPassMatch(false)
    //     }
    //   } else {
    //     setPassMatch(false)
    //   }
    
      
    // })
  }

  const handleSubmit = (e) => {

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
    } 
    else {
        e.preventDefault();
        console.log(`${username}, ${password}`)
        loginMethod()
        setValidated(false);
    }
  };

  return (
    <div className="header">
      <img id="loginImage" src={loginImage} style={{ width: '150px' }} alt=""/>

      <div className="loginForm">
        <Card body className="col d-flex justify-content-center">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
          { loggedInErr ?  <p>Unable to Log in, please try again later.</p> : null }
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Enter username" 
              onChange={ (e) => {setUsername(e.target.value)} }/>
              { userMatch ? null : <p>Incorrect Username.</p>  }
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Password" 
              onChange={ (e) => {setPassword(e.target.value)} }/>
              { passMatch ? null : <p>Incorrect Password.</p> }
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="info" type="submit">
              Submit
            </Button>
            <br />
            <br />  
            <Form.Group className="mb-3">
              <Form.Label>Need to create an account? </Form.Label>
              <Link to={"/signUp"}> Sign Up</Link>
            </Form.Group>
          </Form>
        </Card>
      </div>
    </div>
  );
};

