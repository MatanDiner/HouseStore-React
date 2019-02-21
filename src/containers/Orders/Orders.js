import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux'
import axios from '../../order-axios'
import withErrorHandler from '../../WithErrorHandler/WithErrorHandler'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import FurnitureItems from '../../components/FurnitureItems/FurnitureItems'
import classes from './Orders.css'


class Orders extends Component {

    componentDidMount() {
        this.props.onSetOrders(this.props.token,this.props.userId);
    }


    render() {
        let orders = <Spinner/>;
        if (this.props.orders) {

            const ordersArr = [];

            for (var i in this.props.orders) {

                ordersArr.push({
                    imgName:this.props.orders[i].itemDetails.imgName,
                    Product: this.props.orders[i].itemDetails.name,
                    Price: this.props.orders[i].itemDetails.price,
                    Name: this.props.orders[i].privateDetails.first_name + " " + this.props.orders[i].privateDetails.last_name,
                    address: this.props.orders[i].privateDetails.country + "," + this.props.orders[i].privateDetails.city,
                    card: this.props.orders[i].privateDetails.card_number
                })
            }
            orders = (
                
                    ordersArr.map((order,Index) => {
                        return <div key={Index} className={classes.Card}>
                            <table className={classes.cartTable}><tbody>
                                  <tr>
                                      <td colSpan="2"><img className={classes.picture} src={require('../../assets/images/'+order.imgName+'.jpg')}/></td>
                                  </tr>
                                  
                                { Object.keys(order).map((key,Index) => {
                                   if(Index>0){
                                    return <tr key={key}>
                                    <td>{key}:</td>
                                    <td>{order[key]}</td>
                                </tr>
                                   }
                                })
                            }
                                </tbody></table>
                        </div>
                    })
            )
        }
        

        return (
            <Aux>
                {orders}
            </Aux>
        )
    }


}

const mapPropsToState = state => {
    return {
        orders: state.order.orders,
        error: state.order.setOrdersError,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        onSetOrders: (token,userId) => dispatch(action.setOrders(token,userId))
    }
}


export default connect(mapPropsToState, mapPropsToDispatch)(withErrorHandler(Orders, axios));