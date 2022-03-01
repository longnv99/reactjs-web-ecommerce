import { SET_MODAL, REMOVE_MODAL } from '../types/modal_types'

export const setModal = (pathName) => {
    return {
        type: SET_MODAL,
        payload: pathName,
    }
}

export const removeModal = () => {
    return {
        type: REMOVE_MODAL,
        payload: null,
    }
}