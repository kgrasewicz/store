import React from "react";
import $ from "jquery";
import {NavLink} from 'react-router-dom';

const topMenu = () => {

    const switchMenuHandler = () => {

        $('.top-menu').toggleClass('active inactive');
    }

  return (

    <div className="top-menu inactive">
      <div className="top-menu__icon" onClick={switchMenuHandler}>
          <div className="top-menu__icon-1"></div>
          <div className="top-menu__icon-2"></div>
      </div>
      <ul className="top-menu__list">
      <li><NavLink exact={true} to="/" activeClassName='is-active'  className="menu-font">home</NavLink></li>
      <li><NavLink to="/shop" activeClassName='is-active' className="menu-font">shop</NavLink></li>
      <li><NavLink to="/about"activeClassName='is-active' className="menu-font">about us</NavLink></li>
      <li><NavLink to="/terms" activeClassName='is-active' className="menu-font">terms & shipment</NavLink></li>
      <li><NavLink to="/contact" activeClassName='is-active'className="menu-font">contact us</NavLink></li>
      </ul>

    </div>
    
  );
};

export default topMenu;