import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import classes from './Orders.module.css'
import LoadSpinner from '../../components/UI/LoadSpinner/LoadSpinner'
import {connect} from 'react-redux'
import {fetchOrder} from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

class order extends Component{
    state = {
        orders : [],
        loading: false
    }
    componentDidMount(){
        console.log(this.props.userId);
        this.props.fetchOrders_init(this.props.tokenId,this.props.userId);
    }
    render(){
        let loading = null;
        let orders = null;
        if(this.props.loading)
            loading = <LoadSpinner />
        if(this.props.orders){
            orders = this.props.orders.map((order,i)=>{
                return <Order key={order.key} ingredients = {order.ingredients} price = {order.price} index={i+1} />
            }
            )
        }
        return (
            <div className = {classes.Orders}>
                {loading}
                {orders}
            </div>
        )
    }
}
const mapStatetoProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        fetchOrders_init : (tokenId,userId) => dispatch(fetchOrder(tokenId,userId))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(order,axios))