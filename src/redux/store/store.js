import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../sessionReducer";

const store = configureStore({
    reducer:{
        product:sessionReducer
    }
});


export default store;