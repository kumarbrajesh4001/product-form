import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const RoutesComponent = () => {

    const navigate = useNavigate();

  const [productData, setProductData] = useState({
    product_name: "",
    category_name: "",
    description: "",
    exp_date: "",
    cost_price: "",
    sell_price: "",
    discount: "",
    dis_sell_price: 0,
  });

  const [editId, setEditId] = useState();


    const editable = (param, ind) => () => {
        setProductData(param);
        setEditId(ind);
        navigate("/")
      };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProductForm
              productData={productData}
              setProductData={setProductData}
              editId={editId}
              setEditId={setEditId}
            />
          }
        />
        <Route
          path="/product-list"
          element={<ProductList editable={editable} />}
        />
      </Routes>
    </div>
  );
};

export default RoutesComponent;
