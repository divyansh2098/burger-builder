import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
const navigationitems = (props) =>{
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem>:null}
            {!props.isAuth ? <NavigationItem link="/login">Authenticate</NavigationItem>:
                <NavigationItem link="/logout">Logout</NavigationItem>
            }
        </ul>
    )
}
export default navigationitems