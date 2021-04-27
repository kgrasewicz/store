import React from "react";
import UseForm from "../../UseForm";
import validate from "../../validateInfo";
import Aux from "react-aux";
import $ from "jquery";
import {NavLink} from "react-router-dom";


let section= { login: "Sign in", register: "Sign up"};



const inputForm = (props) => {
  const { handleChange, values, errors, handleSubmit } = UseForm(validate);

  const type = props.type;
  const name = props.name;

  function buttonClickHandler() {
    handleSubmit();

    console.log(errors[name] === "")


    if (errors[name] === "" || $(`input[name=${name}]`).val() !== "") {
    props.handler()

    }
  }


  if (props.section === "login") {


  return (
    <Aux>
      <h4 className="cart-login__form-container__title-1">{section[props.section]}</h4>
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
      <NavLink to={props.status}><button className="cart-login__form-container__submit" onClick={buttonClickHandler}>{section[props.section]}</button></NavLink>
      
    </Aux>
  );


}

else if (props.section === "register") {
  return (
    <Aux>
      
      <h4 className="cart-login__form-container__title-1">{section[props.section]}</h4>
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
        name="password"
        placeholder="Enter password"
        value={values.name}
        onChange={handleChange}
      />
      <p className="error__p">{errors["password"]}</p>
      </label>

      <label className="cart-login__form-container__name">
            <h3>Enter name:</h3>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={values.name}
        onChange={handleChange}
      />
      <p className="error__p">{errors["name"]}</p>
      </label>

      <label className="cart-login__form-container__surname">
            <h3>Enter surname:</h3>
      <input
        type="text"
        name="surname"
        placeholder="Enter surname"
        value={values.name}
        onChange={handleChange}
      />
      <p className="error__p">{errors["surname"]}</p>
      </label>        
      </div>
      <button className="cart-login__form-container__submit" onClick={buttonClickHandler}>{section[props.section]}</button>
      
    </Aux>
  );
}

else {
  return (
    <Aux>
      <input
        type={type}
        name={name}
        placeholder={props.placeholder}
        value={values.name}
        onChange={handleChange}
      />
      <button className={props.class} onClick={buttonClickHandler}>{props.children}</button>
      <p className="error__p">{errors[name]}</p>
    </Aux>
  );
}
};

export default inputForm;
