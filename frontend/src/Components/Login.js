import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        this.setState({ loggedIn: true });
      })
      .catch((err) => {
        alert("Incorrect Username or Password");
        return <Redirect push to="/login" />;
      });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect push to="/" />;
    } else {
      return (
        <div>
          <Form onSubmit={this.handleSubmit} className="mt-5 w-50 mx-auto">
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                id="email"
                onChange={this.handleChange}
                type="email"
                placeholder="example@example.com"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Link to="/register">
              <Button variant="primary">Register</Button>
            </Link>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }
  }
}