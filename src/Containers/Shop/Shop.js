import React, {Component} from 'react';
import NewsletterInfo from "../../Components/NewsletterInfo/Newsletter_Info";
import BottomInfo from "../../Components/BottomInfo/BottomInfo";
import { BrowserRouter} from "react-router-dom";
import TopMenu from "../../Components/TopMenu/TopMenu";
import ProductList from "../../Components/Shop/ProductList";
import TopImg from "../../Components/Shop/topImg.png";
import TopTooltip from "../../Components/Shop/TopTooltip";

class Shop extends Component {

  constructor(props) {

    super(props)

    this.props = props;

  
  }
  


  render() {
    return (
        <div className="shop">

          
          <img className="shop__topImg" src={TopImg} alt="graphics"/>
          <NewsletterInfo />
          <BottomInfo />
          <TopMenu />
          <ProductList/>
        </div>
    );
  }
}

export default Shop;