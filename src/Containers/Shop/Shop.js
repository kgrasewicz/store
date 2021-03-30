import React, {Component} from 'react';
import NewsletterInfo from "../../Components/NewsletterInfo/Newsletter_Info";
import BottomInfo from "../../Components/BottomInfo/BottomInfo";
import TopMenu from "../../Components/TopMenu/TopMenu";
import TopImg from "../../Components/Shop/topImg.png";
import TopTooltip from "../../Components/Shop/TopTooltip";


class Shop extends Component {

  constructor(props) {

    super(props)

    this.props = props;

    this.state = {
      id: null,
    }
  

  
  }

  render() {

    
    return (

      

        <div className="shop">


          <TopTooltip/>;

          
          <img className="shop__topImg" src={TopImg} alt="graphics"/>
          <NewsletterInfo />
          <BottomInfo />
          <TopMenu />

          {this.props.children}

        </div>


    );
  }
}

export default Shop;