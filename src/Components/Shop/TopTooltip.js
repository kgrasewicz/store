import React from "react";
import {BrowserRouter, NavLink} from 'react-router-dom';



const topTooltip = (props) => {

  let url = 'localhost'=='localhost'? '/shop':'';

  return (
    <BrowserRouter>
    <ul className="shop__top-tooltip">
      <li><NavLink to={url+'/all'}  onClick={props.clickHandler} activeClassName='is-active'><h2>all</h2></NavLink></li>
      <li><NavLink to={url+'/rings'} onClick={props.clickHandler} activeClassName='is-active'><h2>rings</h2></NavLink></li>
      <li><NavLink to={url+'/necklaces'} onClick={props.clickHandler} activeClassName='is-active'><h2>necklaces</h2></NavLink></li>
      <li><NavLink to={url+'/bracelets'} onClick={props.clickHandler} activeClassName='is-active'><h2>bracelets</h2></NavLink></li>
      <li><NavLink to={url+'/earrings'} onClick={props.clickHandler} activeClassName='is-active'><h2>earrings</h2></NavLink></li>
    </ul>
    </BrowserRouter>
  );
};

export default topTooltip;
