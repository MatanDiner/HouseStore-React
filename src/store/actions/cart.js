import * as actionType from './actionType'
import axios from '../../order-axios'


export const buyItemFromCart = (item,pathRedirect) =>{
const itemInArr = [];
itemInArr[0] = item;
return {
type:actionType.BUY_ITEM_FROM_CART,
item:itemInArr,
pathRedirect:pathRedirect
};
}

export const removeFromCart = (Fid,furnituresDataName) =>{
  return dispatch=>{
    axios.put('FurnituresJSON/'+furnituresDataName+ '/data' + '/f' + Fid + '/cart' + '.json' , false )
          .then(res=>{
            dispatch(setCartFurnitures(furnituresDataName));
          })
          .catch(error=>{
            console.log(error);
          })

        }
}


const setCartFurnituresSuccess = (cartFurnitures) =>{
    return{
        type:actionType.SET_CART_FURNITURES_SUCCESS,
        cartFurnitures:cartFurnitures
    };
}



export const setCartFurnitures = (furnituresDataName) =>{

return dispatch=>{
axios.get('FurnituresJSON/'+furnituresDataName+ '/data.json')
     .then(response=>{
       let cartFurnitures = null;
       if(response.data){
          cartFurnitures = [];
         for(let key in response.data){
           if(response.data[key].cart){
          cartFurnitures.push(response.data[key]);
           }
         }
        }
        dispatch(setCartFurnituresSuccess(cartFurnitures));
     }) 
     .catch(error=>{
      console.log(error);
     })


}

}
