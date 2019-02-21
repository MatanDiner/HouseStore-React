import React from 'react'
import FurnitureItem from './FurnitureItem/FurnitureItem'
import classes from './FurnitureItems.css';

const furnitureItems = (props) =>{

const furnitureItemsList = <div className={classes.FurnitureItems}>{props.furnitureItems.map(furnitureItem=>(


                     <FurnitureItem  key={furnitureItem.id}
                                     name = {furnitureItem.name}
                                     price = {furnitureItem.price} 
                                     Inventory = {furnitureItem.inventory}
                                     Category = {furnitureItem.category}
                                     imgName = {furnitureItem.imgName}
                                     cart={furnitureItem.cart}
                                     addToCartChanged = {()=>props.addToCartChanged(furnitureItem.id)}
                                     from = {props.from}
                                     removeFromCart = {()=>props.removeFromCart(furnitureItem.id)}
                                     buyClicked = {()=>props.buyClicked(furnitureItem)}
    />
   
))   
}</div>
return furnitureItemsList


} 


export default furnitureItems