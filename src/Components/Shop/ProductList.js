import React, { Component } from "react";
import axios from "axios";
import FetchProductImg from "./FetchProductImg";
import { BrowserRouter, withRouter} from "react-router-dom";
import { useLocation, Switch } from 'react-router-dom'; 
import Aux from "react-aux";
import TopTooltip from "./TopTooltip";

class ProductList extends Component {

  constructor(props) {

    super(props)
    this.state = {
      products: [],
      filteredProducts: []
    };

    this.props = props;

    
  
  }

  componentDidMount = () => {
    
    this.fetchData();
 
    
  };
 

  fetchData = () => {

    axios
      .get("/api/products", )
      .then((response) => {
        console.log(response.data);
        this.setState({ products: response.data.filter( (filteredProduct)  => { return filteredProduct.category === ((this.props.match.params.category) === "all" ? filteredProduct.category : this.props.match.params.category) }) });

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
      <TopTooltip />

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
