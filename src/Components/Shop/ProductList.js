import React, { Component } from "react";
import axios from "axios";
import FetchProductImg from "./FetchProductImg";
import Aux from "react-aux";
import { NavLink, withRouter } from "react-router-dom";
import TopImg from "./topImg.png";
import _ from "lodash";
import $ from "jquery";
import Pagination from "../../Paginate.js"

class ProductList extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      allProducts: [],
      currentProducts: [],
      currentPage: null,
      totalPages: null,
      productList: []
      
    };

    this.props = props;
  }

  componentDidMount = () => {
    this._isMounted = true;
    const category = this.props.match.params.category;
    this.fetchData(category);

    

  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this._isMounted) {
      this.fetchData(this.props.match.params.category);
    }
    this._isMounted = false;
  };


    componentWillUnmount() {
    this._isMounted = false;
  }

  sortArray = (method, order) => {
    
    this.setState({
      productList: _.orderBy(this.state.products, [method], [order]),
    }, () => {
      this.setState({ allProducts: this.state.productList }, () => {
        this.setState({currentPage: JSON.parse(window.localStorage.getItem('currentPage'))})
        const offset = (this.state.currentPage - 1) * 12;
        this.setState({currentProducts: this.state.allProducts.slice(offset, offset + 12)})
      })
      
    }
    
    );


    
    console.log(this.state)
  };

  SortPickerHandler = () => {
    $(".products-container__tooltip__sort-container arrow").toggleClass(
      "active"
    );
    $(".products-container__tooltip__sort-container__list").toggleClass(
      "active"
    );
  };

  fetchData = (category) => {
    axios
      .get("/api/products")
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            products: response.data.filter((filteredProduct) => {
              return (
                filteredProduct.category ===
                (category === "all" ? filteredProduct.category : category)
              );
            }),
          });

          this.sortArray("product_name", "asc");
          
          

          this.setState({ allProducts: this.state.productList });

          const { currentPage, totalPages, pageLimit } = this.state.data;
      
          const offset = (currentPage - 1) * pageLimit;
          const currentProducts = this.state.allProducts.slice(offset, offset + pageLimit);
      
          this.setState({ currentPage, currentProducts, totalPages });


          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  onPageChanged = data => {
    const { allProducts } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = allProducts.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentProducts, totalPages });


  }




  render() {


    const { allProducts, currentProducts, currentPage, totalPages } = this.state;
    const totalProducts = allProducts.length;
   
    localStorage.setItem("currentPage", JSON.stringify(currentPage));

    console.log(localStorage);

    if (totalProducts=== 0) return null;

    const products = currentProducts.map((product) => (
      <NavLink
        to={this.props.location.pathname + "/" + product._id}
        className={
          "products-container__list__product " +
          (+product.stock.reduce((a, b) => a + (b["quantity"] || 0), 0) === 0
            ? "unavailable"
            : "available")
        }
        key={product._id}
      >
        <FetchProductImg
          className={product.product_id}
          link={product.product_id}
        />
        <div className={"products-container__list__product__sizes"}>
          <h2>Unavailable</h2>
        </div>
        <div className="products-container__list__product__label">
          <h2>{product.product_name}</h2>
          <h3>{product.price} PLN</h3>
        </div>
      </NavLink>
    ));

    return (
      <Aux>
        <img className="shop__topImg" src={TopImg} alt="graphics" />
        <Pagination totalRecords={totalProducts} pageLimit={12}  pageNeighbours={1} onPageChanged={this.onPageChanged} />
        <div className="products-container">
          <div className="products-container__tooltip">
            <h4>collection</h4>
            <div className="products-container__tooltip__sort-container">
              <div onClick={this.SortPickerHandler} className="products-container__tooltip__sort-container__top">
                <h2 className="products-container__tooltip__sort-container__top__title">
                  Sort by:
                </h2>
                <h2 className="products-container__tooltip__sort-container__top__default">
                  product name ascending
                </h2>
                <div className="arrow"></div>
              </div>

              <ul className="products-container__tooltip__sort-container__list">
                <li onClick={() => this.sortArray("product_name", "asc")}>
                  <h2>product name ascending</h2>
                </li>
                <li onClick={() => this.sortArray("product_name", "desc")}>
                  <h2>product name descending</h2>
                </li>
                <li onClick={() => this.sortArray("price", "asc")}>
                  <h2>price ascending</h2>
                </li>
                <li onClick={() => this.sortArray("price", "desc")}>
                  <h2>price descending</h2>
                </li>
              </ul>
            </div>
          </div>
          <div className="products-container__list">{products}</div>
        </div>
      </Aux>
    );
  }
}

export default withRouter(ProductList);
