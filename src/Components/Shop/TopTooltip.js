import React from "react";
import {NavLink} from 'react-router-dom';
import CartIcon from './CartIcon';
import Aux from "react-aux";
import Logo from "../Logo/Logo"
import TopMenu from "../TopMenu/TopMenu"


const topTooltip = (props) => {



  return (
    <Aux>
    <div className="shop__top-tooltip">
    <TopMenu />
    <NavLink to={'/'}><Logo /></NavLink>
    <ul className="shop__top-tooltip__list">
      <li><NavLink to={'/shop/all'}  onClick={props.clickHandler} activeClassName='is-active'><h2>all</h2></NavLink></li>
      <li><NavLink to={'/shop/rings'} onClick={props.clickHandler} activeClassName='is-active'><h2>rings</h2></NavLink></li>
      <li><NavLink to={'/shop/necklaces'} onClick={props.clickHandler} activeClassName='is-active'><h2>necklaces</h2></NavLink></li>
      <li><NavLink to={'/shop/bracelets'} onClick={props.clickHandler} activeClassName='is-active'><h2>bracelets</h2></NavLink></li>
      <li><NavLink to={'/shop/earrings'} onClick={props.clickHandler} activeClassName='is-active'><h2>earrings</h2></NavLink></li>
    </ul>
    
    <CartIcon />
    </div>
    </Aux>
    
  );
};

export default topTooltip;
