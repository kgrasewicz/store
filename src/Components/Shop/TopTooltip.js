import React from "react";
import { NavLink } from "react-router-dom";
import CartIcon from "./CartIcon";
import Aux from "react-aux";
import Logo from "../Logo/Logo";
import TopMenu from "../TopMenu/TopMenu";
import Search from "./Search";

const topTooltip = (props) => {
  return (
    <Aux>
      <div className="shop__top-tooltip">
        <TopMenu />
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
        <ul className="shop__top-tooltip__list">
          <li>
            <NavLink
              to={"/shop/all"}
              onClick={props.clickHandler}
              activeClassName="is-active"
            >
              <h2>all</h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/shop/rings"}
              onClick={props.clickHandler}
              activeClassName="is-active"
            >
              <h2>rings</h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/shop/necklaces"}
              onClick={props.clickHandler}
              activeClassName="is-active"
            >
              <h2>necklaces</h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/shop/bracelets"}
              onClick={props.clickHandler}
              activeClassName="is-active"
            >
              <h2>bracelets</h2>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/shop/earrings"}
              onClick={props.clickHandler}
              activeClassName="is-active"
            >
              <h2>earrings</h2>
            </NavLink>
          </li>
        </ul>
        <Search />
        <CartIcon />
        <NavLink
          className="link-2 shop__top-tooltip__login"
          to={props.isSignedIn == false ? "/shop/login" : "/shop/profile"}
        >
          {props.isSignedIn == false ? (
            <h2>Sign in</h2>
          ) : (
            <div className="profile-icon">
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
                  d="M204,220.3c90.3,0,164,72.7,165.5,162.7h15.8C383.8,284.3,303,204.5,204,204.5c-99,0-179.8,79.8-181.3,178.5h15.8
		C40,293,113.7,220.3,204,220.3z"
                />
                <path
                  d="M204,187.7c47.8,0,86.7-38.9,86.7-86.7c0-47.8-38.9-86.7-86.7-86.7s-86.7,38.9-86.7,86.7
		C117.3,148.8,156.2,187.7,204,187.7z M204,30.1c39.1,0,71,31.8,71,71c0,39.1-31.8,71-71,71c-39.1,0-71-31.8-71-71
		C133,61.9,164.9,30.1,204,30.1z"
                />
              </svg>
            </div>
          )}
        </NavLink>
      </div>
    </Aux>
  );
};

export default topTooltip;
