import { setDevices, setDevice } from './deviceSlice'
import { setUserData } from './userSlice'
import { store } from './store'
import { setAutomations, setEntries } from './automationSlice'
import { setAllDevices, setDimmingDevices, setRooms } from './selects'
let ws

export const send = data => ws.send(JSON.stringify(data))

export const connectWebsocket = () => {
    // webSocket = new WebSocket(location.origin.replace(/^http/, 'ws'))
    ws = new WebSocket('ws://192.168.2.181:9000')
    // ws = new WebSocket('ws://10.0.0.165:9000')

    ws.onopen = () => console.log('WebSocket Connected.')
    ws.onclose = () => setTimeout(connectWebsocket, 10000)
    ws.onmessage = e => {
        const json = JSON.parse(e.data)
        console.log(json)
        switch (json.event) {
            case 'homeData':
                const all = []
                const rooms = []
                const dimming = []
                json.data.devices.forEach(device => {
                    const options = device.data.map((d, i) => ({ id: device.id + '/' + i, name: d.name }))
                    if (device.type === 'dimmer') dimming.push(...options)
                    all.push(...options)
                    rooms[device.room] = device.room
                })

                store.dispatch(setDevices(json.data.devices))
                store.dispatch(setAutomations(json.data.automations))
                store.dispatch(setEntries(json.data.entries))
                setDimmingDevices(dimming)
                setAllDevices(all)
                setRooms([{id: 'home', name: 'Home'},...Object.keys(rooms).map(r => ({ id: r, name: r }))])
                break
            case 'userData':
                store.dispatch(setUserData(json.data))
                break
            case 'stateUpdate':
                store.dispatch(setDevice(json))
                break
            default:
                break
        }
    }
}
