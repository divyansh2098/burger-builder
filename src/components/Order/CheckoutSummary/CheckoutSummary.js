import React from 'react'
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.module.css'
import Button from '../../UI/Button/Button'
const checkoutSummary = (props) =>{ 
    return(
        <div className = {classes.CheckoutSummary}>
            <h1>We hope you like the food!!</h1>
            <div style={{margin:'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button btnType = "Danger" clicked = {props.cancel}>Cancel</Button>
            <Button btnType = "Success" clicked = {props.continue}>Continue</Button>
        </div>
    )
}

export default checkoutSummary