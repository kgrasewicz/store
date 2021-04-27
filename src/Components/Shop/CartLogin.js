import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import session from "express-session";
import InputForm from "./InputForm";
import csrf from "csurf";
import { useHistory } from "react-router-dom";

class CartLogin extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loginStatus: "#",
      inputSection: "login",
    };

    this.props = props;
  }

  componentDidMount = () => {};

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.inputSection != this.state.inputSection) {
      this._isMounted = true;
    }
  };


  handleRequest = () => {
    if (this.state.inputSection == "login") {
      this.sendLoginRequest()
    } else {
      this.sendRegisterRequest()
    }
  }
  sendLoginRequest = (e) => {
    console.log("afasdf");
    this._isMounted = true;
    console.log($(".cart-login__form-container__email input").val());
    axios
      .post("/api/users/login", {
        email: $(".cart-login__form-container__email input").val(),
        password: $(".cart-login__form-container__password input").val(),
      })
      .then((response) => {
        console.log(response);

        if (response.data == "Valid") {
          this.setState({ loginStatus: "/shop/cart/checkout" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sendRegisterRequest = (e) => {
    this._isMounted = true;
    console.log($(".cart-login__form-container__email input").val());
    axios
      .post("/api/users/register", {
        email: $(".cart-login__form-container__email input").val(),
        password: $(".cart-login__form-container__password input").val(),
        name: $(".cart-login__form-container__name input").val(),
        surname: $(".cart-login__form-container__surname input").val()
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  sendGetRequest = () => {
    console.log("afasdf");
    this._isMounted = true;
    console.log($(".cart-login__form-container__email input").val());
    axios
      .get("/api/users/getUser")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  inputSectionHandler = (newSection, e) => {
    this.setState(
      { inputSection: newSection },
      console.log(this.state.inputSection)
    );
  };

  render() {
    return (
      <div className="cart-login">
        <div className="cart-login__form-container">
          <InputForm
            status={this.state.loginStatus}
            handler={this.handleRequest}
            section={this.state.inputSection}
          >
            Sign in
          </InputForm>
          <h3 className="cart-login__form-container__title-2">
            Don't have an account?
          </h3>
          <input type="hidden" name="_csrf" value="{{csrfToken}}" />
          <div className="cart-login__form-container__buttons">
            <button
              onClick={(e) => {
                this.inputSectionHandler(this.state.inputSection == "login" ? "register" : "login");
                
              }}
              className="cart-login__form-container__buttons__toggle"
            >
              {this.state.inputSection == "login" ? "Sign up" : "Sign in"}
            </button>
            <button className="cart-login__form-container__buttons__guest">
              Continue as guest
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartLogin;
