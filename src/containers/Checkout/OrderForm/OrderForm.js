import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './OrderForm.module.css'
import axios from '../../../axios-orders'
import LoadSpinner from '../../../components/UI/LoadSpinner/LoadSpinner'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {purchaseBurger} from '../../../store/actions/index'
const email_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
class OrderForm extends Component{
    state = {
        orders:  {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: null
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: null
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: null
            },
            Country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: null
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: null
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest',display:'Fastest'},
                        {value:'cheapest',display:'Cheapest'}
                    ]
                },
                validation: {
                    required: false
                },
                valid: true
            }
        }
    }
    placeOrderHandler = () =>{
        let formData = {}
        for (let key in this.state.orders){
            formData[key] = this.state.orders[key].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customerInfo: formData,
            userId: this.props.userId
        }
        this.props.purchaseBurger(order,this.props.tokenId);
        this.props.history.push('/');
        // axios.post('/orders.json',order)
        // .then(response=>{
        //     this.setState({loading:false});
        //     this.props.history.push('/')
        // })
        // .catch(error=>{
        //     this.setState({loading:true});
        //     console.log(error);
        // })
    }
    checkValidity = (value,rules,type = null) => {
        let isValid = false
        //console.log(email_regex.test(value));
        if(rules.required){
            isValid = value !== ''
        }
        else{
            isValid = true
        }
        //console.log(type)
        if(type==='email')
        {
            isValid = Boolean(isValid & email_regex.test(value));
            //console.log(email_regex.test(value))
        }
        return isValid;
    }
    inputChangedHandler = (event,key) => {
        const updatedOrders = {
            ...this.state.orders
        }
        const updatedTuple = {
            ...this.state.orders[key]
        }
        updatedTuple['value'] = event.target.value
        updatedTuple.valid = this.checkValidity(updatedTuple.value,updatedTuple.validation,updatedTuple.elementConfig.type)
        updatedOrders[key] = updatedTuple
        this.setState({
            orders: updatedOrders
        })
    }
    render(){
        let Form = <LoadSpinner />
        const formElementArray = []
        for(let key in this.state.orders){
            //console.log(key)
            formElementArray.push({
                id: key,
                config: this.state.orders[key]
            })
        }
        if(!this.props.loading){
            Form =  <Aux>
                        <form>
                            {formElementArray.map(formElement=>{
                                return(
                                    <Input elementtype={formElement.config.elementType} elementconfig={formElement.config.elementConfig} 
                                    value = {formElement.config.value}
                                    key = {formElement.id} 
                                    change = {(event)=>this.inputChangedHandler(event,formElement.id)}
                                    validity = {formElement.config.valid} />
                                )
                            })}
                        </form>
                        <Button btnType="Success" clicked = {this.placeOrderHandler}>Order</Button>
                    </Aux> 
        }
        return (
            <div className = {classes.Order}>
                <h4>Order Form</h4>
                {Form}            
            </div>
        );
    }
}
const mapStatetoProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.total_price,
        loading: state.order.loading,
        userId: state.auth.userId,
        tokenId: state.auth.tokenId
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        purchaseBurger: (orderData,tokenId) => dispatch(purchaseBurger(orderData,tokenId)),
    }
} 
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(OrderForm,axios))