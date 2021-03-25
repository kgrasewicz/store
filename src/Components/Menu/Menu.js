import React from "react";
import {BrowserRouter} from 'react-router-dom';

const menu = () => {
  return (
    <BrowserRouter>
    <ul className="main-menu">
      <li><a href="/shop/all" className="menu-font">// shop</a></li>
      <li><a href="/about" className="menu-font">// about us</a></li>
      <li><a href="/terms" className="menu-font">// terms & shipment</a></li>
      <li><a href="/contact" className="menu-font">// contact us</a></li>
    </ul>
    </BrowserRouter>
  );
};

export default menu;
