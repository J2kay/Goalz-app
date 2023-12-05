import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { auth, database } from "../config/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/Signup.css"; // Import your stylesheet for styling
import img1 from "../images/img1.jpg";
import HomePage from "./HomePage";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });

    // console.log("Signing up:", { username, email, password });
    // You can make API calls or perform other actions as needed
    setSignupSuccess(true);
  };

  //if (isSignupSuccess) {
  // return <HomePage />;
  //}

  return (
    <div className="signup-container">
      <div className="image-container">
        {/* Add your image here */}
        <img src={img1} alt="Signup" />
      </div>
      <div className="form-container">
        <h2>Sign Up</h2>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            onClick={handleSignup}
            className="s-button"
          >
            Sign Up
          </Button>
        </Form>
        <p>
          Already have an account? <NavLink to="/login">Login here</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
