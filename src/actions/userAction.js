import Axios from "axios";
import { API_URL } from "../helper";

export const loginAction = (data) => {
    console.log("Data dari page LOGIN", data);
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const loginMiddleware = (email, password) => {
    return async (dispatch) => {
        try {
            let res = await Axios.post(API_URL + `/auth/login`, {
                email, password
            });

            localStorage.setItem('eshopLog', res.data.token);
            delete res.data.token;
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data
            });
            return { success: true }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCartAction = (cart) => {
    console.log('dari ui', cart)
    return {
        type: "UPDATE_CART",
        payload: cart
    }
}

export const logoutAction = () => {
    localStorage.removeItem('eshopLog')
    return {
        type: "LOGOUT_SUCCESS"
    }
}