import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Route} from 'react-router-dom'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import {checkAuthState} from './store/actions/index'
import { connect } from 'react-redux';
class App extends Component{
  componentDidMount(){
    console.log('App.js')
    this.props.autoAuthcheck();
  }
    render(){
      return (
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/login" component={Auth} />
          <Route path="/logout" component={Logout} />
        </Layout>
      );
    }
}
const mapDispatchtoProps = dispatch => {
  return {
    autoAuthcheck: () => dispatch(checkAuthState())
  }
}
export default connect(null,mapDispatchtoProps)(App);
