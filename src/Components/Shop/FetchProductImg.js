import React from "react";
import Aux from 'react-aux';

const fetchProductImg = (props) => {

const imgLink = "/Graphics/" + props.link + ".jpg"

  return (
      <Aux>
      <img className={props.className} src={imgLink} alt="logo" />
      </Aux>
  );
};

export default fetchProductImg;
