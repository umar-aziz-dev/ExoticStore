import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./UserSlice/index.js"
import superReducer from "./SuperSlice/index.js"
import sellerReducer from "./SelllerSlice/index.js"

const Store = configureStore(
    {
        reducer:{
            auth:authReducer,
            SuperSlice:superReducer,
            Product:sellerReducer,
        }
    }
)
export default Store