import * as types from "../types/auth_types";
import { auth, db } from '../../firebase/firebaseConfig'
import { setCart } from "./cart_action";

//register
const registerStart = () => ({
    type: types.REGISTER_START,
})

const registerSuccess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user
})

const registerError = (error) => ({
    type: types.REGISTER_FAIL,
    payload: error
})

//login
const loginStart = () => ({
    type: types.LOGIN_START,
})

const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user
})

const loginError = (error) => ({
    type: types.LOGIN_FAIL,
    payload: error
})

//logout
const logoutStart = () => ({
    type: types.LOGOUT_START,
})

const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS,
})

const logoutError = (error) => ({
    type: types.LOGOUT_FAIL,
    payload: error
})

//set user
export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user
})

export const registerInitiate = (email, password) => {
    return function(dispatch) {
        dispatch(registerStart())
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
            dispatch(registerSuccess(user))

            db.collection('user').doc(user.uid).set({
                email: user.email,
                cart: [],
            })
        })
        .catch(error => dispatch(registerError(error.message)))
    }
}

export const loginInitiate = (email, password) => {
    return function(dispatch) {
        dispatch(loginStart())
        auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
            dispatch(loginSuccess(user))

            db.collection('user').doc(user.uid).get()
            .then((snapshot) => {
                if(snapshot) {
                    dispatch(setCart(snapshot.data().cart))
                }
            })
        })
        .catch(error => dispatch(loginError(error.message)))
    }
}

export const logoutInitiate = () => {
    return function(dispatch) {
        dispatch(logoutStart())
        auth
        .signOut()
        .then((response) => {
            dispatch(logoutSuccess())
        })
        .catch(error => dispatch(logoutError(error.message)))
    }
}