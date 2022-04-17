import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./SignIn.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = ({ changeRoute, route, updateUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailChanged = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const passwordChanged = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const signInSubmited = () => {
    if (email !== "" && password !== "") {
      fetch("https://frozen-sands-03548.herokuapp.com/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.email) {
            changeRoute("home");
            updateUser(data);
          } else {
            console.log("try again");
          }
        })
        .catch((err) => console.log("front side catch: unable to signin"));
    }
  };
  return (
    <div className="SignIn">
      <Form className="FormSignIn pmain rounded shadow text-center">
        <h2 className="mb-3 ptextlight2 text-start"> SignIn </h2>
        <Form.Group className="mb-2 text-start" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={emailChanged}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordChanged}
          />
        </Form.Group>

        <Button
          className="RegisterLink btn-primary btn margincenter mb-3"
          onClick={() => signInSubmited()}
        >
          SignIn
        </Button>

        <br />
        <Form.Text className="text text-center">
          Not registered already ? Please
        </Form.Text>
        <a className="RegisterLink" onClick={() => changeRoute("register")}>
          Register
        </a>
      </Form>
    </div>
  );
};

export default SignIn;
