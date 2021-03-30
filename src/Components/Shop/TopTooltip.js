import React from "react";
import {NavLink} from 'react-router-dom';



const topTooltip = (props) => {



  return (
    <ul className="shop__top-tooltip">
      <li><NavLink to={'/shop/all'}  onClick={props.clickHandler} activeClassName='is-active'><h2>all</h2></NavLink></li>
      <li><NavLink to={'/shop/ring'} onClick={props.clickHandler} activeClassName='is-active'><h2>rings</h2></NavLink></li>
      <li><NavLink to={'/shop/necklaces'} onClick={props.clickHandler} activeClassName='is-active'><h2>necklaces</h2></NavLink></li>
      <li><NavLink to={'/shop/bracelets'} onClick={props.clickHandler} activeClassName='is-active'><h2>bracelets</h2></NavLink></li>
      <li><NavLink to={'/shop/earrings'} onClick={props.clickHandler} activeClassName='is-active'><h2>earrings</h2></NavLink></li>
    </ul>
  );
};

export default topTooltip;
