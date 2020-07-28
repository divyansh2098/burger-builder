import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
export const add_ingredient = (ingName) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}
export const delete_ingredient = (ingName) => {
    return{
        type: actionTypes.DELETE_INGREDIENT,
        ingredientName: ingName
    }
}
export const set_ingredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetch_ingredients_failed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response=>{
            dispatch(set_ingredients(response.data));
        })
        .catch(error=>{
            dispatch(fetch_ingredients_failed())
        })
    }
}
export const fetchIngredientFailed = () =>{ 
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}