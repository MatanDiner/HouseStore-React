import React, { Component } from 'react'
import classes from './FurnitureItem.css'

class FrnitureItem extends Component {

      state = {
          disabled:false
      }
  
    clickedHandler = () =>{
        this.setState({
            disabled:true
        })
    }
    render() {
        const classesArr = [classes.Card,classes.cart_card]
        let div = null;
        let buy = null;
        let cardClass = classesArr[0];
        if (this.props.from === "cart") {
            cardClass = classesArr.join(" ");
            div = (
                <div>
                    <input type="button" className={classes.removeBTN} value = "Remove" onClick={this.props.removeFromCart} />
                </div>
            );
        }
        else if(this.props.from === "fur"){
            let disabled = false;
            if(this.props.cart || this.state.disabled){
                disabled = true;
            }
            const style = disabled?classes.addClicked:classes.addNotClicked;
            const text = disabled?"go to cart":"Add to cart";
            div = (
                <div>
                    <button className={style} disabled={disabled} onClick={(event)=>{this.props.addToCartChanged();this.clickedHandler()}}>{text}</button>
                </div>
            )
        }

        buy = (
            <div>
                <button className={classes.button} onClick={(event)=>this.props.buyClicked(event)}>Buy Now</button>
            </div>
        )
        if(this.props.from === "sell"){
            buy = null;
        }
      
         if(this.props.Inventory <= "0"){
             return null;
         }
        else 
        return (

            <div className={cardClass}>
               <div className={classes.table}>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <div>
                                    <img className={classes.picture} src={require('../../../assets/images/'+this.props.imgName+'.jpg')} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                {div}
                            </td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{this.props.name}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{this.props.price}</td>
                        </tr>
                        <tr>
                            <td>Inventory</td>
                            <td>{this.props.Inventory}</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>{this.props.Category}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className={classes.buy}>
                    {buy}
                </div>
            </div>
        );




    }

}



export default FrnitureItem;