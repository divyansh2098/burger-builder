import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import OrderForm from './OrderForm/OrderForm'

class Checkout extends Component{
    state = {
        ingredients: {
            meat:1,
            bacon:1,
            cheese:1,
            salad:1
        },
        total_price: 4.00
    }
    componentDidMount(){
        const searchParams = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        searchParams.forEach((value,key)=>{
            if(key!=='total_price'){
                ingredients[key] = +value
            }
        })
        this.setState({
            ingredients: ingredients,
            total_price: +searchParams.get('total_price')
        })
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact-info');
    } 
    render(){
        return(
            <Aux>
                <CheckoutSummary ingredients={this.state.ingredients} cancel = {this.checkoutCancelledHandler} continue = {this.checkoutContinueHandler}/>
                <Route path = {this.props.match.url + '/contact-info'}
                 render = {(props)=> <OrderForm ingredients={this.state.ingredients} total_price={this.state.total_price} {...props}/>}/>
                 />
            </Aux>
        )
    }
}
export default Checkout