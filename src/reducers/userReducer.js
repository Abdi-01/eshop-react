const INITIAL_STATE = {
    iduser: null,
    username: '',
    email: '',
    age: null,
    city: '',
    role: '',
    status_id: null,
    status: '',
    cart: []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    console.log("Data dari action", action);
    switch (action.type) {
        case "LOGIN_SUCCESS":
            // delete action.payload.password; // menghapus property password dari payload
            console.log("Data dari Action", action);
            return { ...state, ...action.payload };
        case "UPDATE_CART":
            return { ...state, cart: action.payload };
        case "UPDATE_STATUS":
            return { ...state, status: action.payload };
        case "LOGOUT_SUCCESS":
            return INITIAL_STATE;
        default:
            return state;
    }
}