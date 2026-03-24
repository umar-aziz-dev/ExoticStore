import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./UserSlice/index.js"
import superReducer from "./SuperSlice/index.js"
import sellerReducer from "./SelllerSlice/index.js"
import userproductReducer from "./UserProductSlice/index.js"
import socialReducer from "./SuperSlice/SoicalLinkSlice.js"
import policyReducer from "./SuperSlice/PolicySlice.js"
import contactReducer from "./SuperSlice/ContactSlice.js"

const Store = configureStore(
    {
        reducer:{
            auth:authReducer,
            SuperSlice:superReducer,
            Product:sellerReducer,
            UserProduct:userproductReducer,
            Social:socialReducer,
            Policy:policyReducer,
            Contact:contactReducer,
        }
    }
)
export default Store