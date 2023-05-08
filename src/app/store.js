import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'

const rootReducer = combineReducers({ user: userReducer })
export const store = configureStore({ reducer: rootReducer })
