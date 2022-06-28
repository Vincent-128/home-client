import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Theme } from '../types'
import { RootState } from './store'

interface Props {
    mode: Theme
    room: string
    layout: string[]
}

const initialState: Props = {
    mode: Theme.Carbon,
    room: 'home',
    layout: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (_state, action: PayloadAction<Props>) => {
            return action.payload
        },
    },
})

export const getLayout = (state: RootState) => state.user.layout
export const { setUserData } = userSlice.actions

export default userSlice.reducer
