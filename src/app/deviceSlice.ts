import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit'
import { Device } from '../types'
import { RootState } from './store'

const initialState: Device[] = []

export const deviceSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        setDevices: (_state, action: PayloadAction<Device[]>) => {
            return action.payload
        },
        setDevice: (state, action: PayloadAction<{ id: string; index: number; data: any }>) => {
            const { id, index, data } = action.payload
            const device = state.find(d => d.id === id)
            if (device) {
                device.data[index] = { ...device.data[index], ...data }
            }
        },
    },
})

export const getDevices = (state: RootState) => state.devices
export const getDeviceRoom = (state: RootState, id: string) => state.devices.find(d => d.id === id)!.room
export const getDeviceType = (state: RootState, id: string) => state.devices.find(d => d.id === id)!.type
export const getDeviceData = (state: RootState, id: string, index: number) => state.devices.find(d => d.id === id)!.data[index]

export const makeSelectDevice = () => {
    return createSelector(getDeviceRoom, getDeviceType, getDeviceData, (room, type, data) => {
        return { room, type, ...data }
    })
}

export const { setDevices, setDevice } = deviceSlice.actions
export default deviceSlice.reducer
