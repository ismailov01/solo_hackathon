import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { API } from '../helpers/const';

export const adminContext =  createContext()

const INIT_STATE = {
    products: null,
    productToEdit: null,
}

const reducer = (state=INIT_STATE, action) => {
    switch(action.type){
        case "GET_PRODUCTS":
            return {...state, products: action.payload}
        case 'GET_PRODUCT_TO_EDIT': 
            return {...state, productToEdit: action.payload}
        case 'CLEAR_STATE':
            return {...state, productToEdit: action.payload}
        default: 
            return state;
    }
}


const AdminContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    //Create
    const addProduct = async (product) => {
        try{
            const response = await axios.post(API, product)
            console.log(response);
        }catch(e){
            console.log(e);
        }
    }

    //Read
    const getProducts = async () => {
        try{
            const response = await axios(API)
            let action = {
                type: "GET_PRODUCTS",
                payload: response.data,
            }
            dispatch(action)
            getProducts()
        }catch(e){
            console.log(e);
        }
    }

    //Update
    const getProductToEdit = async (id) => {
        try{
            const response = await axios(`${API}/${id}`)
            let action = {
                type: 'GET_PRODUCT_TO_EDIT',
                payload: response.data,
            }
            dispatch(action)
        }catch(e){
            console.log(e);
        }
    }

    const saveEditedProduct = async (editedProduct) => {
        try{
            const response = await axios.patch(`${API}/${editedProduct.id}`, editedProduct)
            getProducts()
            clearState()
        }catch(e){
            console.log(e);
        }
    }

    const clearState = async () => {
        let action = {
            type: 'CLEAR_STATE',
            payload: null,
        }
        dispatch(action)
    }
    //Delete 
    const deleteProduct = async (id) => {
        try{
            const response = await axios.delete(`${API}/${id}`)
            getProducts()
        }catch(e){
            console.log(e);
        }
    }


    return (
        <adminContext.Provider
        value={{
            addProduct: addProduct,
            getProducts: getProducts,
            getProductToEdit: getProductToEdit,
            saveEditedProduct: saveEditedProduct,
            clearState: clearState,
            deleteProduct: deleteProduct,
            products: state.products,
            productToEdit: state.productToEdit,
        }}
        >
            {props.children}
        </adminContext.Provider>
    );
};

export default AdminContextProvider;