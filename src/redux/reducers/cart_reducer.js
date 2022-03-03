import * as types from '../types/cart_types'

const initialState = {
    cartItems: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TO_CART: {
            const newItem = action.payload;

            const duplicate = state.cartItems.filter(e => 
                e.pathName === newItem.pathName && e.color === newItem.color && e.size === newItem.size
            )
            if(duplicate.length > 0){
                state.cartItems = state.cartItems.filter(e => 
                    e.pathName !== newItem.pathName || e.color !== newItem.color || e.size !== newItem.size
                )
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems, 
                        {
                            id: duplicate[0].id,
                            pathName: newItem.pathName,
                            color: newItem.color,
                            size: newItem.size,
                            price: newItem.price,
                            quantity: newItem.quantity + duplicate[0].quantity
                        }
                    ]
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems, 
                        {
                            id: state.cartItems.length > 0 ? state.cartItems[state.cartItems.length - 1].id + 1 : 1,
                            ...action.payload
                        }
                    ],
                }
            }
        }
        case types.UPDATE_ITEM: {
            const newItem = action.payload
            const itemUpdate = state.cartItems.filter(e => 
                e.pathName === newItem.pathName && e.color === newItem.color && e.size === newItem.size
            )
            if(itemUpdate.length > 0) {
                state.cartItems = state.cartItems.filter(e => 
                    e.pathName !== newItem.pathName || e.color !== newItem.color || e.size !== newItem.size
                )
                return {
                    ...state,
                    cartItems: [
                        ...state.cartItems, 
                        {
                            id: itemUpdate[0].id,
                            pathName: newItem.pathName,
                            color: newItem.color,
                            size: newItem.size,
                            price: newItem.price,
                            quantity: newItem.quantity
                        }
                    ]
                }
            }else {
                return state
            }
        }
        case types.REMOVE_ITEM: {
            const item = action.payload
            return {
                ...state,
                cartItems: state.cartItems.filter(e => 
                    e.pathName !== item.pathName || e.color !== item.color || e.size !== item.size
                )
            }
        }
        case types.SET_CART: 
            return {
                ...state,
                cartItems: action.payload
            }
        default:
            return state
    }
}

export default cartReducer;