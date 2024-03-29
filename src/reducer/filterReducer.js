const filterReducer = (state, action) => {
    switch (action.type) {
        
     


        
     
      
  case "LOAD_FILTER_PRODUCTS":
  
  let priceArr= action.payload.map((currElem) => currElem.price);
    
 let maxPrice=Math.max(...priceArr)
 

       return {
              ...state,
                filter_products: [...action.payload],
               all_products: [...action.payload],
               filters:{...state.filters,maxPrice,price:maxPrice},
        };
  
   case "SET_GRID_VIEW":
        return {
                ...state,
              grid_view: true,
        };

   case "SET_LIST_VIEW":
        return {
                ...state,
                grid_view: false,
          };


     case "GET_SORT_VALUE":
         
  //  let userSortValue=document.getElementById("sort");
  //  let sort_value =userSortValue.options[userSortValue.selectedIndex].value;
  
     return{
              ...state,
               sorting_value:action.payload,
            };

   case  "SORTING_PRODUCTS":
         let newSortData;
         const {filter_products,sorting_value}=state;
         let tempSortProduct=[...filter_products];

    const sortingProducts = (a,b)=>{ 
      
      if (sorting_value==="lowest"){
   
       return a.price -b.price;
       }
      
    if (sorting_value==="highest"){
      
      return b.price -a.price;
       }
         
 //localCompare()=> method for strig comparison
   if (sorting_value==="a-z"){
       
       return a.name.localeCompare(b.name);
       }

       if (sorting_value === "z-a") {
        return b.name.localeCompare(a.name);
      }
    }
      newSortData = tempSortProduct.sort(sortingProducts);
     
      return {
                ...state,
             filter_products: newSortData,
      };

      case "UPDATE_SEARCH_TERM":
      
      return {
               ...state,
                searchTerm: action.payload,
           };

     case "UPDATE_FILTERS_VALUE":
        
            const{name,value}=action.payload;
     return{
              ...state,
              filters:{
                       ...state.filters,
                        [name]:value,
                       },
            }


      case "FILTER_PRODUCTS":

           let {all_products}=state;
           let tempFilterProduct=[...all_products];

      const {text,category,company,color,price}=state.filters;
 

      if(text) {

                 tempFilterProduct=tempFilterProduct.filter((currElem)=>{
       return currElem.name.toLowerCase().includes(text);
           });
         }

     if(category !=="All" ) {

            tempFilterProduct=tempFilterProduct.filter((currElem)=>{
       return currElem.category === category;
            });
         }

         if (company !== "All") {
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
          );
        }
        if (color !== "All") {
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.colors.includes(color)
          );
        }
           
       if (price===0){
        tempFilterProduct=tempFilterProduct.filter((currElem)=> currElem.price === price);
       } 
        else{

        tempFilterProduct=tempFilterProduct.filter((currElem)=> currElem.price <= price);

        }



         return {
          ...state,
         filter_products: tempFilterProduct,
      };
      // case "CLEAR_FILTERS":
      //   return {
      //     ...state,
      //     filters: {
      //       ...state.filters,
      //       text: "",
      //       category: "all",
      //       company: "all",
      //       color: "all",
      //       // maxPrice: 0,
      //       price: 0,
      //     //  minPrice: state.filters.maxPrice,
      //     },
      //     filter_products: state.all_products,
      //   };

      case "CLEAR_FILTERS":
        return {
          ...state,
          filters: {
            ...state.filters,
            text: "",
            category: "All",
            company: "All",
            color: "All",
            price: state.filters.maxPrice,
          },
        
        };
       

      default:
      return state;
    }  
};

  export default filterReducer;
