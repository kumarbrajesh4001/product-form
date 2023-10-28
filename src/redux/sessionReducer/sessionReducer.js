import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};

const createAuthSlice = {
  name: "product_form",
  initialState,
  reducers: {
    setProductList(state, action) {
      state.productList = action.payload;
    },
    setEditProduct(state, action) {
      state.productList[action.payload[0]] = action.payload[1];
    },
    setDeleteProduct(state, action) {
      state.productList =  state.productList.filter((_, ind) => ind !== action.payload);
    },
  },
};

const sessionReducer = createSlice(createAuthSlice);

export const { setProductList, setEditProduct, setDeleteProduct } =
  sessionReducer.actions;

export default sessionReducer.reducer;
