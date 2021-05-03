import React, {useEffect, useRef, useLayoutEffect} from "react";
import { Slider, RangeSlider } from 'rsuite';

function PriceSlider (props) {
    const [value, setValue] = React.useState([props.minValue, props.maxValue]);

 
  //   useLayoutEffect(() => {
  //     props.clickHandlerStart()
  //     props.clickHandlerEnd()
  //  }, [value]);


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
            onClick={props.clickHandler}
            onDrop={props.clickHandler}
            onMouseUp={props.clickHandler}
          />
        </div>
        <div className="price-slider__inputs">
            <input
            className="price-slider__inputs__start price-slider__inputs__child"
              min={props.minValue}
              max={props.maxValue}
              name="price"
              value={value[0]}
              onChange={nextValue => {
                const [start, end] = value;
                
                setValue([+nextValue.target.value, end]);
                setTimeout( () => props.clickHandler(), 2000)
              }}

              
            />
            <h2>to</h2>
            <input
            className="price-slider__inputs__end price-slider__inputs__child"
              min={props.minValue}
              max={props.maxValue}
              name="price"
              value={value[1]}
              onChange={nextValue => {
                const [start, end] = value;
                
                setValue([start, +nextValue.target.value]);

                
                setTimeout( () => props.clickHandler(), 2000)
              }}


            />
        </div>
      </div>
    );
  }

  export default PriceSlider;