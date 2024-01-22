import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filter_products, grid_view } = useFilterContext();

  if (grid_view === true) {
    return <GridView products={filter_products} />;
  }else if(grid_view === false) {
    return <ListView products={filter_products} />;
  }
  else {
    return <div>Loading...</div>;
  }
};

export default ProductList;
