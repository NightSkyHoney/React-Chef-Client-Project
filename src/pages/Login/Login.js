import React, { useEffect, useState } from "react";
import { Button, Container, Form, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../store/userLogin/userLoginActions";
import { selectToken } from "../../store/userLogin/userLoginSelectors";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    description: "",
    name: "Roibin OToole",
    id: Math.ceil(Math.random() * 10000),
    role: "Member",
    imgUrl:
      "https://media.gq-magazine.co.uk/photos/5d13a8ad003d754254ae74f1/master/pass/adam-handling-gq-17apr19_b.jpg",
  });

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: loginData.email, password: loginData.password }));
    setLoginData({ email: "", password: "" });

    localStorage.setItem("currentTalkjsUser", JSON.stringify(loginData));
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
                value={loginData.email}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
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
