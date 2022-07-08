import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';

export const rootStore = configureStore({
    // ⬇️ untuk menggabungkan semua reducer yg telah dibuat
    reducer: {
        userReducer
    }
})