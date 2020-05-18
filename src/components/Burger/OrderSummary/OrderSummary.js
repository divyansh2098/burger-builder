import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
 import Button from '../../UI/Button/Button'
//import {Button} from 'reactstrap'
const orderSummary = (props) => {
    const summary = Object.keys(props.ingredients).map(ing=>{
        return <li key = {ing}><span style={{textTransform: 'capitalize'}}>{ing}</span>:{props.ingredients[ing]}</li>
    })
    return (
        <Aux>
            <h3>Your Order is Ready!!!</h3>
            <p>These are the ingredients you chose</p>
            <ul>
                {summary}
            </ul>
            <p>Total Price: <strong>{props.price.toFixed(2)}$</strong></p>
            <p>Checkout?</p>
            <Button btnType = "Danger" clicked = {props.cancel}>CANCEL</Button>
            <Button btnType = "Success" clicked = {props.continue}>CONTINUE</Button>

        </Aux>
    );
}

export default orderSummary;