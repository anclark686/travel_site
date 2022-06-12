import { React, useState } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const loginImage = require("./assets/login.png")

function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

export const SignUp =  () => {
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [firstNameValid, setFirstNameValid] = useState("")
  const [lastNameValid, setLastNameValid] = useState("")
  const [usernameValid, setUsernameValid] = useState("")
  const [passwordValid, setPasswordValid] = useState("")
  
  const [somethingWrong, setSomethingWrong] = useState("")
  let areYouReady = false

  const createUser = async (e) => {
    console.log(`2: ${firstName}, ${lastName}, ${email}, ${username}, ${password}, ${validated}`)
       
    if (validated===false) {
      await Axios.post("http://localhost:5000/users/create", {
      firstName : firstName,
      lastName : lastName,
      email : email,
      username : username,
      password : password,
    }).then((response) => {
      (response.data === "Values Inserted") ? areYouReady = true : areYouReady = false
      setSomethingWrong(response.data)
      if (areYouReady) {navigate("/welcome") }
    })
    
    

  }}

  const checkValues = (e) => {
    if (firstName === "") { 
      document.getElementById("signInFirstName").value = "";
      setValidated(true)
      setFirstNameValid("blankFirstName")
    } else setFirstNameValid("")
    if (lastName === "") { 
      document.getElementById("signInLastName").value = "";
      setValidated(true)
      setLastNameValid("blankLastName")
    } else setLastNameValid("")
    if (username === "") { 
      document.getElementById("signInUser").value = "";
      setValidated(true)
      setUsernameValid("blankUsername")
    } else setUsernameValid("")
    if (password === "") { 
      document.getElementById("signInPass").value = "";
      setValidated(true)
      setPasswordValid("blankPassword")
    } else setPasswordValid("")
  }

  const handleSubmit = (e) => {

    const form = e.currentTarget;
    checkValues();

    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
    } 
    else {
        e.preventDefault();
        setValidated(false);
        setSomethingWrong("")
        createUser();
        
    }
  };

  return (
    <div className="header">
      <img id="loginImage" src={loginImage} style={{ width: '150px' }} alt=""/>
      <div className="loginForm ">
        <Card body className="col d-flex justify-content-center">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
            { (somethingWrong==="other") ? <p>Something went wrong, please try again later</p> : null}
              <Form.Group as={Col} me="4" controlId="signInFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="First Name" 
                required
                onChange={ (e) => {setFirstName(e.target.value.trim())} }/>
                { (firstNameValid==="blankFirstName") ? <p>First name cannot be blank.</p> : null }
              </Form.Group>
              <Form.Group as={Col} me="4" controlId="signInLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Last Name" 
                required
                onChange={ (e) => {setLastName(e.target.value.trim())} }/>
                { (lastNameValid==="blankLastName") ? <p>Last name cannot be blank.</p> : null }
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="signInEmail">
              
              <Form.Label>Email address</Form.Label>
              <Form.Control 
              type="email" 
              placeholder="Enter email" 
              required
              onChange={ (e) => {setEmail(e.target.value.trim())} }/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              { (somethingWrong==="email") ?  <p>Email already registered. <Link to={"/login"}> Login</Link></p> : null }
            </Form.Group>

            <Form.Group className="mb-3" controlId="signInUser">
            
              <Form.Label>Username</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Username" 
              required
              onChange={ (e) => {setUsername(e.target.value.trim())} }/>
              { (somethingWrong==="username") ? <p>Username taken.</p> : null }
              { (usernameValid==="blankUsername") ? <p>Username cannot be blank.</p> : null }
            </Form.Group>

            <Form.Group className="mb-3" controlId="signInPass">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Password" 
              required
              onChange={ (e) => {setPassword(e.target.value.trim())} }/>
              { (passwordValid==="blankPassword") ? <p>Password cannot be blank.</p> : null }
            </Form.Group>
            <Form.Group className="mb-3" controlId="signInCheck">
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

