import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class NewProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      photo: "",
      price: "",
      quantity: "",
      validProduct: false,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, photo, price, quantity } = this.state;
    console.log(name, description, photo, price, quantity);

    axios
      .post("http://localhost:8000/inventory/add_product", {
        product_name: name,
        description: description,
        photo: photo,
        price: price,
        quantity: quantity,
      }).then(() => {
        this.setState({ validProduct: true });
      })
  };

  render() {
    if (this.state.validProduct) {
      return <Redirect push to="/admin" />;
    } else {
      return (
        <div className="mt-4">
          <h1 style={{ textDecoration: 'underline' }} className="text-center">
            Create A New Product
          </h1>

          <Form onSubmit={this.handleSubmit} className="mt-5 w-50 mx-auto">
            <Form.Group>
              <Form.Label>Enter new product name</Form.Label>
              <Form.Control onChange={this.handleChange} id="name" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter product description</Form.Label>
              <Form.Control onChange={this.handleChange} id="description" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter product URL or select file</Form.Label>
              <Form.Control onChange={this.handleChange} id="photo" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter product price</Form.Label>
              <Form.Control onChange={this.handleChange} id="price" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Enter product quantity</Form.Label>
              <Form.Control onChange={this.handleChange} id="quantity" />
            </Form.Group>

            <Button className="mr-3" variant="primary" type="submit">
              Submit
            </Button>

            <Link to="/admin">
              <Button variant="primary">
                Go Back
              </Button>
            </Link>
          </Form>
        </div>
      );
    }
  }
}