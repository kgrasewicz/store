import React from "react";
import Aux from "react-aux";
import { NavLink } from "react-router-dom";
import $ from "jquery";

const search = (props) => {
  function showSearchBar(event) {
    $(".search-container").toggleClass("active");
    $(".search-container__input").focus();
  }

  function showSearchTooltip(event) {
    console.log(event.target.value);
    if (event.target.value !== "") {
      $(".search-container__close, .search-container__arrow").addClass("show");
    } else {
      $(".search-container__close, .search-container__arrow").removeClass(
        "show"
      );
    }
  }

  return (
    <Aux>
      <div className="search-container">
        <div className="search-container__icon" onClick={showSearchBar}>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 511.999 511.999"
            enableBackground="new 0 0 511.999 511.999;"
          >
            <path
              d="M508.874,478.708L360.142,329.976c28.21-34.827,45.191-79.103,45.191-127.309c0-111.75-90.917-202.667-202.667-202.667
			S0,90.917,0,202.667s90.917,202.667,202.667,202.667c48.206,0,92.482-16.982,127.309-45.191l148.732,148.732
			c4.167,4.165,10.919,4.165,15.086,0l15.081-15.082C513.04,489.627,513.04,482.873,508.874,478.708z M202.667,362.667
			c-88.229,0-160-71.771-160-160s71.771-160,160-160s160,71.771,160,160S290.896,362.667,202.667,362.667z"
            />
          </svg>
        </div>

        <input
          className="search-container__input"
          onFocus={() => $(".search-container").toggleClass("focused")}
          onChange={showSearchTooltip}
          type="text"
          placeholder="Search...."
        />
        <NavLink to="/shop/all">
          <div
            className="search-container__close"
            onClick={() => {
              $(".search-container__input").val("");
              $(".search-container__close, .search-container__arrow").removeClass("show");
              $(".search-container").toggleClass("active")

            }}
          >
            <svg
              id="pop__svg"
              enableBackground="new 0 0 413.348 413.348"
              height="512"
              viewBox="0 0 413.348 413.348"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
            </svg>
          </div>
        </NavLink>
        <div className="search-container__arrow">
          <svg
            version="1.1"
            id="pop__content__button__svg"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="408px"
            height="408px"
            viewBox="0 0 408 408"
            enableBackground="new 0 0 408 408;"
          >
            	<path d="M8.6,216.2l342.6,0.4L179.5,388.2c6.7,8.8,8.3,11.5,13.9,17.8c2.1,2.4-1.4-1.6,1.3,1.5L399.3,204L197.3,2
		c-14.7,13.8-11.8,10.9-17.8,17.4l171.6,172H8.6"/>
          </svg>
        </div>
      </div>
    </Aux>
  );
};

export default search;
