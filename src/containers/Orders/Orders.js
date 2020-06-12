import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import classes from './Orders.module.css'
import axios from '../../axios-orders'
import LoadSpinner from '../../components/UI/LoadSpinner/LoadSpinner'
class order extends Component{
    state = {
        orders : [],
        loading: false
    }
    componentDidMount(){
        this.setState({loading:true})
        axios.get('/orders.json')
        .then(res=>{
            let orderData = []
            for(let i in res.data){
                orderData.push({
                        ...res.data[i],
                        key: i
                    }
                )
            }
            this.setState({
                loading:false,
                orders: orderData 
            })
        })
        .catch(err=>{
            this.setState({loading:false})
        })
    }
    render(){
        let orders = this.state.orders.map((order,i)=>{
            return <Order key={order.key} ingredients = {order.ingredients} price = {order.price} index={i+1} />
        }
        )

        if(this.state.loading){
            orders = <LoadSpinner />
        }
        return (
            <div className = {classes.Orders}>
                {orders}
            </div>
        )
    }
}
export default order