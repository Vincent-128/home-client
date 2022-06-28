import { configureStore } from '@reduxjs/toolkit'
import automationReducer from './automationSlice'
import deviceReducer from './deviceSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        automations: automationReducer,
        devices: deviceReducer,
        user: userReducer,
    },
})
