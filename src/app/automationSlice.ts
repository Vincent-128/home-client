import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Automation, ConditionType, Entry, EntryType, ParentEntry, TriggerType } from '../types'
import { RootState } from './store'

const initialState: {
    automations: { current: Automation[]; update: Automation[] }
    entries: { [key: string]: Entry }
} = {
    automations: { current: [], update: [] },
    entries: {},
}

let currentId = 1000

const getId = () => {
    return `id-${currentId++}`
}

const isParent = (entry: Entry): entry is ParentEntry => {
    return 'children' in entry
}

export const automationSlice = createSlice({
    name: 'automations',
    initialState,
    reducers: {
        addAutomation: state => {
            const entry: ParentEntry = {
                id: getId(),
                type: EntryType.Parent,
                parentId: '',
                children: [],
            }
            const automation: Automation = {
                id: getId(),
                enabled: true,
                weekdays: [true, true, true, true, true, true, true],
                trigger: { type: TriggerType.Device, device: '', state: true },
                sequence: entry.id,
            }
            entry.parentId = automation.id
            state.entries[entry.id] = entry
            state.automations.update.push(automation)
        },

        setAutomations: (state, action: PayloadAction<Automation[]>) => {
            state.automations.current = action.payload
            state.automations.update = action.payload
        },

        saveAutomations: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.automations.current = state.automations.update
            } else {
                state.automations.update = state.automations.current
            }
        },

        setTrigger: (state, action: PayloadAction<{ id: string; prop: string | boolean }>) => {
            const { id, prop } = action.payload
            const trigger = state.automations.update.find(a => a.id === id)?.trigger
            if (trigger) {
                switch (trigger.type) {
                    case TriggerType.Device:
                        typeof prop === 'boolean' ? (trigger.state = prop) : (trigger.device = prop)
                        break
                    case TriggerType.Sunset:
                    case TriggerType.Sunrise:
                        trigger.offset = prop as string
                        break
                    case TriggerType.Time:
                        trigger.time = prop as string
                }
            }
        },

        setTriggerType: (state, action: PayloadAction<{ id: string; type: TriggerType }>) => {
            const { id, type } = action.payload
            const automation = state.automations.update.find(a => a.id === id)!

            if (type === TriggerType.Device) {
                automation.trigger = { type, device: '', state: true }
            } else if (type === TriggerType.Time) {
                automation.trigger = { type, time: '' }
            } else {
                automation.trigger = { type, offset: '' }
            }
        },

        setWeekday: (state, action: PayloadAction<{ id: string; index: number; selected: boolean }>) => {
            const { id, index, selected } = action.payload
            const automation = state.automations.update.find(a => a.id === id)!
            automation.weekdays[index] = selected
        },

        setEntries: (state, action: PayloadAction<{ [key: string]: Entry }>) => {
            state.entries = action.payload
        },

        setEntry: (state, action: PayloadAction<{ id: string; prop: boolean | string | string[] }>) => {
            const { id, prop } = action.payload
            const entry = state.entries[id]
            if (entry.type === EntryType.Device) {
                typeof prop === 'boolean' ? (entry.state = prop) : (entry.device = prop as string[])
            } else if (entry.type === EntryType.Wait) {
                entry.wait = prop as string
            }
        },

        addEntry: (state, action: PayloadAction<{ type: EntryType; parentId: string }>) => {
            const id = getId()
            const { type, parentId } = action.payload
            const parentEntry = state.entries[parentId]
            if (!isParent(parentEntry)) return

            parentEntry.children.push(id)

            switch (type) {
                case EntryType.Device:
                    state.entries[id] = { type, parentId, id, device: [], state: true }
                    break
                case EntryType.Wait:
                    state.entries[id] = { type, parentId, id, wait: '' }
                    break
                case EntryType.If:
                    const seqId = getId()
                    state.entries[id] = { type, parentId, id, conditions: [], thenSeq: seqId }
                    state.entries[seqId] = { id: seqId, type: EntryType.Parent, parentId: id, children: [] }
                    break
                case EntryType.IfElse:
                    const thenId = getId()
                    const elseId = getId()
                    state.entries[id] = { type, parentId, id, conditions: [], thenSeq: thenId, elseSeq: elseId }
                    state.entries[thenId] = { id: thenId, type: EntryType.Parent, parentId: id, children: [] }
                    state.entries[elseId] = { id: elseId, type: EntryType.Parent, parentId: id, children: [] }
                    break
                default:
                    break
            }
        },

        removeEntry: (state, action: PayloadAction<string>) => {
            const entry = state.entries[action.payload]
            const parent = state.entries[entry.parentId] as ParentEntry
            parent.children = parent.children.filter(id => id !== entry.id)

            const remove = (id: string) => {
                const entry = state.entries[id]
                if (entry.type === EntryType.If || entry.type === EntryType.IfElse) {
                    const thenSeq = state.entries[entry.thenSeq] as ParentEntry
                    thenSeq.children.forEach(remove)
                    delete state.entries[thenSeq.id]
                }
                if (entry.type === EntryType.IfElse) {
                    const elseSeq = state.entries[entry.elseSeq] as ParentEntry
                    elseSeq.children.forEach(remove)
                    delete state.entries[elseSeq.id]
                }
                delete state.entries[entry.id]
            }
            remove(entry.id)
        },

        addCondition: (state, action: PayloadAction<{ id: string; type: ConditionType }>) => {
            const { id, type } = action.payload
            const entry = state.entries[id]
            if (!('conditions' in entry)) return
            if (entry.conditions.length > 0) {
                entry.conditions.push({ type: ConditionType.Operator, isAnd: true })
            }
            entry.conditions.push(
                type === ConditionType.State
                    ? { type: ConditionType.State, device: '', state: true }
                    : { type: ConditionType.Range, start: '', end: '' }
            )
        },

        setCondition: (
            state,
            action: PayloadAction<{ id: string; index: number; state?: boolean; device?: string; start?: string; end?: string }>
        ) => {
            const { id, index, ...props } = action.payload
            const entry = state.entries[id]
            if ('conditions' in entry) {
                const condition = entry.conditions[index]
                if (condition.type === ConditionType.State) {
                    if (props.device) condition.device = props.device
                    if (props.state !== undefined) condition.state = props.state
                } else if (condition.type === ConditionType.Range) {
                    if (props.start) condition.start = props.start
                    if (props.end) condition.end = props.end
                }
            }
        },

        removeCondition: (state, action: PayloadAction<{ id: string; index: number }>) => {
            const { id, index } = action.payload
            const entry = state.entries[id]
            if (!('conditions' in entry)) return
            if (entry.conditions.length === 1) {
                entry.conditions = []
            } else if (index === 0) {
                entry.conditions = entry.conditions.slice(2)
            } else {
                entry.conditions.splice(index - 1, 2)
            }
        },

        toggleOperator: (state, action: PayloadAction<{ id: string; index: number }>) => {
            const { id, index } = action.payload
            const entry = state.entries[id]
            if ('conditions' in entry) {
                const condition = entry.conditions[index]
                if ('isAnd' in condition) condition.isAnd = !condition.isAnd
            }
        },
    },
})

export const getAutomations = (state: RootState) => state.automations.automations.update
export const getEntry = (state: RootState, id: string) => state.automations.entries[id]

export const {
    addAutomation,
    setAutomations,
    saveAutomations,
    setTrigger,
    setTriggerType,
    setWeekday,
    setEntries,
    addEntry,
    setEntry,
    removeEntry,
    addCondition,
    setCondition,
    removeCondition,
    toggleOperator,
} = automationSlice.actions

export default automationSlice.reducer
