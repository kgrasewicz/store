import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import FetchProductImg from "../../Components/Shop/FetchProductImg";
import $ from "jquery";
import Promocode from "../../Components/Shop/Promocode";
import { values } from "lodash";
import session from "express-session";

class Cart extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      discount: null,
      path: "/shop/cart/login"
    };

    this.props = props;
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.fetchData();
    this.handlePromocode("")
    

  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.cart !== this.state.cart) {
      console.log(prevState.cart);
      console.log(this.state.cart);
      this._isMounted = true;
      this.fetchData();
      this.sendGetRequest()
      this._isMounted = false;
    }
  };

  sendGetRequest = () => {
    this._isMounted = true;
    axios
      .get("/api/users/getUser", {withCredentials: true})
      .then((response) => {
        if (response.data == "") {
          this.setState({path: "/shop/cart/login"})
        } else {
          this.setState({path: "/shop/cart/checkout/1"})
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchData = () => {
    axios
      .get("/.netlify/functions/server/cart")
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            cart: response.data,
          });

          $(".items-counter").text(response.data.itemsTotal);

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  emptyCart = () => {
    this._isMounted = true;

    axios
      .delete("/.netlify/functions/server/cart/empty-cart")
      .then((response) => {
        if (response.data != null && response.data < 1) {
          response.data = response.data;
        } else {
          response.data = false;
        }

        this.setState({
          cart: response.data,
        });

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("empty clicked");
  };

  alterItemQuantity = (productId, size, quantity) => {
    this._isMounted = true;

    axios
      .post("/.netlify/functions/server/cart", {
        productId: productId,
        size: size,
        quantity: quantity,
      })
      .then(
        (response) => {
          console.log(response);
          this.fetchData();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  handleQuantityChange = (productId, size, quantity, currentQuantity) => {
    const alteredQuantity =
      currentQuantity === 1 && quantity === -1 ? 0 : quantity;

    this.alterItemQuantity(productId, size, alteredQuantity);
  };

  handlePromocode = (errorDisplay) => {

    if (!sessionStorage.code && document.querySelector(".cart-container__table__code input") && errorDisplay === "active") {
      sessionStorage.setItem("code", document.querySelector(".cart-container__table__code input").value)
      

    }

    if (sessionStorage.code) {
      document.querySelector(".cart-container__table__code input").disabled = true;
      document.querySelector(".cart-container__table__code input").value = sessionStorage.code
      $(".cart-container__table__code").addClass("active")
    }

    
    let code = sessionStorage.code
    

    axios
      .get("/.netlify/functions/server/coupons/" + code)
      .then((response) => {
        console.log(this.state.cart.items.length)
        for (var i = 0; i < this.state.cart.items.length; i++) {
          if (
            response.data[0].products == "*" ||
            response.data[0].products.findIndex(
              (x) => (x = this.state.cart.items[i].model)
            ) > -1
          ) {

            this._isMounted = true;
            axios
              .post("/.netlify/functions/server/cart", {
                productId: this.state.cart.items[i].productId,
                size: this.state.cart.items[i].size,
                quantity: -2,
                discount: response.data[0].discount_percent == null ? response.data[0].discount_abs : response.data[0].discount_percent*this.state.cart.items[i].price/100
              })
              .then(
                (response) => {
                  console.log(response);
                  this.fetchData();

                  
                    $(".cart-container__table__code").addClass(errorDisplay)
                  
                },
                (error) => {
                  console.log(error);
                }
              );
          }
        }
        
        
        
        
        $(".cart-container__table__code__error").removeClass(errorDisplay)

      })
      .catch((error) => {
        $(".cart-container__table__code__error").addClass(errorDisplay)
        sessionStorage.removeItem("code")
        document.querySelector(".cart-container__table__code input").disabled = false;
        $(".cart-container__table__code").removeClass(errorDisplay)
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
          <li
            className="cart-container__table__products__item"
            key={item.productId + item.size}
          >
            <NavLink to={"/shop/" + item.category + "/" + item.productId}>
              <FetchProductImg className={item.model} link={item.model} />
              <div className="cart-container__table__products__item__info">
                <h2 className="cart__name">{item.productName}</h2>
                <h3 className="cart__model">Model: {item.model}</h3>
                <h3 className="cart__size">Size: {item.size}</h3>
              </div>
            </NavLink>
            <div className="cart__quantityHandler">
              <button
                className="cart__quantityHandler__add"
                onClick={() =>
                  this.handleQuantityChange(
                    item.productId,
                    item.size,
                    1,
                    item.quantity
                  )
                }
              >
                <h4>+</h4>
              </button>
              <h2 type="text" className="cart__qty">
                {item.quantity}
              </h2>
              <button
                className="cart__quantityHandler__deduct"
                onClick={() =>
                  this.handleQuantityChange(
                    item.productId,
                    item.size,
                    -1,
                    item.quantity
                  )
                }
              >
                <h4>-</h4>
              </button>
            </div>
            <h4 className="cart__total">{item.price} PLN</h4>
            <button
              className="cart__exit"
              onClick={() =>
                this.alterItemQuantity(item.productId, item.size, 0)
              }
            >
              <h2>⨉</h2>
            </button>
            <div className="cart-container__table__products__item__line"></div>
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

    return (
      <div className="cart-container">
        <div className="cart-container__tooltip">
          <h1>cart</h1>
          <ul className="cart-container__tooltip__icons">
            <li className="active">
              <svg
                version="1.1"
                className="cart__icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512;"
              >
                <path
                  d="M151.1,332.1L151.1,332.1C151.1,332.1,151.2,332.1,151.1,332.1l249.2,0c6.1,0,11.5-4.1,13.2-10l55-192.4
	c1.2-4.1,0.4-8.6-2.2-12c-2.6-3.4-6.7-5.5-11-5.5H119.4L109.6,68c-1.4-6.3-7-10.8-13.4-10.8H13.7C6.2,57.3,0,63.4,0,71
	s6.2,13.7,13.7,13.7h71.4c1.7,7.8,47,211.5,49.6,223.2c-14.6,6.3-24.8,20.9-24.8,37.8c0,22.7,18.5,41.2,41.2,41.2h249.2
	c7.6,0,13.7-6.2,13.7-13.7c0-7.6-6.2-13.7-13.7-13.7H151.1c-7.6,0-13.7-6.2-13.7-13.7C137.4,338.2,143.5,332.1,151.1,332.1z
	 M437,139.7l-47.1,164.9H162.2l-36.6-164.9H437z"
                />
                <path
                  d="M137.4,428.2c0,22.7,18.5,41.2,41.2,41.2s41.2-18.5,41.2-41.2S201.4,387,178.6,387S137.4,405.5,137.4,428.2z M178.6,414.5
	c7.6,0,13.7,6.2,13.7,13.7c0,7.6-6.2,13.7-13.7,13.7c-7.6,0-13.7-6.2-13.7-13.7C164.9,420.7,171,414.5,178.6,414.5z"
                />
                <path
                  d="M331.6,428.2c0,22.7,18.5,41.2,41.2,41.2c22.7,0,41.2-18.5,41.2-41.2S395.5,387,372.8,387
	C350.1,387,331.6,405.5,331.6,428.2z M372.8,414.5c7.6,0,13.7,6.2,13.7,13.7c0,7.6-6.2,13.7-13.7,13.7c-7.6,0-13.7-6.2-13.7-13.7
	C359.1,420.7,365.2,414.5,372.8,414.5z"
                />
              </svg>
            </li>
            <li>
              <svg
                version="1.1"
                className="cart__icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512;"
              >
                <g>
                  <path
                    d="M256,4.3c-97.6,0-177,79.4-177,177c0,33,9.1,65.2,26.4,93.1l140.5,226.4c2.7,4.3,7.4,7,12.5,7c0,0,0.1,0,0.1,0
				c5.1,0,9.9-2.8,12.5-7.2L408,271.9c16.3-27.3,25-58.7,25-90.7C433,83.7,353.6,4.3,256,4.3z M382.7,256.8L258.2,464.6L130.5,258.8
				c-14.4-23.2-22.2-50-22.2-77.5c0-81.3,66.4-147.7,147.7-147.7s147.6,66.4,147.6,147.7C403.6,207.9,396.3,234.1,382.7,256.8z"
                  />
                </g>

                <g>
                  <path
                    d="M256,92.8c-48.8,0-88.5,39.7-88.5,88.5c0,48.5,39.1,88.5,88.5,88.5c50.1,0,88.5-40.5,88.5-88.5
				C344.5,132.5,304.8,92.8,256,92.8z M256,240.5c-32.7,0-59.2-26.6-59.2-59.2c0-32.5,26.7-59.2,59.2-59.2s59.1,26.7,59.1,59.2
				C315.1,213.4,289.2,240.5,256,240.5z"
                  />
                </g>
              </svg>
            </li>
            <li>
              <svg
                version="1.1"
                className="cart__icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512;"
              >
                <path
                  d="M507.8,284.6C507.8,284.6,507.8,284.6,507.8,284.6L412.4,45.2c-2-5.1-7.8-7.6-12.9-5.5c0,0,0,0,0,0l-386.8,154
				c-1.6,0.7-2.9,1.8-4,3.2c-3.2,1.7-5.2,5-5.3,8.6v257.7c0,5.5,4.4,9.9,9.9,9.9h416.4c5.5,0,9.9-4.4,9.9-9.9V322.4l62.6-24.9
				C507.3,295.4,509.8,289.7,507.8,284.6z M419.9,453.2H23.3V215.3h396.5V453.2z M168.9,195.6l166-66.1
				c14.8,15.6,35.3,24.4,56.8,24.5l16.6,41.6H168.9z M439.7,301.1v-95.7c0-5.5-4.4-9.9-9.9-9.9h-0.2l-21-52.8
				c-0.2-0.4-0.5-0.9-0.8-1.2c-1.1-4.8-5.5-8-10.4-7.6c-20,1.8-39.6-6.6-52-22.4c-3.1-3.8-8.5-4.8-12.7-2.2
				c-0.5,0.1-0.9,0.1-1.4,0.3l-202.6,80.7c-2.5,1-4.4,2.9-5.4,5.3H61.7l336-133.8l88,221L439.7,301.1z"
                />
                <path
                  d="M50.2,386.3c19.2,5.7,34.3,20.7,40,40c1.3,4.2,5.1,7.1,9.5,7.1c0.5,0,1-0.1,1.5-0.2c0.4,0.1,0.9,0.2,1.4,0.3h237.9
				c0.4-0.1,0.8-0.1,1.2-0.2c5,1.2,9.9-1.8,11.1-6.8c0,0,0,0,0-0.1c5.7-19.3,20.8-34.3,40-40c4.7-1.4,7.6-6.1,6.8-10.9
				c0.1-0.5,0.2-1,0.3-1.5v-79.3c-0.1-0.5-0.2-1-0.3-1.5c0.8-4.8-2.1-9.5-6.8-10.9c-19.3-5.7-34.3-20.8-40-40
				c-1.4-4.7-6.1-7.6-11-6.8c-0.5-0.1-0.9-0.2-1.4-0.3H102.6c-0.5,0.1-1,0.2-1.5,0.3c-4.8-0.8-9.5,2.1-10.9,6.8
				c-5.7,19.3-20.8,34.3-40,40c-4.7,1.4-7.6,6.1-6.8,10.9c-0.1,0.5-0.2,1-0.3,1.5v79.3c0.1,0.5,0.1,0.9,0.3,1.4
				C42.6,380.2,45.5,384.9,50.2,386.3z M63,298.7c19.9-8,35.7-23.8,43.7-43.7h229.9c8,19.9,23.8,35.7,43.7,43.7v71.3
				c-19.9,8-35.7,23.8-43.7,43.7H106.7c-8-19.9-23.8-35.7-43.7-43.7V298.7z"
                />
                <path
                  d="M221.6,393.8c32.9,0,59.5-26.6,59.5-59.5s-26.6-59.5-59.5-59.5s-59.5,26.6-59.5,59.5
				C162.1,367.1,188.8,393.7,221.6,393.8z M221.6,294.6c21.9,0,39.7,17.8,39.7,39.7c0,21.9-17.8,39.7-39.7,39.7
				s-39.7-17.8-39.7-39.7C181.9,312.4,199.7,294.6,221.6,294.6z"
                />
                <path
                  d="M112.5,349.2c8.2,0,14.9-6.7,14.9-14.9s-6.7-14.9-14.9-14.9s-14.9,6.7-14.9,14.9C97.7,342.5,104.3,349.2,112.5,349.2z
				 M112.5,329.3c2.7,0,5,2.2,5,5c0,2.7-2.2,5-5,5c-2.7,0-5-2.2-5-5C107.6,331.6,109.8,329.3,112.5,329.3z"
                />
                <path
                  d="M330.6,349.2c8.2,0,14.9-6.7,14.9-14.9s-6.7-14.9-14.9-14.9s-14.9,6.7-14.9,14.9C315.8,342.5,322.4,349.2,330.6,349.2z
				 M330.6,329.3c2.7,0,5,2.2,5,5c0,2.7-2.2,5-5,5s-5-2.2-5-5C325.7,331.6,327.9,329.3,330.6,329.3z"
                />
              </svg>
            </li>
          </ul>
        </div>

        <div className="cart-container__table">
          <ul className="cart-container__table__legend">
            <li className="cart-container__table__legend__item">
              <h3>Item</h3>
            </li>
            <li className="cart-container__table__legend__quantity">
              <h3>Quantity</h3>
            </li>
            <li className="cart-container__table__legend__subtotal">
              <h3>Price</h3>
            </li>
          </ul>
          <ul className="cart-container__table__products">{<CartMapping />}</ul>

          <div className="cart-container__table__summary">
            <h4 className="cart-container__table__summary__title">Summary</h4>

            <div className="cart-container__table__subtotal">
              <h3 className="cart-container__table__subtotal__title">
                Subtotal
              </h3>

              <h3 className="cart-container__table__subtotal__value">
                {this.state.cart.subTotal || 0} PLN
              </h3>
            </div>

            <div className={"cart-container__table__discount " + ((this.state.cart.discountTotal === 0 || !this.state.cart) ? "empty" : "")}>
              <h3 className="cart-container__table__discount__title">
                Discount
              </h3>
              <h3 className="cart-container__table__discount__value ">
              {!this.state.cart ? 0 : this.state.cart.discountTotal} PLN
              </h3>
              
            </div>
            <Promocode codeHandler={() => this.handlePromocode("active")} />
            <div className="cart-container__table__total">
              <h2 className="cart-container__table__total__title">Total</h2>
              <h2 className="cart-container__table__total__items">
                {this.state.cart.itemsTotal || 0}{" "}
                {this.state.cart.itemsTotal == 1 ? "item" : "items"}
              </h2>
              <h4 className="cart-container__table__total__value">
                {this.state.cart.subTotal + this.state.cart.discountTotal || 0} PLN
              </h4>
            </div>
            <div className="cart-container__table__buttons">
              <button className="cart-container__table__buttons__continue-shopping">
                <NavLink to="/shop/all">Continue shopping</NavLink>
              </button>
              <NavLink to={this.state.path}>
              <button className="cart-container__table__buttons__checkout">
                Proceed to checkout 
              </button></NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
