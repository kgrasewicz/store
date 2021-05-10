import React from "react";
import NewsletterInfo from "../Components/NewsletterInfo/Newsletter_Info";
import BottomInfo from "../Components/BottomInfo/BottomInfo";
import TopMenu from "../Components/TopMenu/TopMenu";
import { NavLink } from "react-router-dom";
import Logo from "../Components/Logo/Logo";
import img from "./contact.jpg";

const contact = (props) => {
  return (
    <div className="contact">
      <div className="contact__general">
        <h1>contact us</h1>
        <a href="mailto: office@blau.com">
          <h2>// office@blau.com</h2>
        </a>
        <h2>// +48 103 381 304</h2>
      </div>
      <img className="contact__general__img" src={img} />
      <NavLink className="logo-container" to={"/"}>
        <Logo />
      </NavLink>
      <BottomInfo />
      <NewsletterInfo />
      <TopMenu />
    </div>
  );
};

export default contact;