import { createSlice, createSelector } from '@reduxjs/toolkit'

export const deviceSlice = createSlice({
    name: 'devices',
    initialState: [],
    reducers: {
        setDevices: (_state, action) => {
            return action.payload
        },
        setDevice: (state, action) => {
            const { id, index, data } = action.payload
            const device = state.find(d => d.id === id)
            if (device) {
                device.data[index] = { ...device.data[index], ...data }
            }
        },
    },
})

export const getDevices = state => state.devices
export const getDeviceRoom = (state, id) => state.devices.find(d => d.id === id).room
export const getDeviceType = (state, id) => state.devices.find(d => d.id === id).type
export const getDeviceData = (state, id, index) => state.devices.find(d => d.id === id).data[index]

export const makeSelectDevice = () => {
    return createSelector(getDeviceRoom, getDeviceType, getDeviceData, (room, type, data) => {
        return { room, type, ...data }
    })
}

export const { setDevices, setDevice } = deviceSlice.actions
export default deviceSlice.reducer
