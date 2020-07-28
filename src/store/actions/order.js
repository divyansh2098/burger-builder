import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'
const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurger = (orderData,tokenId) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth='+tokenId,orderData)
        .then(response=>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
            alert("Order Placed")
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error));
        })
    }
}
export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrderSuccess = (orderData) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orderData: orderData
    }   
}
export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrder = (tokenId,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('/orders.json?auth=' + tokenId +'&orderBy="userId"&equalTo="' + userId + '"')
        .then(res=>{
            let orderData = []
            for(let i in res.data){
                orderData.push({
                        ...res.data[i],
                        key: i
                    }
                )
            }
            dispatch(fetchOrderSuccess(orderData));
        })
        .catch(err=>{
            dispatch(fetchOrderFail(err))
        })
    }
}