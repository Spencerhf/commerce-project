import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Logo from "../images/logo-light.png";

class Header extends Component {

  constructor() {
    super();
    this.state = {
      storage: false
    }
  }

  logOut = (e) => {
    e.preventDefault();
    sessionStorage.clear();
  }

  render() {
    return (
      <div>
        <Navbar className="pb-0 pt-0" bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <Image className="logo" src={Logo} fluid width="120" height="120" />
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Link style={linkStyle} to="/">Home</Link>
            <Link style={linkStyle} to="/">Features</Link>
            <Link style={linkStyle} to="/">Prices</Link>
            <Link style={linkStyle} to="/admin">Admin</Link>
            <Link to="/register"><Button>Login/Register</Button></Link>
            <Button onClick={this.logOut}>Logout</Button>
          </Nav>
          <Form inline>
            <Link style={{ marginRight: '30px', color: 'rgb(222, 237, 252)' }} to="/checkout">Checkout</Link>
            <FormControl
              htmlFor="search"
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={this.props.inputValue}
              onChange={this.props.filterOnChange}
            />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

const linkStyle = {
  marginRight: '10px'
}

export default Header;