import React, {  createContext, useContext, useReducer } from 'react';
 import reducer from "../reducer/cartReducer";
import { useEffect } from 'react';



 const CartContext =createContext();

// const getLocalCartData = () => {
//   let localCartData = localStorage.getItem("thapaCart");
//   if (localCartData === []) {
//     return [];
//   } else {
//     return JSON.parse(localCartData);
//   }
// };
  //  const getLocalCartData = () => {
  //   const newcartData = localStorage.getItem('cart');
  //   if(Array.isArray(newcartData) && newcartData.length === 0){
  //     return [];
  //   } else {
  //     return JSON.parse(newcartData);
  //   }
  //  }
  const getLocalCartData = () => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      try {
        const parsedData = JSON.parse(cartData);
        if (Array.isArray(parsedData)) {
          return parsedData;
        }
      } catch (error) {
        console.error('Parsing error on getLocalCartData:', error);
      }
    }
    return []; // Return an empty array if there's no data, it's null, or parsing fails
  };
 
 // Create context
        const initialState={
            // cart:[],
            cart:getLocalCartData(),
            total_item:0,
            total_amount:0,
           shipping_fee:50000,

        };


// 1.=> create cotext
//2.=> create provider






// Create provider
const CartProvider=({children})=>{


const[state,dispatch]=useReducer(reducer,initialState)


const addToCart  = (id,color,amount,product) =>{
    dispatch({ type:"ADD_TO_CART", payload:{id,color,amount,product}});
}; 

const removeItem=(id )=>{
  dispatch({ type:"REMOVE_CART_ITEM",payload: id})
}
 const setIncrease=(id)=>{
dispatch({ type :"SET_INCREASE" ,payload:id})
 }
  const setDecrease=(id)=>{
dispatch({type: "SET_DECREASE" ,payload:id})
  }


const clearCart =()=>{
   dispatch({type:"CLEAR_CART"})
}
useEffect(() => {
  // dispatch({ type: "CART_TOTAL_ITEM" });
  // dispatch({ type: "CART_TOTAL_PRICE"  });
  dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

  localStorage.setItem("thapaCart", JSON.stringify(state.cart));
}, [state.cart]);


  

    return(
   <CartContext.Provider value={{...state,addToCart,removeItem,clearCart,setDecrease,setIncrease}}>
      {children}
   </CartContext.Provider>);
 }  

 //global context hook
  const useCartContext=()=>{
    return useContext(CartContext);
  };
  
export  {CartProvider,useCartContext};
//in index.js