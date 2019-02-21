import * as actionstype from './actionType'
import axios from '../../order-axios'

const setInventoryFail = () =>{
    return{
        type:actionstype.SET_INVENTORY_FAIL
    }
}

const setInventorySuccess = (inventoryData) =>{
    return{
        type:actionstype.SET_INVENTORY_SUCCESS,
        inventoryData:inventoryData
    }
}


export const setInventory = () =>{

return dispatch=>{
    axios.get('/Inventory.json')
         .then(response=>{
          dispatch(setInventorySuccess(response.data));
         })
         .catch(error=>{
          console.log(error);
          dispatch(setInventoryFail())
         })
}

}


export const isFurnitureAddedToCart = (isAdded,Fid,furnituresDataName) =>{     
return dispatch=>{
    axios.put('FurnituresJSON/'+furnituresDataName+ '/data' + '/f' + Fid + '/cart' + '.json' , isAdded )
         .then(res=>{
         })
         .catch(err=>{
             console.log(err);
         })
}

}



const setStoreFurnituresSuccess = (furnitures) =>{
    const furnituresDataName = furnitures[0].id;
    return {
        type:actionstype.SET_STORE_FURNITURES_SUCCESS,
        furnitures:furnitures,
        furnituresDataName:furnituresDataName
    }
}

const setStoreFurnituresFail = () =>{
    return{
        type:actionstype.SET_STORE_FURNITURES_FAIL
    }
}

export const setStoreFurnitures = (token,userId) =>{

    return dispatch =>{
      
        const queryParams ='?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
        axios.get('/FurnituresJSON.json' + queryParams)
        .then(response=>{
            const furnitures=[];
            for(let key in response.data){
                furnitures.push({
                    ...response.data[key],
                    id:key 
                   })
                }
              dispatch(setStoreFurnituresSuccess(furnitures));   
        }
        )
        .catch(error=>{
            dispatch(setStoreFurnituresFail);
            console.log(error);
        })
     
    }


} 