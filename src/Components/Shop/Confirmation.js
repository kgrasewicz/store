import React, { Component } from "react";
import {NavLink } from "react-router-dom";
import $ from "jquery";
import _ from "lodash";

class Confirmation extends Component {
  _isMounted = false;

  componentDidMount = () => {
    $(".items-counter").text("0");
  };

  render() {

    

    return <div className="shop__confirmation">
        <h4>Transaction has been successfully completed.</h4>
        <NavLink to="/shop/all"> <button>Back to store</button></NavLink>
    </div>;
  }
}

export default Confirmation;
