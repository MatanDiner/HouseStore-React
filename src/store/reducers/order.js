import * as actionType from '../actions/actionType'

const initialState = {

orders : [],
error:false,
purchased:false,
setOrdersError:false,
redirectPath:null
}

const orderReducer = (state=initialState,action) => {

switch(action.type){

case actionType.ADD_ORDER_SUCCESS : return addOrderSuccess(state,action);
case actionType.ADD_ORDER_FAIL: return addOrderFail(state,action);
case actionType.UPDATE_PURCHASE:return update_purchase(state,action);
case actionType.SET_ORDERS_SUCCESS:return setOrdersSuccess(state,action);
case actionType.SET_ORDERS_FAIL:return setOrdersFail(state,action);
case actionType.REDIRECT_PATH:return redirect(state,action);
default : return state;
}

}

const redirect = (state,action) =>{
  return{
    ...state,
    redirectPath:action.redirectPath
  }
}

const setOrdersFail = (state,action) =>{
  return{
    ...state,
    setOrdersError:true
  }

}

const setOrdersSuccess = (state,action) =>{
return{
  ...state,
  orders:action.orders,
  setOrdersError:false
}

}

const update_purchase = (state,action) =>{
  return{
     ...state,
     error:false,
     purchased:false,
     redirectPath:null
  } 
}

const addOrderSuccess = (state,action) =>{

return{
...state,
purchased:true
};
}

const addOrderFail = (state,action) =>{

return{
    ...state,
    error:true
};
}



export default orderReducer;