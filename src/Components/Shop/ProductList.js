import React, { Component } from "react";
import axios from "axios";
import FetchProductImg from "./FetchProductImg";
import Aux from "react-aux";
import {NavLink, withRouter} from "react-router-dom";
import TopImg from "./topImg.png";

class ProductList extends Component {

  _isMounted = false;

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

    this._isMounted = true;
    const category = this.props.match.params.category;
    this.fetchData(category);
    
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this._isMounted) {
      this.fetchData(this.props.match.params.category)
    }
    this._isMounted = false;
  }
  


  fetchData = (category) => {
    axios
      .get("/api/products")
      .then((response) => {
        if (this._isMounted) {
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
        localStorage.setItem('products',JSON.stringify(this.state.products))
        console.log(localStorage)
      }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    
    const products = this.state.products.map((product) => (
      <NavLink to={this.props.location.pathname + "/" + product._id}  className={"products-container__list__product "  + ((+product.stock.reduce((a, b) => a + (b['quantity'] || 0), 0) === 0) ? "unavailable" : "available")} key={product._id}>
        <FetchProductImg
          className={product.product_id}
          link={product.product_id}
        />
        <div className={"products-container__list__product__sizes"}>
          <h2>Unavailable</h2>
        </div>
        <div className="products-container__list__product__label">
          <h2>{product.product_name}</h2>
          <h3>{product.price} PLN</h3>
        </div>
      </NavLink>
    ));

    return (
      <Aux>

        <img className="shop__topImg" src={TopImg} alt="graphics"/>

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
