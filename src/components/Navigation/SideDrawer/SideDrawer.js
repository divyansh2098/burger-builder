import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/BackDrop/BackDrop'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
const sidedrawer = (props) =>{
    let style = [classes.SideDrawer];
    if(props.show)
    {
        style = style.concat(classes.Open);
    }
    else{
        style = style.concat(classes.Close)
    }
    return(
        <Aux>
            <BackDrop show ={props.show} hideModal={props.click}/>
            <div className={style.join(' ')}>
                <Logo height="11%"/>
                <nav>
                    <NavigationItems isAuth={props.isAuthenticated}/>
                </nav>
            </div>
        </Aux>
    )
}
export default sidedrawer