
import * as actionsType from '../actions/actionType'

const initialState = {
  furnitures:null,
  error:false,
  furnituresDataName:null,
  inventoryData:null,
  inventoryError:false
}

const reducer = (state=initialState,action) =>{

switch(action.type){
case actionsType.SET_STORE_FURNITURES_SUCCESS:return setStoreFurnituresSuccess(state,action);
case actionsType.SET_STORE_FURNITURES_FAIL:return setStoreFurnituresFail(state,action)
case actionsType.SET_INVENTORY_SUCCESS:return setInventorySuccess(state,action);
case actionsType.SET_INVENTORY_FAIL:return setInventoryFail(state,action)
default: return state

}

}


const setInventorySuccess = (state,action) =>{
  return{
    ...state,
    inventoryData:action.inventoryData,
    inventoryError:false
  }
}

const setInventoryFail = (state,action) =>{
  return{
    ...state,
    inventoryError:true
  }
}

const setStoreFurnituresSuccess = (state,action) =>{
return{
    ...state,
    furnitures:action.furnitures,
    error:false,
    furnituresDataName:action.furnituresDataName
};
}

const setStoreFurnituresFail = (state,action) =>{
return{...state,
       error:true 
};
}


export default reducer;