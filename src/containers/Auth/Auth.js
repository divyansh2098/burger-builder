import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import {auth} from '../../store/actions/index'
import {connect} from 'react-redux'
import LoadSpinner from '../../components/UI/LoadSpinner/LoadSpinner'
const email_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
class Auth extends Component{
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: false,
                    isEmail: true
                },
                valid: null
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: false,
                    minLength: 6
                },
                valid: null
            },
        },
        isSignUp: true
    }
    AuthHandler = () => {
        this.props.authenticate(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
        this.props.history.push('/')
    }
    changeAuthMethod = () => {
        this.setState(prevState=>{
            return {
                ...prevState,
                isSignUp: !prevState.isSignUp
            }
        })
    }
    inputChangedHandler = (event,id) => {
        const updatedControls = {
            ...this.state.controls
        }
        const updatedTuple = {
            ...this.state.controls[id]
        }
        updatedTuple['value'] = event.target.value
        updatedTuple.valid = this.checkValidity(updatedTuple.value,updatedTuple.validation,updatedTuple.elementConfig.type)
        updatedControls[id] = updatedTuple
        this.setState({
            controls: updatedControls
        })
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
        if(rules.isEmail)
        {
            isValid = Boolean(isValid & email_regex.test(value));
            //console.log(email_regex.test(value))
        }
        if(rules.minLength)
        {
            isValid = Boolean(isValid & value.length >= rules.minLength)
        }
        return isValid;
    }
    render(){
        const formElementArray = []
        for(let key in this.state.controls){
            //console.log(key)
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let Form =  <Aux>
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
                    <Button btnType="Success" clicked = {this.AuthHandler}>{this.state.isSignUp ? "Sign Up" : "Sign In"}</Button>
                    <h5>{this.state.isSignUp ? "Already have an account?" : "Don't have an account?"}</h5>
                    <Button btnType="Info" clicked={this.changeAuthMethod}>{this.state.isSignUp ? "Go to Sign in" : "Go to Sign Up"}</Button>
                </Aux>
        if(this.props.loading)
        {
            Form = <LoadSpinner />
        }
        let message = <h4>{this.state.isSignUp ? "Sign Up" : "Login"}</h4>
        // if(this.props.error)
        // {
        //     message = <h4>{this.props.error}</h4>
        // } 
        return (
            <div className = {classes.Auth}>
                {message}
                {Form}            
            </div>
        );
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        authenticate: (email,password,isSignUp) => dispatch(auth(email,password,isSignUp))
    }
}
const mapStatetoProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(Auth);