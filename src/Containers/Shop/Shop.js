import React, { Component } from "react";
import BottomInfo from "../../Components/BottomInfo/BottomInfo";
import TopTooltip from "../../Components/Shop/TopTooltip";
import { Switch, Route } from "react-router-dom";
import ProductList from "../../Components/Shop/ProductList";
import ProductItem from "../../Components/Shop/ProductItem";
import Cart from "./Cart"

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
        <TopTooltip />

        <BottomInfo />


        {this.props.children}

        <Switch>
          <Route
          path="/shop/cart"
          render={(props) => <Cart {...props} />}
          />
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
