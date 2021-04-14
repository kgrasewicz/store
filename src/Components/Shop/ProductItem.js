import React, { Component } from "react";
import axios from "axios";
import FetchProductImg from "./FetchProductImg";
import { withRouter, NavLink } from "react-router-dom";
import $ from "jquery";
import Aux from "react-aux";
import PopUp from "./Popup";
import InputForm from "./InputForm";
import _ from "lodash";

class ProductItem extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      product: [],
      stock: [],
    };

    this.props = props;
  }

  componentDidMount = () => {
    this._isMounted = true;
    const id = this.props.match.params.id;
    this.fetchItem(id);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this._isMounted = true;
      this.fetchItem(this.props.match.params.id);
    }
  };

  fetchItem = (id) => {
    axios
      .get("/api/products/" + id)
      .then((response) => {
        if (this._isMounted) {
          console.log(response);
          this.setState({
            product: response.data,
          });
          this.setState({
            stock: this.state.product.stock,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  SizePickerHandler = () => {
    $(".product-item-container__info__size-picker__arrow").toggleClass(
      "active"
    );
    $(".product-item-container__info__size-picker__list").toggleClass("active");
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleNotifyClick(event) {
    if (
      $(event.target).is("h2.notify") ||
      $(event.target).is(".notify#pop__svg")
    ) {
      $(".notify").toggleClass("active");
      $(".product-item-container__info__size-picker__arrow").toggleClass(
        "active"
      );
      $(".product-item-container__info__size-picker__list").toggleClass(
        "active"
      );
    }

    if ($(event.target).hasClass("value")) {
      $(".product-item-container__info__size-picker__default").text(
        $(event.target).text()
      );

      sessionStorage.setItem(
        "chosenSize",
        $(".product-item-container__info__size-picker__default").text()
      );

      $(".product-item-container__info__size-picker__arrow").toggleClass(
        "active"
      );
      $(".product-item-container__info__size-picker__list").toggleClass(
        "active"
      );
    }
  }

  handleCartClick = (event) => {
    if ($(event.target).is(".pop-cart-continue#pop__svg")) {
      $(".pop-cart-continue").toggleClass("active");
      console.log("akdjfhsdk");
    }
  };

  addToCart = () => {
    axios
      .post("/api/cart", {
        productId: this.state.product._id,
        productName: this.state.product.product_name,
        model: this.state.product.product_id,
        category: this.state.product.category,
        size:
          this.state.stock.length === 1
            ? "One size"
            : sessionStorage.getItem("chosenSize"),
        price: this.state.product.price,
        quantity: 1,
      })
      .then(
        (response) => {
          console.log(response);

          axios
            .get("/api/cart")
            .then((response) => {
              $(".items-counter").text(response.data.itemsTotal);

              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  cartHandler = (event) => {
    this.addToCart();

    $(".pop-cart-continue").toggleClass("active");
  };

  postNotify(event) {
    $(".pop__content__button__svg__tick").toggleClass("active");
    $(".pop__content__button__svg__arrow").toggleClass("active");

    setTimeout(() => {
      $(".notify").toggleClass("active");
      $(".pop__content__button__svg__arrow").toggleClass("active");
      $(".pop__content__button__svg__tick").toggleClass("active");
    }, 2000);
  }

  render() {
    const stock = this.state.stock.map(function (stockItem) {
      if (stockItem.quantity === "0") {
        return (
          <li key={stockItem.size.toString()} className={"unavailable " + ((stockItem.size === "1") ? "out-of-stock" : "")} >
            <h2>{(stockItem.size === "1") ? "One size" : stockItem.size}</h2>
            <h2 className="notify">Notify me when available</h2>
          </li>
        );
      } else {
        return (
          <li key={stockItem.size.toString()} className="available">
            <h2 className="value">{stockItem.size}</h2>
          </li>
        );
      }
    })
    
    const SizePicker = () => {
      
      if (stock.length > 1) {
        return (
          <div className="product-item-container__info__size-picker">
            <h2
              onClick={this.SizePickerHandler}
              className="product-item-container__info__size-picker__title"
            >
              Size:{" "}
            </h2>
            <h2
              onClick={this.SizePickerHandler}
              className="product-item-container__info__size-picker__default"
            >
              Select
            </h2>
            <div
              onClick={this.SizePickerHandler}
              className="product-item-container__info__size-picker__arrow"
            ></div>
            <ul
              onClick={this.handleNotifyClick}
              className="product-item-container__info__size-picker__list"
            >
              {stock}
            </ul>
          </div>
        );
      } else {
          return (
            <div className="product-item-container__info__size-picker single" onClick={this.handleNotifyClick}>{stock}</div>
          )
        }
      
    };

    return (
      <Aux>
        <div className="product-item-container" key={this.state.product._id}>
          <button
            className="product-item-container__back"
            onClick={this.props.history.goBack}
          >
            <h2>🡠 &nbsp; back to {this.state.product.category}</h2>
          </button>
          <div className="product-item-container__toggle-product">
            <button className="previous">
              <h2>previous</h2>
            </button>
            <h2> / </h2>
            <button className="next">
              <h2>next</h2>
            </button>
          </div>
          <FetchProductImg
            className={this.state.product.product_id}
            link={this.state.product.product_id}
          />
          <div className="product-item-container__info">
            <div className="product-item-container__info__main">
              <h4>{this.state.product.product_name}</h4>
              <h4 className="product-item-container__info__main__price">
                {this.state.product.price} PLN
              </h4>
              <h3>Model: {this.state.product.product_id}</h3>
            </div>
            <div className="product-item-container__info__desc">
              <h2>Specifications: {this.state.product.specs}</h2>
              <h2>Material: {this.state.product.material}</h2>
              <h2>Collection: {this.state.product.collection_name}</h2>
            </div>
            {SizePicker()}
            <button
              onClick={this.cartHandler}
              className="product-item-container__info__button"
            >
              Add to cart
            </button>
          </div>
        </div>
        <PopUp popClass="pop-cart-continue" handler={this.handleCartClick}>
          <h2>Item has been sucessfuly added to cart.</h2>
          <div className="pop-cart-continue__buttons">
            <button className="pop-cart-continue__buttons__continue" onClick={() => $('.pop-cart-continue').toggleClass("active")}>
              Continue shopping
            </button>
            <NavLink to="/shop/cart">
              <button className="pop-cart-continue__buttons__cart">
                Go to cart
              </button>
            </NavLink>
          </div>
        </PopUp>

        <PopUp popClass="notify" handler={this.handleNotifyClick}>
          <h2>
            Enter your e-mail address and we we will notify you when the item is
            available.
          </h2>
          <InputForm
            handler={this.postNotify}
            class="pop__content__button pop"
            type="text"
            name="email"
            placeholder="Enter your email"
          >
            <svg
              version="1.1"
              id="pop__content__button__svg"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="408px"
              height="408px"
              viewBox="0 0 408 408"
              enableBackground="new 0 0 408 408;"
            >
              <path
                className="pop__content__button__svg__arrow active"
                d="M0,229.5h311.1L168.3,372.3L204,408l204-204L204,0l-35.7,35.7l142.8,142.8H0L0,229.5z"
              />
              <path
                className="pop__content__button__svg__tick"
                d="M9.5,224.5l133.2,133.5l255.8-255.5l-36.7-36.2L142.7,285l-97-97L9.5,224.5z"
              />
            </svg>
          </InputForm>
        </PopUp>
      </Aux>
    );
  }
}

export default withRouter(ProductItem);
