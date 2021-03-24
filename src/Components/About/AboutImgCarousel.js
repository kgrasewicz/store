import React from "react";
import About1 from './About-1.jpg';
import About2 from './About-2.jpg';
import About3 from './About-3.jpg';
import About4 from './About-4.jpg';
import About5 from './About-5.jpg';
import About6 from './About-6.jpg';

const aboutImgCarousel = () => {
  return (
    <div className="about__carousel">
        <img src={About1} alt=""></img>
        <img src={About2} alt=""></img>
        <img src={About3} alt=""></img>
        <img src={About4} alt=""></img>
        <img src={About5} alt=""></img>
        <img src={About6} alt=""></img>
        <img src={About1} alt=""></img>
    </div>
  );
};

export default aboutImgCarousel;