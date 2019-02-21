import * as actionsType from '../actions/actionType'


const initialState = {
    cartFurnitures : null,
    item:null,
    pathRedirect:"/cart"
}

const reducer = (state = initialState,action) =>{

switch(action.type){

case actionsType.SET_CART_FURNITURES_SUCCESS : return setCartFurnituresSuccess(state,action);
case actionsType.BUY_ITEM_FROM_CART : return buyItemFromCart(state,action);
default:return state 
}

}

const buyItemFromCart = (state,action) =>{
return{
    ...state,
    item:action.item,
    pathRedirect:action.pathRedirect
}
}

const setCartFurnituresSuccess = (state,action) =>{
    return{
        ...state,
        cartFurnitures:action.cartFurnitures
    }
}

export default reducer;