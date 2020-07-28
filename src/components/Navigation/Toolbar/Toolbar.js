import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const ToolBar = (props) => { 
    return(
        <div className = {classes.Toolbar}>
            <DrawerToggle toggle = {props.toggle}/>
            <Logo height = "80%"/>
            <nav>
                <NavigationItems isAuth = {props.isAuthenticated}/>
            </nav>
        </div>
    )
}
export default ToolBar