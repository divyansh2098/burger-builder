import * as actionTypes from '../actions/actionTypes'
import updateState from '../actions/utility'

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_START: return updateState(state,{loading:true})
        case actionTypes.PURCHASE_BURGER_SUCCESS: return updateState(state,{loading:false})
        case actionTypes.PURCHASE_BURGER_FAIL: return updateState(state,{loading:false})
        case actionTypes.FETCH_ORDERS_START: return updateState(state,{loading:true})
        case actionTypes.FETCH_ORDERS_SUCCESS: return updateState(state,{orders:action.orderData,loading:false})
        case actionTypes.FETCH_ORDERS_FAIL: return updateState(state,{loading:false})
        default: return state
    }
}
export default reducer