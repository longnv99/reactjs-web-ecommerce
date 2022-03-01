import { ADD_TO_CART, UPDATE_ITEM, REMOVE_ITEM } from '../types/cart_types'

export const addItem = (item) => {
    return {
        type: ADD_TO_CART,
        payload: item
    }
}

export const updateItem = (item) => {
    return {
        type: UPDATE_ITEM,
        payload: item
    }
}

export const removeItem = (item) => {
    return {
        type: REMOVE_ITEM,
        payload: item
    }
}