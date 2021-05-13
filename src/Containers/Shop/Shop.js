import React, { Component } from "react";
import BottomInfo from "../../Components/BottomInfo/BottomInfo";
import TopTooltip from "../../Components/Shop/TopTooltip";
import { Switch, Route } from "react-router-dom";
import ProductList from "../../Components/Shop/ProductList";
import ProductItem from "../../Components/Shop/ProductItem";
import Cart from "./Cart";
import CartLogin from "../../Components/Shop/CartLogin";
import Login from "../../Components/Shop/Login";
import Checkout from "../../Components/Shop/Checkout";
import Confirmation from "../../Components/Shop/Confirmation";
import Profile from "../../Components/Shop/Profile";
import axios from "axios";
import $ from "jquery";
import {BrowserRouter} from 'react-router-dom';


class Shop extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      id: null,
      isSignedIn: false
    };
  }

  componentDidMount = () => {
    this.sendGetRequest()
  }

  sendGetRequest = () => {
    
    axios
      .get("/.netlify/functions/server/users/getUser", { withCredentials: true })
      .then((response) => {

        console.log(response)
        if (response.data == "") {
          this.setState({isSignedIn: false})
        } else {

          this.setState({isSignedIn: true})
          $('.checkout__form__name input[name="fname"]').val(
            response.data.fname
          );
          $('.checkout__form__surname input[name="lname"]').val(
            response.data.lname
          );
          $('.checkout__form__email input[name="email"]').val(
            response.data.username
          );
  
          $('.checkout__form__name input[name="fname"]').prop( "disabled", true )
          $('.checkout__form__surname input[name="lname"]').prop( "disabled", true )
          $('.checkout__form__email input[name="email"]').prop( "disabled", true )
        }

      })
      .catch((error) => {
        console.log(error);
      });

  };

  render() {
    return (
      <div className="shop">
        <TopTooltip
        isSignedIn={this.state.isSignedIn}
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
            path="/shop/profile"
            render={(props) => <Profile {...props} />}
          />

        <Route
            path="/shop/login"
            render={(props) => <Login {...props} />}
          />

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
