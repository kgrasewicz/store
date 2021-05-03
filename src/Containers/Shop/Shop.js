import React, { Component } from "react";
import BottomInfo from "../../Components/BottomInfo/BottomInfo";
import TopTooltip from "../../Components/Shop/TopTooltip";
import { Switch, Route } from "react-router-dom";
import ProductList from "../../Components/Shop/ProductList";
import ProductItem from "../../Components/Shop/ProductItem";
import Cart from "./Cart";
import CartLogin from "../../Components/Shop/CartLogin";
import Checkout from "../../Components/Shop/Checkout";
import Confirmation from "../../Components/Shop/Confirmation"

class Shop extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      id: null,
    };
  }

  render() {
    return (
      <div className="shop">
        <TopTooltip
          clickHandler={() =>
            (document.querySelector(".search-container__input").value = "")
          }
        />

        <BottomInfo />

        <h4 className="search-no-results">
          Unfortunately, we could not find any product matching your request.
        </h4>

        <div className="search-loader-container">
          <div className="search-loader">Loading...</div>
        </div>

        {this.props.children}

        <Switch>
          <Route
            path="/shop/cart/login"
            render={(props) => <CartLogin {...props} />}
          />
          <Route
            path="/shop/cart/checkout/:step"
            render={(props) => <Checkout {...props} />}
          />

          <Route
            path="/shop/cart/confirmation"
            render={(props) => <Confirmation {...props} />}
          />

          <Route path="/shop/cart" render={(props) => <Cart {...props} />} />

          <Route
            path="/shop/:category/:id"
            render={(props) => <ProductItem {...props} />}
          />
          <Route
            path="/shop/:category"
            render={(props) => <ProductList {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Shop;
