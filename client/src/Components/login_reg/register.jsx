import { React, useState, useEffect } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../../firebase'


const loginImage = require("./assets/login.png")

export const Register =  () => {
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

  const [user, setUser] = useState(null)

  const createUser =  (e) => {
    console.log(`2: ${firstName}, ${lastName}, ${email}, ${username}, ${password}, ${validated}`)
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
        firstName: firstName,
        lastName: lastName
      })
    })
    .catch((err) => alert(err.message))
    }

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          // user has logged in...
          console.log(authUser)
          setUser(authUser)
          console.log("success!")
          navigate("/welcome")
        } else {
          // user has logged out...
          setUser(null)
        }
        return () => {
          // perform some cleanup actions 
          unsubscribe()
        }
      })
    }, [user])

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