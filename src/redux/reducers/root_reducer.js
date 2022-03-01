import { combineReducers } from "redux";
import cartReducer from "./cart_reducer";
import modalReducer from "./modal_reducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    cart: cartReducer
})

export default rootReducer;