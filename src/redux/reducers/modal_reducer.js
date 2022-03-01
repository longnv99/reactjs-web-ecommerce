import { SET_MODAL, REMOVE_MODAL } from '../types/modal_types'

const initialState = {
    pathName: null
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL: {
            return {
                ...state,
                pathName: action.payload,
            }
        }
        case REMOVE_MODAL: {
            return {
                ...state,
                pathName: null
            }
        }
        default:
            return state
    }
}

export default modalReducer;