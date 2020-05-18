import React from 'react'
import BurgerIngredient from './BurgerIngredients/BurgerIngredient'
import classes from './Burger.module.css';
const Burger = (props) => {
    let ingredients = null;
    ingredients = Object.keys(props.ingredients).map(ing=>{
        return [...Array(props.ingredients[ing])].map((_,i)=>{
            return <BurgerIngredient key = {ing + i} type = {ing}/>
        })
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[])
    if(ingredients.length===0)
    {
        ingredients = <h3>Start Adding Ingredients!!</h3>
    }
    //console.log(ingredients);
    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type = 'top-bread'/>
            {ingredients}
            <BurgerIngredient type = 'bottom-bread'/>
        </div>
    )
}

export default Burger;