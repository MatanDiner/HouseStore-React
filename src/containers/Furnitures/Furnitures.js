import React, { Component } from 'react'
import FurnitureItems from '../../components/FurnitureItems/FurnitureItems'
import Aux from '../../hoc/Aux'
import axios from '../../order-axios'
import withErrorHandler from '../../WithErrorHandler/WithErrorHandler'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Furnitures extends Component {


    componentDidMount() {
        this.props.onSetStoreFurnitures(this.props.token, this.props.userId);
        this.props.onSetInventoryItems();
        this.props.onLoad();
    }


    addToCartChangedHandler = (id) => {
        const Fid = id;
        const furnituresDataName = this.props.furnituresDataName;
        const isAdded = true;
        this.props.onUpdateCart(isAdded, Fid,furnituresDataName );
    }

    buyClickedHandler = (furnitureItem) => {
        this.props.onBuyItemFromCart(furnitureItem,"/");
        this.props.history.push('/Sell');
    }

    render() {


        let furnitures = <Spinner />
        if (this.props.storeFurnitures) {
            const furnitureItems = [];
            const furArr = this.props.storeFurnitures[0]["data"];
            for (let key in furArr) {
                if(!this.props.inventoryError && this.props.inventoryData){
                    furArr[key]["inventory"] = this.props.inventoryData[key];
                }
                furnitureItems.push(furArr[key]);
            }
                furnitures = <FurnitureItems from="fur" furnitureItems={furnitureItems}
                    addToCartChanged={this.addToCartChangedHandler}
                    buyClicked={this.buyClickedHandler}
                />
        }
        return (
            <Aux>
                {furnitures}
            </Aux>

        );
    }


}


const mapStateToProps = state => {
    return {
        storeFurnitures: state.furnitures.furnitures,
        error: state.furnitures.error,
        token: state.auth.token,
        userId: state.auth.userId,
        furnituresDataName: state.furnitures.furnituresDataName,
        inventoryData:state.furnitures.inventoryData,
        inventoryError:state.furnitures.inventoryError
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetStoreFurnitures: (token, userId) => dispatch(action.setStoreFurnitures(token, userId)),
        onUpdateCart: (isAdded, Fid,furnituresDataName) => dispatch(action.isFurnitureAddedToCart(isAdded, Fid,furnituresDataName)),
        onBuyItemFromCart: (item,pathRedirect) => dispatch(action.buyItemFromCart(item,pathRedirect)),
        onSetInventoryItems:()=>dispatch(action.setInventory()),
        onLoad : ()=>dispatch(action.update_purchase())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Furnitures, axios));
