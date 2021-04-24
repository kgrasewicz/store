import React from "react";
import $ from "jquery";
import {NavLink} from 'react-router-dom';

const topMenu = () => {

    const switchMenuHandler = () => {

        $('.top-menu').toggleClass('active inactive');
    }

    $('body').on('click', (e) => {


      if (!$('.top-menu').has(e.target).length > 0) {
        $('.top-menu').removeClass('active').addClass('inactive');
      }
    })

  return (

    <div className="top-menu inactive">
      <div className="top-menu__icon" onClick={switchMenuHandler}>
      <div className="top-menu__icon-1"></div>
          <div className="top-menu__icon-2"></div>
      </div>
      <div className="top-menu__bcg"></div>
      <ul className="top-menu__list">
      <li><NavLink exact to="/" activeClassName='is-active'  className="menu-font link-2 link">home</NavLink></li>
      <li><NavLink to="/shop/all" activeClassName='is-active' className="menu-font link-2 link">shop</NavLink></li>
      <li><NavLink to="/about"activeClassName='is-active' className="menu-font link-2 link">about us</NavLink></li>
      <li><NavLink to="/terms" activeClassName='is-active' className="menu-font link-2 link ">terms & shipment</NavLink></li>
      <li><NavLink to="/contact" activeClassName='is-active'className="menu-font link-2 link">contact us</NavLink></li>
      </ul>

    </div>
    
  );
};

export default topMenu;