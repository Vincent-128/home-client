import { setAutomations, setEntries } from './automationSlice'
import { setDevices, setDevice } from './deviceSlice'
import { setUserData } from './userSlice'
import { store } from './store'
import { Automation, Device, Entry, Theme } from '../types'
let ws: WebSocket

enum WSEvent {
    homeData,
    userData,
    stateUpdate,
}

interface HomeData {
    event: WSEvent.homeData
    data: {
        devices: Device[]
        automations: Automation[]
        entries: { [id: string]: Entry }
    }
}

interface UserData {
    event: WSEvent.userData
    data: {
        mode: Theme
        room: string
        layout: string[]
    }
}

interface StateUpdate {
    event: WSEvent.stateUpdate
    id: string
    index: number
    data: any
}

type WSMessage = HomeData | UserData | StateUpdate

export const send = (data: string) => ws.send(JSON.stringify(data))

export const connectWebsocket = () => {
    ws = new WebSocket(location.origin.replace(/^http/, 'ws'))

    ws.onopen = () => console.log('WebSocket Connected.')
    ws.onclose = () => setTimeout(connectWebsocket, 10000)
    ws.onmessage = e => {
        const json = JSON.parse(e.data) as WSMessage
        console.log(json)
        switch (json.event) {
            case WSEvent.homeData:
                store.dispatch(setDevices(json.data.devices))
                store.dispatch(setAutomations(json.data.automations))
                store.dispatch(setEntries(json.data.entries))
                break
            case WSEvent.userData:
                store.dispatch(setUserData(json.data))
                break
            case WSEvent.stateUpdate:
                store.dispatch(setDevice(json))
                break
            default:
                break
        }
    }
}
