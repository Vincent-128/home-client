import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import automationReducer from './automationSlice'
import deviceReducer from './deviceSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        devices: deviceReducer,
        automations: automationReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
