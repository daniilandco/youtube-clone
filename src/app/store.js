import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({ user: userReducer })
export const store = configureStore({ reducer: rootReducer })
