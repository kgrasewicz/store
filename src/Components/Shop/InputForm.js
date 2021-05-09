import React from "react";
import UseForm from "../../UseForm";
import validate from "../../validateInfo";
import Aux from "react-aux";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import inpost from "./inpost.png";
import dhl from "./dhl.png";
import poczta from "./poczta.png";
import { useHistory } from "react-router-dom";

let section = { login: "Sign in", register: "Sign up" };

const InputForm = (props) => {
  const { handleChange, values, errors, handleSubmit } = UseForm(validate);
  let history = useHistory();

  const type = props.type;
  const name = props.name;

  let isChecked;

  function buttonClickHandler(e) {
    handleSubmit();

    console.log(errors[name] === "");

    props.handler();

    console.log(e);
    console.log(props.status);
  }

  if (props.section === "login") {
    return (
      <Aux>
        <h4 className="cart-login__form-container__title-1">
          {section[props.section]}
        </h4>
        <div className="form-overflow">
          <label className="cart-login__form-container__email">
            <h3>E-mail:</h3>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["email"]}</p>
          </label>

          <label className="cart-login__form-container__password">
            <h3>Password:</h3>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["password"]}</p>
          </label>
        </div>
        <NavLink
          className="nav-login"
          onClick={(e) => buttonClickHandler(e)}
          to="#"
        >
          <button className="cart-login__form-container__submit">
            {section[props.section]}
          </button>
        </NavLink>
        <h3 className="cart-login__form-container__title-2">
            Don't have an account?
          </h3>
      </Aux>
    );
  } else if (props.section === "register") {
    return (
      <Aux>
        <h4 className="cart-login__form-container__title-1">
          {section[props.section]}
        </h4>
        <div className="form-overflow">
          <label className="cart-login__form-container__email">
            <h3>E-mail:</h3>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["email"]}</p>
          </label>

          <label className="cart-login__form-container__password">
            <h3>Password:</h3>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["password"]}</p>
          </label>

          <label className="cart-login__form-container__password-2">
            <h3>Repeat password:</h3>
            <input
              type="password"
              name="password2"
              placeholder="Enter password"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["password2"]}</p>
          </label>

          <label className="cart-login__form-container__name">
            <h3>First name:</h3>
            <input
              type="text"
              name="fname"
              placeholder="Enter first name"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["fname"]}</p>
          </label>

          <label className="cart-login__form-container__surname">
            <h3>Last name:</h3>
            <input
              type="text"
              name="lname"
              placeholder="Enter last name"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["lname"]}</p>
          </label>
        </div>
        <button
          className="cart-login__form-container__submit"
          onClick={buttonClickHandler}
        >
          {section[props.section]}
        </button>
      </Aux>
    );
  } else if (props.section === "register-confirmation") {
    return (<h3>You have beeen successfully registered.</h3>)
  } else if (props.section === "checkout/1") {
    return (
      <Aux>
        <div className="checkout__form__line checkout__form__line-1">
          <label className="checkout__form__name">
            <h3>First name:</h3>
            <input
              type="text"
              name="fname"
              placeholder="Enter first name"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["fname"]}</p>
          </label>

          <label className="checkout__form__surname">
            <h3>Last name:</h3>
            <input
              type="text"
              name="lname"
              placeholder="Enter last name"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["lname"]}</p>
          </label>
        </div>

        <div className="checkout__form__line checkout__form__line-2">
          <label className="checkout__form__email">
            <h3>E-mail:</h3>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["email"]}</p>
          </label>

          <label className="checkout__form__phone">
            <h3>Phone:</h3>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["phone"]}</p>
          </label>
        </div>
        <div className="checkout__form__line checkout__form__line-3">
          <label className="checkout__form__country">
            <h3>Country:</h3>
            <input
              type="text"
              name="country"
              placeholder="Enter country"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["country"]}</p>
          </label>

          <label className="checkout__form__code">
            <h3>Postal code:</h3>
            <input
              type="text"
              name="postal-code"
              placeholder="Enter postal code"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["postal-code"]}</p>
          </label>

          <label className="checkout__form__city">
            <h3>City:</h3>
            <input
              type="text"
              name="address-level2"
              placeholder="Enter city"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["address-level2"]}</p>
          </label>
        </div>

        <div className="checkout__form__line checkout__form__line-4">
          <label className="checkout__form__address-line1">
            <h3>Address line 1:</h3>
            <input
              type="text"
              name="address-line1"
              placeholder="Enter street address"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["address-line1"]}</p>
          </label>

          <label className="checkout__form__address-line2">
            <h3>Address line 2:</h3>
            <input
              type="text"
              name="address-line2"
              placeholder="Enter street address"
              value={values.name}
              onChange={handleChange}
            />
            <p className="error__p">{errors["address-line2"]}</p>
          </label>
          <NavLink className="nav-link" to="/shop/cart/checkout/2">
            <button
              className="checkout__form__personal-data__submit"
              onClick={buttonClickHandler}
            >
              Next
            </button>{" "}
          </NavLink>
        </div>
      </Aux>
    );
  } else if (props.section === "checkout/2") {
    return (
      <Aux>
        <div className="checkout__form__delivery__content__list-header">
          <h3>Method</h3>
          <h3>Shipping time</h3>
          <h3>Price</h3>
        </div>
        <ul className="checkout__form__delivery__content__list">
          <li>
            <label>
              <input
                type="radio"
                name="delivery"
                value="Parcel Locker InPost"
                onClick={() => {
                  $(".else").removeClass("active");
                  $(".inpost").addClass("active");
                  $("html, body").animate(
                    { scrollTop: $(".checkout__form__payment").offset().top },
                    1000
                  );
                }}
              />
              <h3>Parcel Locker InPost</h3>
            </label>
            <h3>2 - 3 days</h3>
            <h3 className="delivery__price">9.99 PLN</h3>
            <img src={inpost}></img>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="delivery"
                value="DHL"
                onClick={() => {
                  $(".else").addClass("active");
                  $(".inpost").removeClass("active");
                  $("html, body").animate(
                    { scrollTop: $(".checkout__form__payment").offset().top },
                    1000
                  );
                }}
              />
              <h3>Parcel Delivery DHL</h3>
            </label>
            <h3>1 - 2 days</h3>
            <h3 className="delivery__price">12.99 PLN</h3>
            <img src={dhl}></img>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="delivery"
                value="Poczta Polska"
                onClick={() => {
                  $(".else").addClass("active");
                  $(".inpost").removeClass("active");
                  $("html, body").animate(
                    { scrollTop: $(".checkout__form__payment").offset().top },
                    1000
                  );
                }}
              />
              <h3>Certified Mail Poczta Polska</h3>
            </label>
            <h3>4 - 5 days</h3>
            <h3 className="delivery__price">10.99 PLN</h3>
            <img src={poczta}></img>
          </li>
        </ul>
        <div className={"checkout__form__delivery__content__address"}>
          <div className="checkout__form__line checkout__form__line-1 else">
            <label className="switch">
              <input type="checkbox" onClick={props.shipAddressHandler} />
              <span className="slider round"></span>
              <h3>Use personal address</h3>
            </label>
          </div>
          <div className="checkout__form__line checkout__form__line-2 else">
            <label className="checkout__form__shipping__country">
              <h3>Country:</h3>
              <input
                type="text"
                name="country"
                placeholder="Enter country"
                value={values.name}
              />
              <p className="error__p">{errors["country"]}</p>
            </label>

            <label className="checkout__form__shipping__code">
              <h3>Postal code:</h3>
              <input
                type="text"
                name="postal-code"
                placeholder="Enter postal code"
                value={values.name}
              />
              <p className="error__p">{errors["postal-code"]}</p>
            </label>

            <label className="checkout__form__shipping__city">
              <h3>City:</h3>
              <input
                type="text"
                name="address-level2"
                placeholder="Enter city"
                value={values.name}
              />
              <p className="error__p">{errors["address-level2"]}</p>
            </label>
          </div>

          <div className="checkout__form__line checkout__form__line-3 else">
            <label className="checkout__form__shipping__address-line1">
              <h3>Address line 1:</h3>
              <input
                type="text"
                name="address-line1"
                placeholder="Enter street address"
                value={values.name}
              />
              <p className="error__p">{errors["address-line1"]}</p>
            </label>
            <label className="checkout__form__shipping__address-line2">
              <h3>Address line 2:</h3>
              <input
                type="text"
                name="address-line2"
                placeholder="Enter street address"
                value={values.name}
              />
              <p className="error__p">{errors["address-line2"]}</p>
            </label>{" "}
            <NavLink className="nav-link" to="/shop/cart/checkout/3">
              <button
                className="checkout__form__shipping-data__submit"
                onClick={buttonClickHandler}
              >
                Next
              </button>{" "}
            </NavLink>
          </div>
          <div className="checkout__form__line checkout__form__line-1 inpost">
            <label className="checkout__form__shipping__inpost-city">
              <h3>City:</h3>
              <input
                type="text"
                name="address-level2"
                placeholder="Enter city"
                value={values.name}
              />
              <p className="error__p">{errors["address-level2"]}</p>
            </label>
            <label className="checkout__form__shipping__inpost">
              <h3>InPost Locker Number:</h3>
              <input
                type="text"
                name="locker"
                placeholder="Enter locker number"
                value={values.name}
              />
              <p className="error__p">{errors["locker"]}</p>
            </label>{" "}
            <NavLink className="nav-link" to="/shop/cart/checkout/3">
              <button
                className="checkout__form__shipping-data__submit"
                onClick={buttonClickHandler}
              >
                Next
              </button>{" "}
            </NavLink>
          </div>
        </div>
      </Aux>
    );
  } else if (props.section === "checkout/3") {
    return (
      <Aux>
        <ul className="checkout__form__payment__content__list">
          <li>
            <label>
              <input type="radio" name="payment" value="Credit card" />
              <h3>Credit card</h3>
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="payment" value="Blik" />
              <h3>Blik</h3>
            </label>
          </li>
          <li>
            <label>
              <input type="radio" name="payment" value="Dotpay" />
              <h3>Dotpay</h3>
            </label>
          </li>
          <li>
            <NavLink className="nav-link" to="/shop/cart/confirmation">
              <button
                className="checkout__form__payment-data__submit"
                onClick={buttonClickHandler}
              >
                Finalize purchase
              </button>{" "}
            </NavLink>
          </li>
        </ul>
        <p className="error__p">{errors[name]}</p>
      </Aux>
    );
  } else {
    return (
      <Aux>
        <input
          type={type}
          name={name}
          placeholder={props.placeholder}
          value={values.name}
          onChange={handleChange}
        />
        <button className={props.class} onClick={buttonClickHandler}>
          {props.children}
        </button>
        <p>{errors[name]}</p>
      </Aux>
    );
  }
};

export default InputForm;
