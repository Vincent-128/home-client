import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        mode: 'carbon',
        room: 'home',
        layout: [],
    },
    reducers: {
        setUserData: (_state, action) => {
            return action.payload
        },
    },
})

export const getLayout = state => state.user.layout
export const { setUserData } = userSlice.actions

export default userSlice.reducer
