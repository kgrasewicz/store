import React, { Component } from "react";
import axios from "axios";
import FetchProductImg from "./FetchProductImg";
import Aux from "react-aux";
import {withRouter} from "react-router-dom";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      path: ""
      
    };

    this.props = props;
  }

  componentDidMount = () => {
    const category = this.props.match.params.category;
    this.fetchData(category);
  };

  componentDidUpdate = (prevProps, prevState) => {
      this.fetchData(this.props.match.params.category)
  }
  


  fetchData = (category) => {
    axios
      .get("/api/products")
      .then((response) => {

        console.log(response.data);
        console.log(this.props.match.params.category);
        this.setState({
          products: response.data.filter((filteredProduct) => {
            return (
              filteredProduct.category ===
              (category === "all"
                ? filteredProduct.category
                : category)
            );
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    
    const products = this.state.products.map((product) => (
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
      <Aux>
        <div className="products-container">
          <div className="products-container__tooltip">
            <h4>collection</h4>
          </div>
          <div className="products-container__list">{products}</div>
        </div>
      </Aux>
    );
  }
}

export default withRouter(ProductList);
