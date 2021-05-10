import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import FetchProductImg from "../../Components/Shop/FetchProductImg";
import $ from "jquery";
import Promocode from "../../Components/Shop/Promocode";
import _ from "lodash";

class Profile extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      cartHistory: [],
      carts: [],
      method: "desc",
    };

    this.props = props;
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.sendGetRequest();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.cartHistory != this.state.cartHistory) {
      this._isMounted = true;
      this.fetchData();

      console.log("afasfasdf");
    }
  };

  showList = (e) => {
    $(e.target).toggleClass("active");

    $(e.target).parent().next().toggleClass("active");
  };

  sortHistory = (e) => {
    $(".profile-container__legend__date .arrow svg").toggleClass("active");

    if (this.state.method == "asc") {
      this.setState({ method: "desc" });
    } else {
      this.setState({ method: "asc" });
    }
    setTimeout(() => {
        this.setState(
            {
              cartHistory: _.orderBy(
                this.state.cartHistory,
                ["createdAt"],
                [this.state.method]
              ),
            },
            () => {
              this._isMounted = false;
            }
          );  
    }, 100);
    
  };

  fetchData = () => {
    axios
      .get("/api/cart/history/" + this.state.user)
      .then((response) => {
        console.log(response.data);
        if (this._isMounted) {
          this.setState(
            {
              cartHistory: _.orderBy(response.data, ["createdAt"], [this.state.method]),
            },
            () => {
              this._isMounted = false;
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sendGetRequest = () => {
    this._isMounted = true;
    axios
      .get("/api/users/getUser", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        this.setState({ user: response.data.username }, this.fetchData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  logout = () => {
    sessionStorage.clear();
    axios
    .post("/api/users/logout")
    .then((response) => {
     window.location.pathname = "/shop/all"
    })
    .catch((error) => {
      console.log(error);
    });

  };

  render() {
    if (this.state.cartHistory.length === 0)
      return <div className="profile-container">
      <h1 className="profile-container__title">shopping history</h1>
      <div className="profile-container__legend">
        <div
          onClick={this.sortHistory}
          className="profile-container__legend__date"
        >
          <h3>Order date</h3>
          <div className="arrow">
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
                d="M8.6,216.2l342.6,0.4L179.5,388.2c6.7,8.8,8.3,11.5,13.9,17.8c2.1,2.4-1.4-1.6,1.3,1.5L399.3,204L197.3,2
      c-14.7,13.8-11.8,10.9-17.8,17.4l171.6,172H8.6"
              />
            </svg>
          </div>
        </div>
        <h3>Order ID</h3>
        <h3>Items quantity</h3>
        <h3>Total price</h3>
      </div>
      <ul className="profile-container__history"><h2 className="no-history">You have no shopping history.</h2></ul>;
      <h2 onClick={this.logout} className="link-2 logout-button">Log out</h2>
    </div>;

    let carts = [];

    carts = this.state.cartHistory.map((item) => {
      return (
        <li className="profile-container__history__item" key={item._id}>
          <div className="profile-container__history__item__header">
            <h2>{item.createdAt.slice(0, 16).split("T").join(" at ")}</h2>
            <h2>{item._id}</h2>
            <h2>{item.itemsTotal}</h2>
            <h2>{item.total}</h2>
            <div onClick={this.showList} className="arrow"></div>
          </div>
          <ul className="profile-container__history__item__list">
            {item.items.map((product) => {
              return (
                <li key={product._id}>
                  <h2>Product: {product.productName}</h2>
                  <h2>Model: {product.model}</h2>
                  <h2>Size: {product.size}</h2>
                  <h2>Quantity: {product.quantity}</h2>
                  <h2>Price: {product.price}</h2>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });

    return (
      <div className="profile-container">
        <h1 className="profile-container__title">shopping history</h1>
        <div className="profile-container__legend">
          <div
            onClick={this.sortHistory}
            className="profile-container__legend__date"
          >
            <h3>Order date</h3>
            <div className="arrow">
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
                  d="M8.6,216.2l342.6,0.4L179.5,388.2c6.7,8.8,8.3,11.5,13.9,17.8c2.1,2.4-1.4-1.6,1.3,1.5L399.3,204L197.3,2
		c-14.7,13.8-11.8,10.9-17.8,17.4l171.6,172H8.6"
                />
              </svg>
            </div>
          </div>
          <h3>Order ID</h3>
          <h3>Items quantity</h3>
          <h3>Total price</h3>
        </div>
        <ul className="profile-container__history">{carts}</ul>;
        <h2 onClick={this.logout} className="link-2 logout-button">Log out</h2>
      </div>
    );
  }
}

export default Profile;
