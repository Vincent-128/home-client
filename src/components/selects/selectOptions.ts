import { Device, DeviceType, EntryType, Icon, TriggerType } from '../../types'

export const entryOptions: { id: EntryType; text: string }[] = [
    { id: EntryType.Device, text: 'Device' },
    { id: EntryType.If, text: 'If' },
    { id: EntryType.IfElse, text: 'If Else' },
    { id: EntryType.Wait, text: 'Wait' },
]

export const triggerOptions: { id: TriggerType; text: string }[] = [
    { id: TriggerType.Device, text: 'Device' },
    { id: TriggerType.Sunset, text: 'Sunset' },
    { id: TriggerType.Sunrise, text: 'Sunrise' },
    { id: TriggerType.Time, text: 'Time' },
]

export const deviceOptions: { id: DeviceType; text: string }[] = [
    { id: DeviceType.Button, text: 'Button' },
    { id: DeviceType.Dimmer, text: 'Dimmer' },
    { id: DeviceType.Door, text: 'Door' },
    { id: DeviceType.Garage, text: 'Garage' },
    { id: DeviceType.MultiOutlet, text: 'Multi Outlet' },
    { id: DeviceType.Outlet, text: 'Outlet' },
    { id: DeviceType.Sensor, text: 'Sensor' },
    { id: DeviceType.Switch, text: 'Switch' },
]

export const iconOptions: { id: Icon; text: string }[] = [
    { id: Icon.Sensor, text: 'Sensor' },
    { id: Icon.ChristmasTree, text: 'Christmas Tree' },
    { id: Icon.ChristmasLights, text: 'Christmas Lights' },
    { id: Icon.CeilingLight, text: 'Ceiling Light' },
    { id: Icon.Button, text: 'Button' },
    { id: Icon.Fan, text: 'Fan' },
    { id: Icon.Door, text: 'Door' },
    { id: Icon.Garage, text: 'Garage' },
    { id: Icon.SmallLamp, text: 'Small Lamp' },
    { id: Icon.Outlet, text: 'Outlet' },
    { id: Icon.LargeLamp, text: 'Large Lamp' },
    { id: Icon.Lightbulb, text: 'Lightbulb' },
    { id: Icon.Spearkes, text: 'Spearkes' },
]

export const brightnessOptions: { id: string; text: string }[] = [
    { id: '100', text: '10%' },
    { id: '200', text: '20%' },
    { id: '300', text: '30%' },
    { id: '400', text: '40%' },
    { id: '500', text: '50%' },
    { id: '600', text: '60%' },
    { id: '700', text: '70%' },
    { id: '800', text: '80%' },
    { id: '900', text: '90%' },
    { id: '1000', text: '100%' },
]

export const outletOptions: { id: number; text: string }[] = [
    { id: 1, text: '1' },
    { id: 2, text: '2' },
    { id: 3, text: '3' },
    { id: 4, text: '4' },
    { id: 5, text: '5' },
]

export const roomOptions: { id: string; text: string }[] = []
export const dimmingOptions: { id: string; text: string }[] = []
export const allDeviceOptions: { id: string; text: string }[] = []

export const setOptions = (devices: Device[]) => {
    const rooms = new Set<string>()
    devices.forEach(device => {
        const { id, room, data } = device
        rooms.add(room)
        data.forEach((d, i) => {
            const option = { id: id + '/' + i, text: d.name }
            allDeviceOptions.push(option)
            if (device.type === DeviceType.Dimmer) dimmingOptions.push(option)
        })
    })
    rooms.forEach(room => roomOptions.push({ id: room, text: room }))
}
