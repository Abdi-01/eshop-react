export const loginAction = (data) => {
    console.log("Data dari page LOGIN", data);
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const updateCartAction = (cart) => {
    console.log('dari ui',cart)
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