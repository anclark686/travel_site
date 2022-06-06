import React from "react";
import { Form, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom";


// <a href="https://www.flaticon.com/free-icons/login" title="login icons">Login icons created by Freepik - Flaticon</a>


const loginImage = require("./login.png")

export const Login = () => {
  return (
    <div className="header">
      <h1 id="login">Login</h1>
      <img id="loginImage" src={loginImage} style={{ width: '150px' }}/>
      <div className="loginForm">
        <Card body className="col d-flex justify-content-center">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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

