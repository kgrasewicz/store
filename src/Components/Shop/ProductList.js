import React, { Component } from "react";
import axios from "axios";
import FetchProductImg from "./FetchProductImg";
import Aux from "react-aux";
import { NavLink, withRouter } from "react-router-dom";
import TopImg from "./topImg.png";
import _ from "lodash";
import $ from "jquery";
import Pagination from "../../Paginate.js";
import PriceSlider from "./Slider";
import { truncate } from "lodash";
import { useHistory } from "react-router-dom";

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
      filters: [],
      totalProducts: null,
      searchQuery: [""],
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

    if (prevState.allProducts !== this.state.allProducts) {
      this._isMounted = true;

      this.setState({
        currentPage: JSON.parse(window.localStorage.getItem("currentPage")),
      });

      const offset = (this.state.currentPage - 1) * 12;
      this.setState(
        {
          currentProducts: this.state.allProducts.slice(offset, offset + 12),
        },
        () => {
          this.setState({
            totalPages: Math.ceil(this.state.allProducts.length / 12),
          });
        }
      );

      this._isMounted = false;
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  sortArray = (method, order) => {


    this.setState(
      {
        allProducts: _.orderBy(this.state.allProducts, [method], [order]),
      },
      () => {
        this.setState({
          currentPage: JSON.parse(window.localStorage.getItem("currentPage")),
        });

        const offset = (this.state.currentPage - 1) * 12;
        this.setState({
          currentProducts: this.state.allProducts.slice(offset, offset + 12),
        });

        this.setState({
          totalPages: Math.ceil(this.state.allProducts.length / 12),
        });

        $(".products-container__tooltip__sort-container__top__default").text(
          method.split("_").join(" ") + " " + order + "ending"
        );

        axios.get("/api/cart").then((response) => {
          $(".items-counter h5").text(response.data.itemsTotal);

          console.log(response);
        });
      }
    );
  };

  searchHandler = () => {



    $(".products-container").css("display","none")
    this.setState(
      {
        searchQuery: document.querySelector(".search-container__input").value.split(" "),
        
      },
      

      this.searchEngine, 

    );
  };

  searchEngine = () => {

    function hammingDistance(str1, str2) {
      var dist = 0;
      str1 = str1.toLowerCase();
      str2 = str2.toLowerCase();
      for (var i = 0, j = Math.max(str1.length, str2.length); i < j; i++) {
        if (!str1[i] || !str2[i] || str1[i] !== str2[i]) {
          dist++;
        }
      }
      return dist;
    }

    console.log(this.state.searchQuery);
    let query = this.state.searchQuery;

    this.setState({
      allProducts: this.state.products.filter(function (item) {
        if (
          query[0] != ""
        ) {
          let index = [];

          for (var i = 0; i < query.length; i++) {
            if (
              item.tags.findIndex((x) =>
                hammingDistance(x, query[i]) <= 1
                  ? true
                  : false
              ) > -1
            ) {
              index.push(1);
            }

            console.log(query[i]);
          }
          console.log(index);

          console.log(index.length);
          console.log(query.length);

          
          if (index.length <  query.length) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }

      }),
    }, () => {
      console.log(this.state.allProducts.length)
      if (this.state.allProducts.length == 0) {
        $(".search-no-results").addClass("active")
      }
    });
    


    $(".products-container").css("display","grid")
  }

  SortPickerHandler = () => {
    $(".products-container__tooltip__sort-container .arrow").toggleClass(
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
                (category === "all" || category.startsWith("search")
                  ? filteredProduct.category
                  : category)
              );
            }),
          });

          this.setState({ allProducts: this.state.products });

          this.searchHandler();



          this.sortArray("product_name", "asc");
          console.log("line");
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

  filterHandler = () => {
    $(".products-container__tooltip__filter-container__dashboard").toggleClass(
      "active"
    );
    $(".products-container__tooltip__filter-container__top .arrow").toggleClass(
      "active"
    );
  };

  selectFilterHandler = (event) => {
    if (!event.classList) {
      if (!event.target.checked) {
        this.state.filters.push({
          filters: [event.target.name, event.target.value],
        });
      } else {
        const index = this.state.filters.findIndex(
          (x) => x.filters[1] === event.target.value
        );

        if (index > -1) {
          this.state.filters.splice(index, 1);
        }
      }
    } else {
      const index = this.state.filters.findIndex(
        (x) => x.filters[0] === $(event).attr("name")
      );

      if (index > -1) {
        this.state.filters.splice(index, 1);
      }

      this.state.filters.push({
        filters: [
          $(event).attr("name"),
          $(".price-slider__inputs__start").val() +
            "," +
            $(".price-slider__inputs__end").val(),
        ],
      });
    }

    this.setState(this.state.filters);

    const filtersObject = this.state.filters;

    this.setState({
      allProducts: this.state.products.filter(function (item) {
        if (filtersObject.length > 0) {
          for (var i = 0; i < filtersObject.length; i++) {
            if (filtersObject[i].filters[0] === "price") {
              console.log(filtersObject[i].filters[1].split(",")[0]);
              console.log(filtersObject[i].filters[1].split(",")[1]);
              console.log(item.price);
              console.log(
                item.price !== undefined &&
                  item.price >= filtersObject[i].filters[1].split(",")[0] &&
                  item.price <= filtersObject[i].filters[1].split(",")[1]
              );
              if (
                item.price === undefined ||
                (item.price >= filtersObject[i].filters[1].split(",")[0] &&
                  item.price <= filtersObject[i].filters[1].split(",")[1])
              ) {
                console.log("fffalse");
                return true;
              } else {
                console.log("tttruee");
                return false;
              }
            } else {
              if (
                item[filtersObject[i].filters[0]] !== undefined &&
                item[filtersObject[i].filters[0]] == filtersObject[i].filters[1]
              ) {
                return false;
              } else {
                return true;
              }
            }
          }
        } else {
          return true;
        }
      }),
    });

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

    $(document).on('click', (event) => {

      
      if ($(event.target).closest('.products-container__tooltip__sort-container').length == 0) {

        $(".products-container__tooltip__sort-container .arrow").removeClass(
          "active"
        );
        $(".products-container__tooltip__sort-container__list").removeClass(
          "active"
        );
      } else {
        $(".products-container__tooltip__sort-container .arrow").toggleClass(
          "active"
        );
        $(".products-container__tooltip__sort-container__list").toggleClass(
          "active"
        );
      }
      

      if ($(event.target).closest('.products-container__tooltip__filter-container').length == 0) {

        $(".products-container__tooltip__filter-container__dashboard").removeClass(
          "active"
        );
        $(".products-container__tooltip__filter-container__top .arrow").removeClass(
          "active"
        );
      }
      

      
    })

    $(".search-container__arrow").on("click", () => this.props.history.push('/shop/search&' + $('.search-container__input').val().split(" ").join("&")));
    console.log(this.props.match.params.category)
    $(".search-container__input").keyup((event) => {
      if (event.which === 13)
      {
        this.props.history.push('/shop/search&' + $('.search-container__input').val().split(" ").join("&"));
    }
  })
        
    const { allProducts, currentProducts, currentPage } = this.state;

    localStorage.setItem("currentPage", JSON.stringify(currentPage));

    if (allProducts.length === 0) return null;

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
          <div className="products-container__list__product__label__price-container">
            <h3
              className={
                product.discount_val > 0
                  ? "products-container__list__product__label__price-container__old-price"
                  : "products-container__list__product__label__price-container__price"
              }
            >
              {product.price} PLN
            </h3>
            <h3 className="products-container__list__product__label__price-container__new-price">
              {product.discount_val > 0
                ? product.price - product.discount_val + " PLN"
                : ""}
            </h3>
          </div>
        </div>
      </NavLink>
    ));

    const ProductsContainerTitle = () => {
      if (this.props.match.params.category.startsWith("search")) {
        return <h4>Search results for: {$(".search-container__input").val()}</h4>
      } else {
        return <h4>Collection</h4>
      }
    }

    return (
      <Aux>

        <Pagination
          totalRecords={this.state.allProducts.length}
          pageLimit={12}
          pageNeighbours={1}
          onPageChanged={this.onPageChanged}
          allProductsKey={this.state.allProducts.length}
        />
        <div className="products-container">
          <div className="products-container__tooltip">
            <ProductsContainerTitle />
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
                    this.sortArray("product_name", "asc");
                    this.SortPickerHandler();
                  }}
                >
                  <h2>product name ascending</h2>
                </li>
                <li
                  onClick={() => {
                    this.sortArray("product_name", "desc");
                    this.SortPickerHandler();
                  }}
                >
                  <h2>product name descending</h2>
                </li>
                <li
                  onClick={() => {
                    this.sortArray("price", "asc");
                    this.SortPickerHandler();
                  }}
                >
                  <h2>price ascending</h2>
                </li>
                <li
                  onClick={() => {
                    this.sortArray("price", "desc");
                    this.SortPickerHandler();
                  }}
                >
                  <h2>price descending</h2>
                </li>
              </ul>
            </div>

            <div className="products-container__tooltip__filter-container">
              <div
                className="products-container__tooltip__filter-container__top"
                onClick={this.filterHandler}
              >
                <h2 className="products-container__tooltip__filter-container__top__title">
                  Filter:
                </h2>

                <h2 className="products-container__tooltip__filter-container__top__value"></h2>
                <div className="arrow"></div>
              </div>
              <div className="products-container__tooltip__filter-container__dashboard">
                <div className="products-container__tooltip__filter-container__dashboard__price-container">
                  <h2 className="products-container__tooltip__filter-container__dashboard__price-container__title">
                    Price range:
                  </h2>
                  <PriceSlider
                    name="price"
                    minValue={Math.min.apply(
                      Math,
                      this.state.products.map(function (product) {
                        return product.price;
                      })
                    )}
                    maxValue={Math.max.apply(
                      Math,
                      this.state.products.map(function (product) {
                        return product.price;
                      })
                    )}
                    clickHandler={() =>
                      this.selectFilterHandler(
                        document.querySelector(".price-slider__inputs__start")
                      )
                    }
                    clickHandler={() =>
                      this.selectFilterHandler(
                        document.querySelector(".price-slider__inputs__end")
                      )
                    }
                  />
                </div>
                <div className="products-container__tooltip__filter-container__dashboard__material-container">
                  <h2 className="products-container__tooltip__filter-container__dashboard__material-container__title">
                    Material:
                  </h2>
                  <label>
                    <input
                      onChange={this.selectFilterHandler}
                      type="checkbox"
                      name="material"
                      value="gold"
                      defaultChecked="true"
                    />
                    <h2>Gold</h2>
                  </label>
                  <label>
                    <input
                      onChange={this.selectFilterHandler}
                      type="checkbox"
                      name="material"
                      value="silver"
                      defaultChecked="true"
                    />
                    <h2>Silver</h2>
                  </label>
                </div>
                <div className="products-container__tooltip__filter-container__dashboard__collection-container">
                  <h2 className="products-container__tooltip__filter-container__dashboard__collection-container__title">
                    Collection:
                  </h2>
                  <label>
                    <input
                      onChange={this.selectFilterHandler}
                      type="checkbox"
                      name="collection_name"
                      value="Casablanca"
                      defaultChecked="true"
                    />
                    <h2>Casablanca</h2>
                  </label>
                  <label>
                    <input
                      onChange={this.selectFilterHandler}
                      type="checkbox"
                      name="collection_name"
                      value="Marocco"
                      defaultChecked="true"
                    />
                    <h2>Marocco</h2>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="products-container__list">{products}</div>
        </div>
      </Aux>
    );
  }
}

export default withRouter(ProductList);
