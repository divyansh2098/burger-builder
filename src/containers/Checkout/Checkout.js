import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route,Redirect} from 'react-router-dom'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import OrderForm from './OrderForm/OrderForm'
import {connect} from 'react-redux'
class Checkout extends Component{
    // componentDidMount(){
    //     const searchParams = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     searchParams.forEach((value,key)=>{
    //         if(key!=='total_price'){
    //             ingredients[key] = +value
    //         }
    //     })
    //     this.setState({
    //         ingredients: ingredients,
    //         total_price: +searchParams.get('total_price')
    //     })
    // }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact-info');
    } 
    render(){
        let summary = <Redirect to="/" />
        if(this.props.ings){
            summary = (
                <Aux>
                    <CheckoutSummary ingredients={this.props.ings} cancel = {this.checkoutCancelledHandler} continue = {this.checkoutContinueHandler}/>
                    <Route path = {this.props.match.url + '/contact-info'}
                     render = {(props)=> <OrderForm ingredients={this.props.ings} total_price={this.props.total_price} {...props}/>}/>
                </Aux>
            )
        }
        return(
            summary
        );
    }
}
const mapStatetoProps = state=> {
    return {
        ings: state.burger.ingredients,
        total_price: state.burger.total_price
    }
}
export default connect(mapStatetoProps)(Checkout)