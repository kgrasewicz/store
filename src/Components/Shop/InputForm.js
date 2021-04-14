import React from "react";
import UseForm from "../../UseForm";
import validate from "../../validateInfo";
import Aux from "react-aux";
import $ from "jquery";

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
      <p>{errors[name]}</p>
    </Aux>
  );
};

export default inputForm;
