import React from 'react'
import classes from './Order.module.css'
const order = (props) =>{
    const ingredients_array = Object.keys(props.ingredients).map(ingredient=>{
        return <p className={classes.Ingredient} key={ingredient}>{ingredient + "("+ props.ingredients[ingredient] +")"}</p>
    }) 
    return (
        <div className={classes.Order}>
            <h4>Order-{props.index}</h4>
            <section>
                <p><strong>Ingredients: </strong></p>
                {ingredients_array}
            </section>
            <section>
            <p><strong>Price: ${props.price.toFixed(2)}</strong></p>
            </section>
        </div>
    )
}
export default order;