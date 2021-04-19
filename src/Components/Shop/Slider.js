import React from "react";
import { Slider, RangeSlider } from 'rsuite';

function PriceSlider (props) {
    const [value, setValue] = React.useState([props.minValue, props.maxValue]);
    return (
      <div className="price-slider">
        <div className="price-slider__range">
          <RangeSlider
            progress
            style={{ marginTop: 16 }}
            value={value}
            step={(props.maxValue - props.minValue)/100}
            min={props.minValue}
            max={props.maxValue}
            onChange={value => {
              setValue(value);
            }}
          />
        </div>
        <div className="price-slider__inputs">
            <input
              min={props.minValue}
              max={props.maxValue}
              value={value[0]}
              onChange={nextValue => {
                const [start, end] = value;
                if (nextValue > end) {
                  return;
                }
                setValue([nextValue, end]);
              }}
            />
            <h2>to</h2>
            <input
              min={props.minValue}
              max={props.maxValue}
              value={value[1]}
              onChange={nextValue => {
                const [start, end] = value;
                if (start > nextValue) {
                  return;
                }
                setValue([start, nextValue]);
              }}
            />
        </div>
      </div>
    );
  }

  export default PriceSlider;