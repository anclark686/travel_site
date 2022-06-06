import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const loginImage = require("./login.png")
  
export const SignUp = () => {
  return (
    <div className="header">
      <h1 id="signUp">Sign Up</h1>
      <img id="loginImage" src={loginImage} style={{ width: '150px' }}/>
      <div className="loginForm">
        <Card body className="col d-flex justify-content-center">
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Name" />
            </Form.Group>

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
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button variant="info" type="submit">
              Submit
            </Button>
            <br />
            <br />
            
            <Form.Group className="mb-3">
              <Form.Label>Already have an account? </Form.Label>
              <Link to={"/login"}> Login</Link>
            </Form.Group>
          </Form>
        </Card>
      </div>
    </div>
  );
};

