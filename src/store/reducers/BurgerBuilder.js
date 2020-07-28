import * as actionTypes from '../actions/actionTypes'
import updateState from '../actions/utility'
const initialState = {
    ingredients: null,
    error:false,
    total_price : 4
}
const INGREDIENT_PRICE = {
    meat: 1.3,
    bacon: 0.7,
    salad: 0.5,
    cheese: 0.5
}
const addIngredient = (state,action) => {
    const updatedIngredients = {
        ...state.ingredients,
        [action.ingredientName] : state.ingredients[action.ingredientName] + 1,
    }
    const updatedPrice = state.total_price + INGREDIENT_PRICE[action.ingredientName]
    return {
       ingredients: updatedIngredients,
       total_price: updatedPrice
    }
}
const deleteIngredient = (state,action) => {
    const updatedIngredients = {
        ...state.ingredients,
        [action.ingredientName] : 
        state.ingredients[action.ingredientName] > 0 ? state.ingredients[action.ingredientName] - 1 : 0
    }
    const updatedPrice = state.total_price - INGREDIENT_PRICE[action.ingredientName]
    return {
        ingredients: updatedIngredients,
        total_price: updatedPrice
    }
}



const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return updateState(state,addIngredient(state,action));
        case actionTypes.DELETE_INGREDIENT: return state.ingredients[action.ingredientName]===0 ? state : updateState(state,deleteIngredient(state,action))
        case actionTypes.SET_INGREDIENTS: return updateState(state,{ingredients: action.ingredients,error: false,total_price: 4})
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateState(state,{error:true})
        default: return state;
    }
}
export default reducer
