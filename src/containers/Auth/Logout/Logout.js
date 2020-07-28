import React, { Component } from 'react'
import {invalidateUser} from '../../../store/actions/index'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
class Logout extends Component{
    componentDidMount(){
        this.props.Logout();
    }
    render(){
        return(
            <Redirect to="/login" />
        )
    }
}
const mapDispatchtoProps = dispatch => {
    return {
        Logout: () => dispatch(invalidateUser())
    }
}
export default connect(null,mapDispatchtoProps)(Logout)