import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout'
import Furnitures from './containers/Furnitures/Furnitures'
import { Route, Switch, withRouter ,Redirect} from 'react-router-dom'
import Cart from './containers/Cart/Cart'
import Sell from './containers/Sell/sell'
import Orders from './containers/Orders/Orders'
import ContactUs from './containers/ContactUs/ContactUs'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as action from './store/actions/index'
class App extends Component {

  componentDidMount(){
 this.props.onTryAutoSiunUp();
  }
  
  render() {
    let redirect = null;
    let routes = (
      <Switch>
        <Route path="/Auth" component={Auth} />
        <Redirect to="/Auth"/>
      </Switch>
    );

   if (this.props.isAuthenticated && !this.props.isSignUp) {
       routes = (
        <Switch>
          <Route path="/Auth" component={Auth} />
          <Route path="/logout" component={Logout}/>
          <Route path="/ContactUs" component={ContactUs} />
          <Route path="/Orders"  component={Orders} />
          <Route path="/Sell"  component={Sell} />
          <Route path="/Cart" component={Cart} />
          <Route path="/" component={Furnitures} />
        </Switch>
      )
    }


    return (
      <div className="App">
         {redirect}
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token !== null,
    isSignUp:state.auth.isSignUp
  };
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSiunUp : ()=>dispatch(action.authCheckState())
  };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))
