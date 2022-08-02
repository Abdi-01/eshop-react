import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';
import reduxThunk from 'redux-thunk';
export const rootStore = configureStore({
    // ⬇️ untuk menggabungkan semua reducer yg telah dibuat
    reducer: {
        userReducer
    }
}, applyMiddleware(reduxThunk));