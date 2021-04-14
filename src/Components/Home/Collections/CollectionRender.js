import React from "react";
import LoadImage from './loadImage';
import CollectionDesc from './CollectionDesc';
import Aux from "react-aux";

let imgClass= { Casablanca: "imgCasablanca", Marocco: "Marocco" };
let name= { Casablanca: "Casablanca", Marocco: "Marocco" };

const collectionRender = (props) => {




  return (
    <Aux>
    <LoadImage className={imgClass[props.collectionName].concat("-1")} link={name[props.collectionName].concat("-1")} alt="graphics"/>
    <LoadImage className={imgClass[props.collectionName].concat("-2")} link={name[props.collectionName].concat("-2")} alt="graphics"/>
    <LoadImage className={imgClass[props.collectionName].concat("-3")} link={name[props.collectionName].concat("-3")} alt="graphics"/>
    <CollectionDesc collection={name[props.collectionName]}/>
    </Aux>
  );
};

export default collectionRender;