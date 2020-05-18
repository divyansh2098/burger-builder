import React from 'react'
import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
class layout extends React.Component{
    state = {
        showSideDrawer:false
    }
    hideSideDrawerHandler = ()=>{
        this.setState({
            showSideDrawer: false
        })
    }
    toggleSideDrawer = () => {
        this.setState((prevState,props)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render(){
        return (
            <Aux>
                <Toolbar toggle = {this.toggleSideDrawer}/>
                <SideDrawer show = {this.state.showSideDrawer} click = {this.hideSideDrawerHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default layout; 