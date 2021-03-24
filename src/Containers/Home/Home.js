import React, {Component} from 'react';
import CollectionRender from "../../Components/Home/Collections/CollectionRender";
import Menu from "../../Components/Menu/Menu";
import Logo from "../../Components/Logo/Logo";
import NewsletterInfo from "../../Components/NewsletterInfo/Newsletter_Info";
import BottomInfo from "../../Components/BottomInfo/BottomInfo";
import { BrowserRouter } from "react-router-dom";


class Home extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="home">
          <NewsletterInfo />
          <Logo />
          <Menu />
          <CollectionRender collectionName="Casablanca" />
          <BottomInfo />
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
