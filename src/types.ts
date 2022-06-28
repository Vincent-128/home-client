export enum DeviceType {
    Button = 'button',
    Dimmer = 'dimmer',
    Door = 'door',
    Garage = 'garage',
    MultiOutlet = 'multioutlet',
    Outlet = 'outlet',
    Sensor = 'sensor',
    Switch = 'switch',
}

export enum Icon {
    Sensor = 'sensor',
    ChristmasTree = 'tree-christmas',
    ChristmasLights = 'lights-holiday',
    CeilingLight = 'light-ceiling',
    Button = 'chevron-circle-right',
    Fan = 'fan-table',
    Door = 'door-closed',
    Garage = 'garage',
    SmallLamp = 'lamp',
    Outlet = 'outlet',
    LargeLamp = 'lamp-floor',
    Lightbulb = 'lightbulb',
    Spearkes = 'speakers',
}

export interface DeviceData {
    name: string
    image: Icon
    state: boolean
    text?: string
    brightness?: number
}

export interface Device {
    id: string
    room: string
    type: DeviceType
    data: DeviceData[]
    custom: boolean
}

export interface TuyaDevice extends Device {
    ip: string
    key: string
    custom: false
}

export interface MultiOutlet extends TuyaDevice {
    type: DeviceType.MultiOutlet
    combine: boolean
}

export enum ConditionType {
    State = 'state',
    Range = 'range',
    Operator = 'operator',
}

export enum TriggerType {
    Device = 'device',
    Sunrise = 'sunrise',
    Sunset = 'sunset',
    Time = 'time',
}

export interface DeviceTrigger {
    type: TriggerType.Device
    device: string
    state: boolean
}

export interface SunTrigger {
    type: TriggerType.Sunrise | TriggerType.Sunset
    offset: string
}

export interface TimeTrigger {
    type: TriggerType.Time
    time: string
}

export type Trigger = DeviceTrigger | SunTrigger | TimeTrigger

export interface Automation {
    id: string
    enabled: boolean
    weekdays: [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
    trigger: Trigger
    sequence: string
}

export interface StateCondition {
    type: ConditionType.State
    device: string
    state: boolean
}

export interface RangeCondition {
    type: ConditionType.Range
    start: string
    end: string
}

export interface OperatorCondition {
    type: ConditionType.Operator
    isAnd: boolean
}

export type Condition = StateCondition | RangeCondition | OperatorCondition

export enum EntryType {
    Device = 'device',
    If = 'if',
    IfElse = 'ifElse',
    Parent = 'parent',
    Wait = 'wait',
}

interface BaseEntry {
    id: string
    type: EntryType
    parentId: string
}

export interface DeviceEntry extends BaseEntry {
    type: EntryType.Device
    device: string[]
    state: boolean
    brightness?: number
}
export interface IfEntry extends BaseEntry {
    type: EntryType.If
    conditions: Condition[]
    thenSeq: string
}

export interface IfElseEntry extends BaseEntry {
    type: EntryType.IfElse
    conditions: Condition[]
    thenSeq: string
    elseSeq: string
}

export interface ParentEntry extends BaseEntry {
    type: EntryType.Parent
    children: string[]
}

export interface WaitEntry extends BaseEntry {
    wait: string
    type: EntryType.Wait
}

export type Entry = DeviceEntry | IfEntry | IfElseEntry | ParentEntry | WaitEntry

export enum Theme {
    Carbon = 'carbon',
    Proton = 'proton',
    Monokai = 'monokai',
    Snow = 'snow',
    Legacy = 'legacy',
    Contrast = 'contrast',
}
