import React from 'react'
import styled from "styled-components";
import { useFilterContext } from '../context/filter_context';
import { FaCheck } from 'react-icons/fa';
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";
const FilterSection = () => {
 
 //for search functionalities//
       const {filters:{text,category,color,price ,maxPrice,minPrice},
        all_products,
        updateFilterValue ,        
          clearFilters} =useFilterContext();
//to get unique data for each filter
       const getUniqueData=( data,property)=>{
          let newVal= data.map((currElem)=> {
        return  currElem[property];
         });


       if (property=== "colors"){
          newVal= newVal.flat();
                }  
        return ( newVal = ["All" ,...new Set(newVal)]);
       
  //  console.log(newVal);

      }
  


//for  filters we need unique data//

  const categoryOnlyData =getUniqueData(all_products,"category")
  const companyData =getUniqueData(all_products,"company");
  const colorsData =getUniqueData(all_products,"colors");

  return (

    <Wrapper>
    <div className="filter-search">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="text"
          placeholder="Search"
          value={text}
           onChange={updateFilterValue}
        />
      </form>
    </div>
  
    <div className="filter-category">
        <h3>Category</h3>
        <div>
          {
           categoryOnlyData.map((currElem,index)=>{
            return <button key={index}
                type='button'
                name='category'
                value={currElem}
                className={currElem === category ? "active" : ""}
                onClick={updateFilterValue}>
              {currElem}
            </button>
           })


          }
        </div>


    </div>        
    <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onClick={updateFilterValue}>
            {companyData.map((currElem, index) => {
              return (
         <option 
                key={index} 
                value={currElem}
                 name="company">          
                  {currElem}
                </option>
              );
            })}
          </select>
        </form>


  <div className='filters-colors colors'>
               <h3>Colors</h3>
    <div className='filter-colors-style'>
             {colorsData.map((currColor,index)=>{
              if (currColor ==="All"){
                return <button 
                key={index}
                value={currColor}
                name='color'
                type="button"
                className="color-all--style" 
                onClick={updateFilterValue}>All
                </button>
              }
            return <button 
                    key={index}
                    value={currColor}
                    name='color'
                    type="button"
                    className={color === currColor ? "btnStyle active" : "btnStyle"} 
                    style={{backgroundColor:currColor}} 
                    onClick={updateFilterValue}>
                      {color === currColor ? <FaCheck className='checkStyle'/>:null }</button> 
               })}
     </div>

  </div>

  <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>

    {/* <div className="filter-shipping">
      <p>Free Shipping </p>
      <input
        type="checkbox"
        name="shipping"
        className="checkbox"
        onChange={updateFilters}
        checked={shipping}
      />
    </div> */}

    <div className="filter-clear">
      <Button className="btn" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
