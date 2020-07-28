import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import LoadSpinner from '../../components/UI/LoadSpinner/LoadSpinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import {add_ingredient,delete_ingredient, initIngredients} from '../../store/actions/index'

class BurgerBuilder extends Component{
    state = {
        ordered: false,
    }
    componentDidMount(){
        if(this.props.ings===null)
            this.props.initIngredientsHandler()
    }
    orderHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ordered: true})
        }
        else{
            this.props.history.push('/login')
        }
    }
    cancelorderHandler = () => {
        this.setState({
            ordered: false
        })
    }
    continueorderHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        })
    }
    updatePurchaseState = (ingredients) =>{
        const sum = Object.values(ingredients)
        .reduce((sum,el)=>{
            return sum+el;
        },0)
        return sum>0;
    }
    // incCount = (ing) => {
    //     const oldCount = this.state.ingredients[ing];
    //     const newCount = oldCount + 1;
    //     let ingredients = {...this.state.ingredients};
    //     ingredients[ing] = newCount;
    //     const oldPrice = this.state.total_price;
    //     const priceIncrease = INGREDIENT_PRICE[ing];
    //     const newPrice = oldPrice + priceIncrease;
    //     this.setState({
    //         ingredients: ingredients,
    //         total_price: newPrice
    //     })
    //     this.updatePurchaseState(ingredients);
    // }
    // decCount = (ing) => {
    //     let ingredients = {...this.state.ingredients};
    //     if(ingredients[ing]>0)
    //     {
    //         const oldCount = this.state.ingredients[ing];
    //         const newCount = oldCount - 1;
    //         ingredients[ing] = newCount;
    //         const oldPrice = this.state.total_price;
    //         const priceDecrease = INGREDIENT_PRICE[ing];
    //         const newPrice = oldPrice - priceDecrease;
    //         this.setState({
    //             ingredients: ingredients,
    //             total_price: newPrice
    //         })
    //     }
    //     this.updatePurchaseState(ingredients);
    // }
    render(){
        let Ordersummary = null;
        let burger = <LoadSpinner />;
        if(this.props.error){
            console.log("Entered!!")
            burger = <p>Failed to fetch ingredients!!</p>
        }
        const ingredients = this.props.ings;
        if(ingredients){
            burger = <Aux>
                        <Burger ingredients = {ingredients}/>
                        <BuildControls 
                            ingredients = {ingredients} 
                            dec = {this.props.deleteIngredientHandler} 
                            inc = {this.props.addIngredientHandler}
                            price = {this.props.total_price}
                            isAuthenticated = {this.props.isAuthenticated}
                            purchasable = {this.updatePurchaseState(this.props.ings)}
                            order = {this.orderHandler}
                        />
                    </Aux> 
            Ordersummary = <OrderSummary 
                                ingredients = {this.props.ings} 
                                price = {this.props.total_price} 
                                cancel = {this.cancelorderHandler}
                                continue = {this.continueorderHandler} />
        }
        if(this.state.loading){
            Ordersummary = <LoadSpinner />
        }
        return (
            <Aux>
                <Modal show = {this.state.ordered} hideModal = {this.cancelorderHandler}>
                    {Ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStatetoProps = state => {
    return {
        ings: state.burger.ingredients,
        total_price: state.burger.total_price,
        error: state.burger.error,
        isAuthenticated: state.auth.tokenId !== null
    }
}
const mapDispatchtoProps = dispatch =>{
    return {
        addIngredientHandler: (ingName) => dispatch(add_ingredient(ingName)),
        deleteIngredientHandler: (ingName) => dispatch(delete_ingredient(ingName)),
        initIngredientsHandler : () => dispatch(initIngredients())
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(WithErrorHandler(BurgerBuilder,axios));