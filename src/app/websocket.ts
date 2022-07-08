import { setAutomations, setEntries } from './automationSlice'
import { setDevices, setDevice } from './deviceSlice'
import { setUserData } from './userSlice'
import { store } from './store'
import { Automation, Device, Entry, Theme } from '../types'
import { setOptions } from '../components/selects'
let ws: WebSocket

enum WSEvent {
    HomeData = 'homeData',
    UserData = 'userData',
    StateUpdate = 'stateUpdate',
}

interface HomeData {
    event: WSEvent.HomeData
    data: {
        devices: Device[]
        automations: Automation[]
        entries: { [id: string]: Entry }
    }
}

interface UserData {
    event: WSEvent.UserData
    data: {
        mode: Theme
        room: string
        layout: string[]
    }
}

interface StateUpdate {
    event: WSEvent.StateUpdate
    id: string
    index: number
    data: any
}

type WSMessage = HomeData | UserData | StateUpdate

export const send = (data: object) => ws.send(JSON.stringify(data))

export const connectWebsocket = () => {
    if (ws?.readyState === 0 || ws?.readyState === 1) return
    ws = new WebSocket('ws://localhost:9000')

    ws.onopen = () => console.log('WebSocket Connected.')
    ws.onclose = () => setTimeout(connectWebsocket, 10000)
    ws.onerror = e => setTimeout(connectWebsocket, 10000)
    ws.onmessage = e => {
        const json = JSON.parse(e.data) as WSMessage
        console.log(json)
        switch (json.event) {
            case WSEvent.HomeData:
                setOptions(json.data.devices)
                store.dispatch(setDevices(json.data.devices))
                store.dispatch(setAutomations(json.data.automations))
                store.dispatch(setEntries(json.data.entries))
                break
            case WSEvent.UserData:
                store.dispatch(setUserData(json.data))
                break
            case WSEvent.StateUpdate:
                store.dispatch(setDevice(json))
                break
            default:
                break
        }
    }
}
