import React, { Component } from "react";
import axios from "axios";
import { withRouter, NavLink } from "react-router-dom";
import $ from "jquery";
import InputForm from "./InputForm";



class Checkout extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      step: this.props.match.params.step,
      checked: "",
    };

    this.props = props;
  }

  componentDidMount = () => {    
    this.fetchData();
    this.sendGetRequest();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.match.params.step !== this.props.match.params.step) {
      console.log("adfasf");
      this._isMounted = true;      
      setTimeout(() => {
        this.fetchData();
        this.sendGetRequest();
        this.setState({ step: this.props.match.params.step });
      },100)
      
      
    }

  };

  sendGetRequest = () => {
    this._isMounted = true;
    axios
      .get("/api/users/getUser", {withCredentials: true})
      .then((response) => {
        console.log(response);
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

      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchData = () => {

    axios
      .get("/api/cart")
      .then((response) => {
        if (this._isMounted) {
          this.setState(
            {
              cart: response.data,
            },
            this.autocompletePast.bind(this)
          );
          this._isMounted = false
          $(".items-counter").text(response.data.itemsTotal);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  autocompletePast = () => {
    if (this.state.cart.personalData !== undefined) {
      console.log(this.state.cart.personalData.firstName);
      $('.checkout__form__name input[name="fname"]').val(
        this.state.cart.personalData.firstName
      );
      $('.checkout__form__surname input[name="lname"]').val(
        this.state.cart.personalData.lastName
      );
      $('.checkout__form__email input[name="email"]').val(
        this.state.cart.personalData.email
      );
      $('.checkout__form__phone input[name="phone"]').val(
        this.state.cart.personalData.phone
      );
      $('.checkout__form__country input[name="country"]').val(
        this.state.cart.personalData.country
      );
      $('.checkout__form__code input[name="postal-code"]').val(
        this.state.cart.personalData.postalCode
      );
      $('.checkout__form__city input[name="address-level2"]').val(
        this.state.cart.personalData.city
      );
      $('.checkout__form__address-line1 input[name="address-line1"]').val(
        this.state.cart.personalData.addressLine1
      );
      $('.checkout__form__address-line2 input[name="address-line2"]').val(
        this.state.cart.personalData.addressLine2
      );
    }

    if (this.state.cart.shippingDetails !== undefined && this.state.step == "2") { 
      document.querySelector(`input[value="${this.state.cart.shippingDetails.method}"`).click()
      if (this.state.cart.shippingDetails.method !== "Parcel Locker InPost")  {
        for (var i = 0; i < this.state.cart.shippingDetails.address.split(",").length; i++) { 
          document.querySelectorAll(".else input")[i].value = this.state.cart.shippingDetails.address.split(",")[i]
        }
      } else {
        for (var i = 0; i < this.state.cart.shippingDetails.address.split(",").length; i++) { 

          document.querySelectorAll(".inpost input")[i].value = this.state.cart.shippingDetails.address.split(",")[i]
        }
      }
      
    }
  };

  handleShipAddressToggle = () => {
    if ($(".switch input").is(":checked")) {
      $('.checkout__form__shipping__country input[name="country"]').val(
        this.state.cart.personalData.country
      );
      $('.checkout__form__shipping__code input[name="postal-code"]').val(
        this.state.cart.personalData.postalCode
      );
      $('.checkout__form__shipping__city input[name="address-level2"]').val(
        this.state.cart.personalData.city
      );
      $(
        '.checkout__form__shipping__address-line1 input[name="address-line1"]'
      ).val(this.state.cart.personalData.addressLine1);
      $(
        '.checkout__form__shipping__address-line2 input[name="address-line2"]'
      ).val(this.state.cart.personalData.addressLine2);
    } else {
      $('.checkout__form__shipping__country input[name="country"]').val("");
      $('.checkout__form__shipping__code input[name="postal-code"]').val("");
      $('.checkout__form__shipping__city input[name="address-level2"]').val("");
      $(
        '.checkout__form__shipping__address-line1 input[name="address-line1"]'
      ).val("");
      $(
        '.checkout__form__shipping__address-line2 input[name="address-line2"]'
      ).val("");
    }
  };

  postPersonalData = () => {
    axios
      .post("/api/cart/post-personal-data", {
        id: this.state.cart._id,
        firstName: $('input[name="fname"]').val(),
        lastName: $('input[name="lname"]').val(),
        email: $('input[name="email"]').val(),
        phone: $('input[name="phone"]').val(),
        country: $('input[name="country"]').val(),
        postalCode: $('input[name="postal-code"]').val(),
        city: $('input[name="address-level2"]').val(),
        addressLine1: $('input[name="address-line1"]').val(),
        addressLine2: $('input[name="address-line2"]').val(),
      })
      .then((response) => {
        console.log(response.data);
        console.log(this.state.cart._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  postShippingData = () => {
    let elseInputs = [];
    let inpostInputs = [];

      for (var i = 1; i < document.querySelectorAll(".else input").length; i++) { 
        elseInputs.push(document.querySelectorAll(".else input")[i].value)
      }

      for (var i = 0; i < document.querySelectorAll(".inpost input").length; i++) { 
      inpostInputs.push(document.querySelectorAll(".inpost input")[i].value)
      }

    axios
      .post("/api/cart/post-shipping-data", {
        id: this.state.cart._id,
        method: $("input[name='delivery']:checked").val(),
        address:
          document.querySelector('input[value="Parcel Locker InPost"]')
            .checked == true
            ? inpostInputs.join(", ")
            : elseInputs.join(", "),
        price: $("input[name='delivery']:checked").parent().next().next().text().slice(0, $("input[name='delivery']:checked").parent().next().next().text().length - 4),
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  finalizePurchase = () => {
    this.postPaymentData()
    sessionStorage.clear()
    
  }

  emptyCart = () => {
    this._isMounted = true;

    axios
      .delete("/api/cart/empty-cart")
      .then((response) => {
        if (response.data != null && response.data < 1) {
          response.data = response.data;
        } else {
          response.data = false;
        }

        this.setState({
          cart: response.data,
        });
        $(".items-counter").text(response.data.itemsTotal);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("empty clicked");
  };

  postPaymentData = () => {
    axios
      .post("/api/cart/post-payment-data", {
        id: this.state.cart._id,
        method: $("input[name='payment']:checked").val(),
      })
      .then((response) => {
        console.log(response.data);
        this.postCart()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  postCart = () => {
    axios
      .post("/api/cart/post-cart-db")
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            cart: response.data,
          }, $(".items-counter").text(response.data.itemsTotal));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const CartMapping = () => {
      let cart = {};

      if (this.state.cart != null && this.state.cart.length < 1) {
        this.state.cart = false;
      }

      if (this.state.cart) {
        cart = this.state.cart.items.map((item) => (
          <li key={item.productId + item.size}>
            <div className="cart__info">
              <h2 className="cart__info__name">{item.productName}</h2>
              <h3 className="cart__info__desc">
                Model: {item.model}, Size: {item.size}
              </h3>
            </div>

            <h2 className="cart__items">
              {item.quantity > 1
                ? item.quantity + " items"
                : item.quantity + " item"}
            </h2>

            <h2 className="cart__total">{item.price} PLN</h2>
            <div className="cart__line"></div>
          </li>
        ));
      } else {
        cart = (
          <li className="cart-container__table__products__item__line__empty">
            The cart is empty
          </li>
        );
      }

      return cart;
    };

    const RenderInputInfo = (props) => {
      if (this.state.cart != null && this.state.cart.length < 1) {
        this.state.cart = false;
      }

      if (this.state.cart) {
        if (props.inputSection == "1") {

          if (this.state.cart.personalData) {

          return (
            <div className="past">
              <NavLink className="checkout__edit" to="/shop/cart/checkout/1">
                <h3>Edit</h3>
              </NavLink>
              <h3>
                {this.state.cart.personalData.firstName +
                  " " +
                  this.state.cart.personalData.lastName}{" "}
              </h3>
              <h3>Email: {this.state.cart.personalData.email}</h3>
              <h3>Phone: {this.state.cart.personalData.phone}</h3>
              <h3>
                Address:{" "}
                {this.state.cart.personalData.city +
                  " " +
                  this.state.cart.personalData.postalCode +
                  ", " +
                  this.state.cart.personalData.addressLine1 +
                  " " +
                  this.state.cart.personalData.addressLine2 +
                  ", " +
                  this.state.cart.personalData.country}
              </h3>
            </div>
          );
        } else {return <div></div>}
        } else if (props.inputSection == "2") {
          if (this.state.cart.shippingDetails) {
          return (
            <div className="past">
              <NavLink className="checkout__edit" to="/shop/cart/checkout/2">
                <h3>Edit</h3>
              </NavLink>
              <h3>Method: {this.state.cart.shippingDetails.method}</h3>
              <h3>Address: {this.state.cart.shippingDetails.address}</h3>
              <h3>Price: {this.state.cart.shippingDetails.price} PLN</h3>
            </div>
          );
          } else {return <div></div>}
        } else {
          return <div>{this.state.cart.personalData.firstName}</div>;
        }
      } else {
        return (
          <li className="cart-container__table__products__item__line__empty">
            The cart is empty
          </li>
        );
      }
    };

    const InputSection = (props) => {
      if (this.state.step == props.inputSection) {
        return (
          <InputForm
            status={this.state.loginStatus}
            section={"checkout/" + this.state.step}
            handler={props.handler}
            shipAddressHandler={this.handleShipAddressToggle}
          >
            {" "}
          </InputForm>
        );
      } else if (this.state.step < props.inputSection) {
        return <div></div>;
      } else {
         return <RenderInputInfo inputSection={props.inputSection} />;
      }
    };

    return (
      <div className="checkout">
        <div className="checkout__form">
          <h1 className="checkout__form__title">checkout</h1>

          <div
            className={
              "checkout__form__personal-data " +
              (this.state.step == "1" ? "active" : "")
            }
          >
            <div className="checkout__form__personal-data__tooltip">
              <h4 className="checkout__form__personal-data__title">
                1. Personal data
              </h4>
            </div>
            <div className="checkout__form__personal-data__content">
              {
                <InputSection
                  handler={this.postPersonalData}
                  inputSection="1"
                />
              }
            </div>
          </div>

          <div
            className={
              "checkout__form__delivery " +
              (this.state.step == "2" ? "active" : "")
            }
          >
            <div className="checkout__form__delivery__tooltip">
              <h4 className="checkout__form__delivery__title">
                2. Shipping details
              </h4>
            </div>
            <div className="checkout__form__delivery__content">
              {
                <InputSection
                  handler={this.postShippingData}
                  inputSection="2"
                />
              }
            </div>
          </div>

          <div
            className={
              "checkout__form__payment " +
              (this.state.step == "3" ? "active" : "")
            }
          >
            <div className="checkout__form__payment__tooltip">
              <h4 className="checkout__form__payment__title">
                3. Payment method
              </h4>
            </div>
            <div className="checkout__form__payment__content">
              {
                <InputSection
                  handler={this.finalizePurchase}
                  inputSection="3"
                />
              }
            </div>
          </div>
        </div>
        <div className="checkout__summary">
          <h4 className="checkout__summary__title">Items</h4>
          <ul className="checkout__summary__list">{<CartMapping />}</ul>
          <div className="checkout__summary__shipping">
            <h2 className="checkout__summary__shipping__title">{this.state.cart.shippingDetails ? "Shipping" : ""}</h2>

            <h2 className="checkout__summary__shipping__value">
              {this.state.cart.shippingDetails ? this.state.cart.shippingDetails.price : ""}{" "}
              PLN
            </h2>
          </div>
          <div className="checkout__summary__total">
            <h2 className="checkout__summary__total__title">Total</h2>
            <h2 className="checkout__summary__total__items">
              {this.state.cart.itemsTotal || 0}{" "}
              {this.state.cart.itemsTotal == 1 ? "item" : "items"}
            </h2>
            <h4 className="checkout__summary__total__value">
              {+this.state.cart.subTotal + (this.state.cart.discountTotal || 0) + +(this.state.cart.shippingDetails ? this.state.cart.shippingDetails.price : 0)}{" "}
              PLN
            </h4>
          </div>
          <NavLink className="checkout__summary__edit" to="shop/cart">
            <h3>Edit cart</h3>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(Checkout);
