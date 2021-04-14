import React from "react";
import Aux from "react-aux";

const popUp = (props) => {


  return (
    <Aux>
      <div className={props.popClass + " pop__bcg pop"}></div>
      <div className={props.popClass + " pop__content pop"}>
        {props.children}
        <div className={props.popClass + " pop__close pop"} onClick={props.handler}>
          <svg
            className={props.popClass}
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
      </div>
    </Aux>
  );
};

export default popUp;
