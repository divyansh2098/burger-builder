import React from 'react'
import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
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
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render(){
        return (
            <Aux>
                <Toolbar toggle = {this.toggleSideDrawer} isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer show = {this.state.showSideDrawer} click = {this.hideSideDrawerHandler} isAuthenticated={this.props.isAuthenticated}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
const mapStatetoProps = state => {
    return {
        isAuthenticated: state.auth.tokenId !== null
    }
}
export default connect(mapStatetoProps)(layout); 