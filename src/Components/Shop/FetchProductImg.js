import React from "react";
import Aux from 'react-aux';

const fetchProductImg = (props) => {

const imgLink = "/Graphics/" + props.link + ".jpg"

if (!props.link) {
  return (

    <div className={props.className + " placeholder"}></div>
    
);
} else {
  return (
    <Aux>
    <img className={props.className} src={imgLink} alt="logo" />
    <div className={props.className + " placeholder"}></div>
    </Aux>
  )
}
  
};

export default fetchProductImg;
