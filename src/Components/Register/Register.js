import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./Register.css";

const Register = ({ changeRoute, route, updateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const emailChanged = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const passwordChanged = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const nameChanged = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const registerSubmited = () => {
    if (email !== "" && name !== "" && password !== "") {
      fetch("https://frozen-sands-03548.herokuapp.com/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, name: name, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.email) {
            updateUser(data);
            changeRoute("home");
            console.log(data);
          }
        });
    }
  };

  return (
    <div className="SignIn">
      <Form className="FormSignIn close rounded shadow text-start Register pmain">
        <h2 className="mb-3 ptextlight2"> Register </h2>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={emailChanged}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={nameChanged} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordChanged}
          />
        </Form.Group>
        <div className="text-center">
          <Button
            variant="primary"
            type="button"
            className="mb-3"
            onClick={() => {
              registerSubmited();
            }}
          >
            Register
          </Button>
        </div>
        <Form.Text className="text text-center">
          Not registered already ? Please
        </Form.Text>
        <a className="RegisterLink">Register</a>
      </Form>
    </div>
  );
};

export default Register;
