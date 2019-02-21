import React,{Component} from 'react'
import axios from '../../order-axios'
import {connect} from 'react-redux'
import withErrorHandler from '../../WithErrorHandler/WithErrorHandler'
import * as action from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux'
import FurnitureItems from '../../components/FurnitureItems/FurnitureItems'

class Cart extends Component{

componentDidMount(){
    this.props.onLoad();
    this.props.onSetCartFurnitures(this.props.furnituresDataName);
    this.props.onSetInventoryItems();
}

removeFromCartHandler = (fId) =>{
this.props.onRemoveItemFromCart(fId,this.props.furnituresDataName);
}

buyClickedHandler = (furnitureItem) =>{
this.props.onBuyItemFromCart(furnitureItem,"/cart");    
this.props.history.push('/Sell');
}

render(){

let cartItems = <Spinner/>;

if(this.props.cartFurnitures){
    const cartArr = [...this.props.cartFurnitures];
    for (let key in cartArr) {
    if(!this.props.inventoryError && this.props.inventoryData){
        const id = cartArr[key]["id"];
        cartArr[key]["inventory"] = this.props.inventoryData["f" + id];
    }
}
     cartItems = <FurnitureItems from="cart" furnitureItems = {cartArr}
                                                 removeFromCart = {this.removeFromCartHandler} 
                                                 buyClicked = {this.buyClickedHandler} 
    />
}

    return(
        <Aux>
            {cartItems}
        </Aux>
    );
}

}

const mapStateToProps = state =>{
    return{
        cartFurnitures:state.cart.cartFurnitures,
        token: state.auth.token,
        userId:state.auth.userId,
        furnituresDataName: state.furnitures.furnituresDataName,
        inventoryData:state.furnitures.inventoryData,
        inventoryError:state.furnitures.inventoryError
    };
}

const mapDispatchToProps = dispatch =>{
    return{
       onSetCartFurnitures : (furnituresDataName)=>dispatch(action.setCartFurnitures(furnituresDataName)),
       onRemoveItemFromCart : (fid,furnituresDataName)=> dispatch(action.removeFromCart(fid,furnituresDataName)),
       onBuyItemFromCart : (item,pathRedirect)=>dispatch(action.buyItemFromCart(item,pathRedirect)),
       onLoad : ()=>dispatch(action.update_purchase()),
       onSetInventoryItems:()=>dispatch(action.setInventory())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Cart,axios))


