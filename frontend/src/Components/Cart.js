import React, { Component } from "react";
import axios from "axios";
import CartItem from "./CartItem";

class Cart extends Component {
  constructor(state) {
    super(state);

    this.state = {};
    // this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }
  // rerenderParentCallback() {
  //   this.forceUpdate();
  // }

  componentDidMount() {
    if (!sessionStorage.getItem("userId")) {
      let thisCart = JSON.parse(sessionStorage.getItem("cart"));

      if (thisCart?.length) {
        let productArray = JSON.parse(sessionStorage.getItem("cart"));
        axios
          .post(
            "https://e-commerce-project-2020.herokuapp.com/show-cart/logged-out",
            {
              products: productArray,
            }
          )
          .then((result) => {
            console.log(productArray);
            // function countProducts(arr) {
            //   var a = [],
            //     b = [],
            //     prev;

            //   arr.sort();
            //   for (var i = 0; i < arr.length; i++) {
            //     if (arr[i] !== prev) {
            //       a.push(arr[i]);
            //       b.push(1);
            //     } else {
            //       b[b.length - 1]++;
            //     }
            //     prev = arr[i];
            //   }

            //   return [a, b];
            // }
            // var productCounts = countProducts(productArray);

            var counts = {};

            for (var i = 0; i < productArray.length; i++) {
              var num = productArray[i];
              counts[num] = counts[num] ? counts[num] + 1 : 1;
            }

            var productCounter = [];
            for (var i = 0; i < 1000; i++) {
              if (counts[i] !== undefined) {
                productCounter.push(counts[i]);
              }
            }
            console.log(productCounter);

            let allProducts = result.data.map((item, index) => {
              let product = Object.assign({}, item);
              product.quantity = productCounter[index];
              return product;
            });

            this.setState({
              products: allProducts,
            });
          })
          .catch((error) => {
            console.log("error");
          });
      }
    } else {
      axios
        .get(
          `https://e-commerce-project-2020.herokuapp.com/show-cart/${sessionStorage.getItem(
            "userId"
          )}`
        )
        .then((result) => {
          this.setState({ products: result.data });
        })
        .catch((error) => {
          console.log("error");
        });
    }
  }
  render() {
    return (
      <div style={{ maxWidth: "600px" }}>
        <h2 className="mt-5 mb-5 text-center">Your shopping cart:</h2>
        {this.state.products ? (
          this.state.products.map((item, index) => (
            <CartItem
              key={item.id}
              id={item.id}
              product_name={item.product_name}
              shortDescription={item.shortDescription}
              longDescription={item.longDescription}
              photo={item.photo}
              price={item.price}
              quantity={item.quantity}
              rating={item.rating}
              rating_count={item.rating_count}
              // rerenderParentCallback={this.rerenderParentCallback}
            />
          ))
        ) : (
          <h3 className="text-center text-danger">Your cart is empty.</h3>
        )}
      </div>
    );
  }
}

export default Cart;
