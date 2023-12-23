import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toastSlice'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer
  }
})

export { store }