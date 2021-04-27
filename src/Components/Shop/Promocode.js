import React from "react";


function Promocode (props) {


    return (

        <div className="cart-container__table__code">
            <h3>Promocode</h3>
            <input type="text" placeholder="Enter code"/>
            <button className="cart-container__table__code__button" onClick={props.codeHandler}>Apply</button>
            <h3 className="cart-container__table__code__error">Entered promocode is not valid.</h3>
        </div>

    )
    }
    export default Promocode;