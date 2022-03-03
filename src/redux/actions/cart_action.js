import * as types from '../types/cart_types'

export const addItem = (item) => {
    return {
        type: types.ADD_TO_CART,
        payload: item
    }
}

export const updateItem = (item) => {
    return {
        type: types.UPDATE_ITEM,
        payload: item
    }
}

export const removeItem = (item) => {
    return {
        type: types.REMOVE_ITEM,
        payload: item
    }
}

export const setCart = (cartItems) => {
    return {
        type: types.SET_CART,
        payload: cartItems
    }
}