import * as types from '../types/auth_types'


const initialState = {
    loading: false,
    user: null,
    error: null,
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.REGISTER_START:
        case types.LOGIN_START:
        case types.LOGOUT_START:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            }
        case types.LOGOUT_SUCCESS: 
            return {
                ...state,
                user: null,
                error: null,
            }
        case types.REGISTER_FAIL:
        case types.LOGIN_FAIL:
        case types.LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case types.SET_USER: 
            return {
                ...state,
                user: action.payload,
            }
        default: 
            return state;
    }
}

export default authReducer