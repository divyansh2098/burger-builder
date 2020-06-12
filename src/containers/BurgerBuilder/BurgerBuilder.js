import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import LoadSpinner from '../../components/UI/LoadSpinner/LoadSpinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICE = {
    meat: 1.3,
    bacon: 0.7,
    salad: 0.5,
    cheese: 0.5
}
class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        total_price: 4,
        purchasable: false,
        ordered: false,
        loading: false,
        error: false
    }
    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data});
        })
        .catch(error=>{
            this.setState({error:true})
        })
    }
    orderHandler = () => {
        this.setState({
            ordered: true
        })
    }
    cancelorderHandler = () => {
        this.setState({
            ordered: false
        })
    }
    continueorderHandler = () => {
        this.setState({loading:true});
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("total_price=" + encodeURIComponent(this.state.total_price))
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }
    updatePurchaseState = (ingredients) =>{
        const sum = Object.values(ingredients)
        .reduce((sum,el)=>{
            return sum+el;
        },0)
        this.setState({
            purchasable: sum>0
        })
    }
    incCount = (ing) => {
        const oldCount = this.state.ingredients[ing];
        const newCount = oldCount + 1;
        let ingredients = {...this.state.ingredients};
        ingredients[ing] = newCount;
        const oldPrice = this.state.total_price;
        const priceIncrease = INGREDIENT_PRICE[ing];
        const newPrice = oldPrice + priceIncrease;
        this.setState({
            ingredients: ingredients,
            total_price: newPrice
        })
        this.updatePurchaseState(ingredients);
    }
    decCount = (ing) => {
        let ingredients = {...this.state.ingredients};
        if(ingredients[ing]>0)
        {
            const oldCount = this.state.ingredients[ing];
            const newCount = oldCount - 1;
            ingredients[ing] = newCount;
            const oldPrice = this.state.total_price;
            const priceDecrease = INGREDIENT_PRICE[ing];
            const newPrice = oldPrice - priceDecrease;
            this.setState({
                ingredients: ingredients,
                total_price: newPrice
            })
        }
        this.updatePurchaseState(ingredients);
    }
    render(){
        let Ordersummary = null;
        let burger = <LoadSpinner />;
        if(this.state.error){
            console.log("Entered!!")
            burger = <p>Failed to fetch ingredients!!</p>
        }
        const ingredients = this.state.ingredients;
        if(ingredients){
            burger = <Aux>
                        <Burger ingredients = {ingredients}/>
                        <BuildControls 
                            ingredients = {ingredients} 
                            dec = {this.decCount} 
                            inc = {this.incCount}
                            price = {this.state.total_price}
                            purchasable = {this.state.purchasable}
                            order = {this.orderHandler}
                        />
                    </Aux> 
            Ordersummary = <OrderSummary 
                                ingredients = {this.state.ingredients} 
                                price = {this.state.total_price} 
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
export default WithErrorHandler(BurgerBuilder,axios);