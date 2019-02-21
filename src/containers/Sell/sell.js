import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux'
import axios from '../../order-axios'
import withErrorHandler from '../../WithErrorHandler/WithErrorHandler'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import FurnitureItems from '../../components/FurnitureItems/FurnitureItems'
import Button from '../../components/UI/Button/Button'
import classes from './Sell.css'

import {Route,Redirect} from 'react-router-dom'

class Sell extends Component {

    state = {
        form: {
            first_name: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Name"
                },
                validation:{
                    required:true,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            last_name: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Last Name"
                },
                validation:{
                    required:true,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                validation:{
                    required:true,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            city: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "City"
                },
                validation:{
                    required:true,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            phone: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "tel",
                    placeholder: "Phone"
                },
                validation:{
                    required:true,
                    maxLength:10,
                    minLength:10
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false
            },
            card_number: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Card Number"
                },
                validation:{
                    required:true,
                    maxLength:16
                },
                valid:false,
                touched:false
            }
        },
        formIsValid:false,
    }



    onSubmitForm = (e) =>{
         e.preventDefault();
         const itemDetails = {...this.props.item[0]};
         const privateDetails = {};
         const form = {...this.state.form};
         for(let identifier in form){
            privateDetails[identifier] = form[identifier].value;
         }
         
        const orderDetails ={
            itemDetails:itemDetails,
            privateDetails:privateDetails,
            userId:this.props.userId
        }  
          this.props.onPurchased(orderDetails,this.props.token,this.props.furnituresDataName,this.props.pathRedirect);
        }


    checkValidation = (value,rules) =>{
        if(!rules){
            return;
        }
         let isValid = true;
         if(rules.required){
            isValid = value.trim() !== '' && isValid;
         }
         if(rules.maxLength){
            isValid = value.length<=rules.maxLength && isValid;
         }
         if(rules.minLength){
            isValid = value.length>=rules.minLength && isValid;
         }

         return isValid;
    }

    changeHandler = (e,identifier) =>{
        const form = {...this.state.form};
        form[identifier].value = e.target.value;
        form[identifier].touched = true;
        form[identifier].valid = this.checkValidation(form[identifier].value,form[identifier].validation);

        let formIsValid = true;
        for(var i in form){
            formIsValid = form[i].valid && formIsValid;
        }
        this.setState({
            form:form,
            formIsValid:formIsValid
        });
    }

    render() {
        function FormElement(_key, _element) {
            this.key = _key;
            this.element = _element;
        }

        let formElementArr = [];
        for (var key in this.state.form) {
            const formElement = new FormElement(key, this.state.form[key]);
            formElementArr.push(formElement);
        }
        let form = null;
        let message = null;
        if(this.props.error){
            message = <label className={classes.errorLabel}>There was an error in the proccess,please try again later.</label>
        }
        form = (
            <form className={classes.form} onSubmit={this.onSubmitForm}>
                <div className={classes.elementsDiv}>
                    {formElementArr.map(formElement => {
                        return <Input key={formElement.key}
                            elementType={formElement.element.elementType}
                            value={formElement.element.value}
                            elementConfig={formElement.element.elementConfig}
                            isValid = {formElement.element.valid}
                            touched = {formElement.element.touched}
                            shouldValid = {formElement.element.validation}
                            changed = {(event)=>this.changeHandler(event,formElement.key)}
                        />
                    })}
                    <div className={classes.buttonDiv}>
                        <Button disabled={!this.state.formIsValid} btnType="Success">Submit</Button>
                    </div>
                    <div>
                        {message}
                    </div>
                </div>
            </form>
        )
        
        let purchasedRedirect = null;
        if(this.props.purchased && this.props.goBackToRedirectPath){
            purchasedRedirect = <Redirect to={this.props.goBackToRedirectPath}/>;
        } 
        let sell = <Spinner />
        if (this.props.item) {
            sell =(
                <div>
                    <FurnitureItems from="sell" furnitureItems={this.props.item}/>
                    {form}
                    {purchasedRedirect}
                </div>
            ) 
        }
        return (
            <Aux>
                {sell}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        item: state.cart.item,
        purchased:state.order.purchased,
        error:state.order.error,
        token: state.auth.token,
        userId: state.auth.userId,
        furnituresDataName: state.furnitures.furnituresDataName,
        pathRedirect:state.cart.pathRedirect,
        goBackToRedirectPath:state.order.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
           onPurchased : (order,token,furnituresDataName,pathRedirect)=>dispatch(action.addOrder(order,token,furnituresDataName,pathRedirect))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sell);