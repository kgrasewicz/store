import React from "react";
import PopUp from "../Shop/Popup"
import InputForm from "../Shop/InputForm"
import $ from "jquery"

const newsletterInfo = () => {

  function newsletterHandler () {
    $(".newsletter").toggleClass("active")
  }

  function sendSubscription () {
    $(".newsletter").toggleClass("active")
  }

  return (
    <div className="newsletter-info">
      <div className="newsletter-info__carousel info-font">Subscribe to our <b className="newsletter-info__carousel__link" onClick={newsletterHandler}>newsletter</b> and get 15% discount for first purchase!</div>

      <PopUp popClass="newsletter" handler={newsletterHandler}>
          <h2>
            Enter your email address and subscribe to our newsletter.
          </h2>
          <div className="newsletter__checkbox-container">
          <input type="checkbox" />
          <h3>I understand and agree to <a className="link-2 link" href="#">terms and conditions</a> of subscription.</h3>
          </div>
          <InputForm
            handler={sendSubscription}
            class="pop__content__button pop"
            type="text"
            name="email"
            placeholder="Enter your email"
          >
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
              <path
                className="pop__content__button__svg__arrow active"
                d="M0,229.5h311.1L168.3,372.3L204,408l204-204L204,0l-35.7,35.7l142.8,142.8H0L0,229.5z"
              />
              <path
                className="pop__content__button__svg__tick"
                d="M9.5,224.5l133.2,133.5l255.8-255.5l-36.7-36.2L142.7,285l-97-97L9.5,224.5z"
              />
            </svg>
          </InputForm>
        </PopUp>

    </div>
  );
};

export default newsletterInfo;
