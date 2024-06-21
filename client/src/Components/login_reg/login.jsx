import { React, useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

// <a href="https://www.flaticon.com/free-icons/login" title="login icons">Login icons created by Freepik - Flaticon</a>

const loginImage = require("./assets/login.png");

export const Login = () => {
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedInErr, setLoggedInErr] = useState(false);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const loginMethod = async (e) => {
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      console.log(err.message);
      setLoggedInErr(err.message);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
        console.log("success!");
        navigate("/welcome");
      } else {
        // user has logged out...
        setUser(null);
      }
      return () => {
        // perform some cleanup actions
        unsubscribe();
      };
    });
  }, [user]);

  const handleSubmit = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      loginMethod();
      setValidated(false);
    }
  };

  return (
    <div className="header">
      <img id="loginImage" src={loginImage} style={{ width: "150px" }} alt="" />

      <div className="loginForm">
        <Card body className="col d-flex justify-content-center">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {loggedInErr ===
            "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)." ? (
              <p className="invalid">
                Unable to locate user, please{" "}
                <Link to={"/register"}>Register</Link>
              </p>
            ) : null}
            {loggedInErr ===
            "Firebase: The email address is badly formatted. (auth/invalid-email)." ? (
              <p className="invalid">Invalid Email Address</p>
            ) : null}
            {loggedInErr ===
            "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password)." ? (
              <p className="invalid">Invalid Password</p>
            ) : null}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="info" type="submit">
              Submit
            </Button>
            <br />
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Need to create an account? </Form.Label>
              <Link to={"/register"}> Register</Link>
            </Form.Group>
          </Form>
        </Card>
      </div>
    </div>
  );
};
