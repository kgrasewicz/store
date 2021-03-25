import React, {Component} from 'react';
import NewsletterInfo from "../../Components/NewsletterInfo/Newsletter_Info";
import BottomInfo from "../../Components/BottomInfo/BottomInfo";
import { BrowserRouter, Route} from "react-router-dom";
import TopMenu from "../../Components/TopMenu/TopMenu";
import ProductList from "../../Components/Shop/ProductList";
import TopImg from "../../Components/Shop/topImg.png";
import TopTooltip from "../../Components/Shop/TopTooltip";

class Shop extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="shop">
          <TopTooltip />
          <img className="shop__topImg" src={TopImg} alt="graphics"/>
          <NewsletterInfo />
          <BottomInfo />
          <TopMenu />
          <ProductList />
        </div>

      </BrowserRouter>
    );
  }
}

export default Shop;