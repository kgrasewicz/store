import React from "react";
import casablanca1 from './Casablanca-1.jpg';
import casablanca2 from './Casablanca-2.jpg';
import casablanca3 from './Casablanca-3.jpg';

let imgObj =
      {"Casablanca-1": casablanca1,
      "Casablanca-2": casablanca2,
      "Casablanca-3": casablanca3}

const loadImage = (props) => {
  return (
      <img className={props.className} src={imgObj[props.link]} alt={props.alt} />
  );
};

export default loadImage;