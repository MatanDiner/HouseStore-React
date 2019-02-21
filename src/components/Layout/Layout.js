import React,{Component} from 'react'
import Aux from '../../hoc/Aux'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer.js'
import Furnitures from '../../containers/Furnitures/Furnitures'
import classes from './Layout.css'
import {connect} from 'react-redux'
class Layout extends Component{

state = {
    showSideDrawer:false
}

closeSideDrawHandler = () =>{
this.setState({showSideDrawer:false});
}

SideDrawerToggleHandler = () =>{
    this.setState((prevState)=>{
       return {showSideDrawer:!prevState.showSideDrawer}
    })
}

render(){
    let showNavigations = false;
    if(!this.props.isSignUp && this.props.isAuthenticated){
        showNavigations = true;
    }
return(
<Aux>
    <div>
       <Toolbar isAuth={showNavigations} drawerToggleClicked={this.SideDrawerToggleHandler}/>
       <SideDrawer isAuth={showNavigations} open={this.state.showSideDrawer} closed ={this.closeSideDrawHandler}/>
    </div>
    <main className={classes.Content}>
        {this.props.children}
    </main>
</Aux> 
);
}

}

const mapStateToProps = state =>{
    return{
        isAuthenticated:state.auth.token !== null,
        isSignUp:state.auth.isSignUp
    };
}


export default connect(mapStateToProps)(Layout);