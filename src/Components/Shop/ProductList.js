import React, { Component } from "react";
import axios from "axios";
import FetchProductImg from "./FetchProductImg";
import Aux from "react-aux";
import { NavLink, withRouter } from "react-router-dom";
import TopImg from "./topImg.png";
import _ from "lodash";
import $ from "jquery";
import Pagination from "../../Paginate.js";

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
      productList: [],
      category: "",
    };

    this.props = props;
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.fetchData(this.props.match.params.category);
    this.fetchCartData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.match.params.category !== this.props.match.params.category) {
      this._isMounted = true;
      this.fetchData(this.props.match.params.category);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  sortArray = (method, order) => {
    this.setState(
      {
        productList: _.orderBy(this.state.products, [method], [order]),
      },
      () => {
        this.setState({ allProducts: this.state.productList }, () => {
          this.setState({
            currentPage: JSON.parse(window.localStorage.getItem("currentPage")),
          });
          const offset = (this.state.currentPage - 1) * 12;
          this.setState({
            currentProducts: this.state.allProducts.slice(offset, offset + 12),
          });
          console.log("why");
          axios.get("/api/cart").then((response) => {
            $(".items-counter h5").text(response.data.itemsTotal);

            console.log(response);
          });
        });
      }
    );
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
          console.log("why");

          this.sortArray("product_name", "asc");

          this.setState({ allProducts: this.state.productList });

          const { currentPage, totalPages, pageLimit } = this.state.data;

          const offset = (currentPage - 1) * pageLimit;
          const currentProducts = this.state.allProducts.slice(
            offset,
            offset + pageLimit
          );

          this.setState({ currentPage, currentProducts, totalPages });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchCartData = () => {
    if (this._isMounted) {
      axios
        .get("/api/cart")
        .then((response) => {
          $(".items-counter").text(response.data.itemsTotal);

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  onPageChanged = (data) => {
    const { allProducts } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = allProducts.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentProducts, totalPages });

    this._isMounted = false;
  };

  render() {
    const { allProducts, currentProducts, currentPage } = this.state;
    const totalProducts = allProducts.length;

    localStorage.setItem("currentPage", JSON.stringify(currentPage));

    if (totalProducts === 0) return null;

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
        <div className="products-container__list__product__label">
          <h2>{product.product_name}</h2>
          <h3>{product.price} PLN</h3>
        </div>
      </NavLink>
    ));

    return (
      <Aux>
        <img className="shop__topImg" src={TopImg} alt="graphics" />
        <Pagination
          totalRecords={totalProducts}
          pageLimit={12}
          pageNeighbours={1}
          onPageChanged={this.onPageChanged}
        />
        <div className="products-container">
          <div className="products-container__tooltip">
            <h4>collection</h4>
            <div className="products-container__tooltip__sort-container">
              <div
                onClick={this.SortPickerHandler}
                className="products-container__tooltip__sort-container__top"
              >
                <h2 className="products-container__tooltip__sort-container__top__title">
                  Sort by:
                </h2>
                <h2 className="products-container__tooltip__sort-container__top__default">
                  product name ascending
                </h2>
                <div className="arrow"></div>
              </div>

              <ul className="products-container__tooltip__sort-container__list">
                <li
                  onClick={() => {
                    this.sortArray("product_name", "asc")
                    this.SortPickerHandler()
                  }}
                >
                  <h2>product name ascending</h2>
                </li>
                <li onClick={() => {this.sortArray("product_name", "desc")
                this.SortPickerHandler()
                }}>
                  <h2>product name descending</h2>
                </li>
                <li onClick={() => {this.sortArray("price", "asc")
                this.SortPickerHandler()
                }}>
                  <h2>price ascending</h2>
                </li>
                <li onClick={() => {this.sortArray("price", "desc")
                this.SortPickerHandler()
                }}>
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
