import { combineReducers } from "redux";

import cartReducer from "./cart_reducer";
import modalReducer from "./modal_reducer";
import authReducer from "./auth_reducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    cart: cartReducer,
    user: authReducer,
})

export default rootReducer;