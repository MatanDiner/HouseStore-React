import * as actionType from './actionType'
import axios from '../../order-axios'

const setOrdersFail = () =>{
  return {
    type:actionType.SET_ORDERS_FAIL
  }
}


const setOrdersSuccess = (orders) =>{
  return {
    type:actionType.SET_ORDERS_SUCCESS,
    orders:orders
  }
}



export const setOrders = (token,userId) =>{
  return dispatch =>{
    const queryParams ='?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
    axios.get('orders.json' + queryParams)
    .then(response=>{
          const orders = [];
          for(let i in response.data) {
            orders.push(response.data[i]);
          }
          dispatch(setOrdersSuccess(orders));
    }
    )
    .catch(error=>{
        dispatch(setOrdersFail());
        console.log(error);
    })
 
}
}



export const update_purchase = () =>{

return{
  type:actionType.UPDATE_PURCHASE
}
}

const addOrderSuccess = (order) =>{
  
return{
  type:actionType.ADD_ORDER_SUCCESS,
  order:order
  }
}


const getInventory = (order,redirectPath) =>{

  return dispatch=>{
    let Inventory = order.itemDetails.inventory;
    axios.get('Inventory/f' + order.itemDetails.id + '.json')
    .then(response=>{
     if(response.data){
      Inventory = response.data - 1;
      dispatch(updateInventory(order,Inventory,redirectPath))
     }
    })
    .catch(error=>{
     console.log(error);
    })
  }
}

const updateInventory = (order,Inventory,redirectPath) =>{
return dispatch=>{
  axios.put('Inventory/f' + order.itemDetails.id + '.json' , Inventory )
  .then(res=>{
   dispatch(redirect(redirectPath))
  })
  .catch(err=>{
      console.log(err);
  })
}
}

const redirect = (redirectPath) =>{
  return{
    type:actionType.REDIRECT_PATH,
    redirectPath:redirectPath
  }
}


const removeFromCart = (order,furnituresDataName) =>{
  return dispatch=>{
    axios.put('FurnituresJSON/'+furnituresDataName+ '/data' + '/f' + order.itemDetails.id + '/cart' + '.json' , false )
         .then(res=>{
           dispatch(addOrderSuccess(order))
         })
         .catch(err=>{
             console.log(err);
         })  
}

}

const addOrderFail = (error) =>{
return{
    type:actionType.ADD_ORDER_FAIL,
    error:error
}
}

export const addOrder = (order,token,furnituresDataName,redirectPath) =>{

return dispatch=>{

axios.post('/orders.json?auth='+token,order)
      .then(response=>{
        dispatch(removeFromCart(order,furnituresDataName));
        dispatch(getInventory(order,redirectPath));
      })
      .catch(error=>{
        dispatch(addOrderFail(error));
      })

}
}