import React from "react";
import {BrowserRouter, NavLink} from 'react-router-dom';



const topTooltip = () => {

  let url = 'localhost'=='localhost'? '/shop':'';

  return (
    <BrowserRouter>
    <ul className="shop__top-tooltip">
      <li><NavLink to={url+'/all'} activeClassName='is-active'><h2>all</h2></NavLink></li>
      <li><NavLink to={url+'/rings'} activeClassName='is-active'><h2>rings</h2></NavLink></li>
      <li><NavLink to={url+'/necklaces'} activeClassName='is-active'><h2>necklaces</h2></NavLink></li>
      <li><NavLink to={url+'/bracelets'} activeClassName='is-active'><h2>bracelets</h2></NavLink></li>
      <li><NavLink to={url+'/earrings'} activeClassName='is-active'><h2>earrings</h2></NavLink></li>
    </ul>
    </BrowserRouter>
  );
};

export default topTooltip;
