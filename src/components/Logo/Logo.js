import React from 'react'
import burgerlogo from '../../assets/images/27.1 burger-logo.png.png'
import classes from './Logo.module.css'
const logo = (props) =>{
    return (
        <div className = {classes.Logo} style = {{height:props.height}}>
            <img src = {burgerlogo} alt="BurgerLogo"></img>
        </div>
    )
}
export default logo