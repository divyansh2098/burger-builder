import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './Build Control/Build Control'
const buildControls = (props) => {
    let controls = Object.keys(props.ingredients).map(ing=>{
        return <BuildControl 
        type = {ing} 
        count = {props.ingredients[ing]} 
        key = {ing} 
        inc={()=>props.inc(ing)} 
        dec={()=>props.dec(ing)} />
    })
    return(
        <div className = {classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls}
            <button className={classes.OrderButton} disabled = {!props.purchasable} onClick = {props.order}>
                {props.isAuthenticated ? 'Order Now' : 'SignUp to Order Now'}
            </button>
        </div>
    );
}

export default buildControls;