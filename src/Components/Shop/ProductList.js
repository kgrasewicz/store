import React, { Component } from "react";
import axios from "axios";
import FetchProductImg from "./FetchProductImg";

class ProductList extends Component {
  constructor(state) {
    super(state);
    this.state = {
      products: [],
    };
  }

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    axios
      .get("/api/products")
      .then((response) => {
        console.log(response.data);
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    var filteredProducts = this.state.products.filter(function (
      filteredProduct
    ) {
      function categoryFilterHelper() {
        if (window.location.pathname.split("/").pop() !== "all") {
          return window.location.pathname.split("/").pop();
        } else {
          return filteredProduct.category;
        }
      }

      console.log(categoryFilterHelper());

      return filteredProduct.category == categoryFilterHelper();
    });

    const products = filteredProducts.map((product) => (
      <div className="products-container__list__product" key={product._id}>
        <FetchProductImg
          className={product.product_id}
          link={product.product_id}
        />
        <div className="products-container__list__product__label">
          <h2>{product.product_name}</h2>
          <h3>{product.price} PLN</h3>
        </div>
      </div>
    ));

    return (
      <div className="products-container">
        <div className="products-container__tooltip">
          <h4>collection</h4>
        </div>
        <div className="products-container__list">{products}</div>
      </div>
    );
  }
}

export default ProductList;
