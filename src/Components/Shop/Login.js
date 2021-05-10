import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import InputForm from "./InputForm";

class Login extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      inputSection: "login",
    };

    this.props = props;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleRequest = (e) => {
    if (this.state.inputSection == "login") {
      this.sendLoginRequest();
    } else {
      this.sendRegisterRequest();
    }
  };

  sendLoginRequest = (e) => {
    this._isMounted = true;

    axios
      .post("/api/users/login", {
        email: $(".cart-login__form-container__email input").val(),
        password: $(".cart-login__form-container__password input").val(),
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);

        if (response.data == "Valid") {

          window.location.pathname = "/shop/profile";
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
        surname: $(".cart-login__form-container__surname input").val(),
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({inputSection: "register-confirmation"})
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sendGetRequest = () => {
    this._isMounted = true;
    console.log($(".cart-login__form-container__email input").val());
    axios
      .get("/api/users/getUser", { withCredentials: true })
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
            handler={this.handleRequest}
            section={this.state.inputSection}
          >
            Sign in
          </InputForm>
          
          <div className="cart-login__form-container__buttons login">
            <button
              onClick={(e) => {
                this.inputSectionHandler(
                  this.state.inputSection == "login" ? "register" : "login"
                );
              }}
              className="cart-login__form-container__buttons__toggle"
            >
              {this.state.inputSection == "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;