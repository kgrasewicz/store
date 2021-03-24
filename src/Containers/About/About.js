import React from "react";
import AboutDesc from "../../Components/About/AboutDesc";
import AboutImgCarousel from "../../Components/About/AboutImgCarousel";
import NewsletterInfo from "../../Components/NewsletterInfo/Newsletter_Info";
import BottomInfo from "../../Components/BottomInfo/BottomInfo";
import TopMenu from "../../Components/TopMenu/TopMenu";

const about = (props) => {
  return (
    <div className="about">
    <AboutDesc />
    <AboutImgCarousel />
    <BottomInfo />
    <NewsletterInfo />
    <TopMenu />
    </div>
  );
};

export default about;