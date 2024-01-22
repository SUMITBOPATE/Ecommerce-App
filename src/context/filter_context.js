import { createContext,useContext, useReducer,useEffect } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducer/filterReducer"; 

//create a context 
 const FilterContext =createContext();

 const initialState = {
    filter_products:[],
    all_products :[],
    grid_view:true,
    sorting_value: "lowest",
  filters:{
   text:"",
   category:"All",
   company :"All",
   color:"All",
   maxPrice:"0",
   minPrice:"0",
   price:"0",
  },
   };






///filterprovider provides our state and dispatch function
// to all child componenets
 export const FilterContextProvider= ( {children}) => {
 const {products}=useProductContext();
 
 const [state,dispatch]=useReducer(reducer,initialState);
 //to set grid

 const setGridView =()=>{
    return dispatch ({ type : "SET_GRID_VIEW"});
 };
   const setListView =()=>{
      return dispatch({ type : "SET_LIST_VIEW"});
   };
   
//sorting function
   const sorting =(event)=>{
let userValue=event.target.value;
      return dispatch({ type :  "GET_SORT_VALUE",payload:userValue});
   }

const updateFilterValue=(event)=>{
 let name=event.target.name;
 let value=event.target.value;

 return dispatch( { type:"UPDATE_FILTERS_VALUE" ,payload:{name,value}});
}

 // to clear the filter
 const clearFilters = () => {
   dispatch({ type: "CLEAR_FILTERS" });
 };

useEffect(()=>{
   dispatch({type:"FILTER_PRODUCTS"});
 dispatch({type:"SORTING_PRODUCTS", payload: products});
},[products,state.sorting_value,state.filters]);


 useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);   
 
 
 return (
    <div>
      <FilterContext.Provider value={{...state ,setGridView,setListView,sorting,updateFilterValue,clearFilters}} >
     {children}
      </FilterContext.Provider>
    </div>
  )
}
//custom hook to access filtercontext from any component
export const useFilterContext = () => {
    return useContext(FilterContext);
   };
