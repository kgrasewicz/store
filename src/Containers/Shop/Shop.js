import React, {Component} from 'react';
import NewsletterInfo from "../../Components/NewsletterInfo/Newsletter_Info";
import BottomInfo from "../../Components/BottomInfo/BottomInfo";
import { BrowserRouter } from "react-router-dom";
import TopMenu from "../../Components/TopMenu/TopMenu";
import ProductList from "../../Components/Shop/ProductList";

class Shop extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="shop">
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