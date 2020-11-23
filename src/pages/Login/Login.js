import React, { useState } from "react";
import { Button, Container, Form, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    console.log("Submit");
    e.preventDefault();
  };

  return (
    <Container>
      <div className="Login">
        <div className="Login-form-wrapper">
          <Form
            as={Col}
            md={{ span: 6, offset: 3 }}
            className="Login-form mt-5"
            onSubmit={handleSubmit}
          >
            <h1 className="mt-5 mb-5">Login</h1>
            <Form.Group controlId="formBasicEmail">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                value={loginData.email}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label htmlFor="email">Password</Form.Label>
              <Form.Control
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                value={loginData.password}
                type="password"
                placeholder="password"
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Button onClick={handleSubmit} variant="primary" type="submit">
                Log in
              </Button>
              <Link className="ml-4" to="/signup">
                Click to sign up
              </Link>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default Login;
