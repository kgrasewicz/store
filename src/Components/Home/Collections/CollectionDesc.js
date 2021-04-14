import React from "react";
import Aux from "react-aux";

let collectionTitle = { Casablanca: "Casablanca", Marocco: "Marocco" };

let collectionContent = { Casablanca: "From classic diamond jewelry to bold gemstones, Blau knows how to deliver jewelry that completes your look, in a style that's totally your own. Make a statement or elevate your everyday look with our new timeless collection.", Marocco: "Marocco" };

let collectionLink = { Casablanca: "/shop/casablanca", Marocco: "/shop/marocco" };

const collectionDesc = (props) => {
  return (
    <Aux>
      <h2 className={collectionTitle[props.collection]}>{collectionContent[props.collection]}</h2>
      <div className={collectionTitle[props.collection]}><h1 className={collectionTitle[props.collection]}>{collectionTitle[props.collection]}</h1></div>
      <a href={collectionLink[props.collection]} className={"link link-1 " + collectionTitle[props.collection]}>Check collection &nbsp; 🡢</a>
      
    </Aux>
  );
};

export default collectionDesc;
