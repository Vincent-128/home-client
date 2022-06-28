import { createSlice } from '@reduxjs/toolkit'

let currentId = 1000

const getId = () => {
    return ++currentId
}

export const automationSlice = createSlice({
    name: 'automations',
    initialState: {
        automations: [],
        entries: {},
    },
    reducers: {
        setAutomations: (state, action) => {
            state.automations = action.payload
        },

        setTrigger: (state, action) => {
            const { id, prop, value } = action.payload
            const automation = state.automations.find(a => a.id === id)

            if (prop !== 'type') {
                automation.trigger[prop] = value
            } else if (value === 'device') {
                automation.trigger = { type: 'device', device: '', state: true }
            } else if (value === 'time') {
                automation.trigger = { type: 'time', time: '' }
            } else {
                automation.trigger = { type: value, offset: '' }
            }
        },

        setWeekday: (state, action) => {
            const { id, index, selected } = action.payload
            const automation = state.automations.find(a => a.id === id)
            automation.weekdays[index] = selected
        },

        setEntries: (state, action) => {
            state.entries = action.payload
        },

        setEntry: (state, action) => {
            const index = state.entries.findIndex(e => e.id === action.payload.id)
            state.entries[index] = { ...state.entries[index], ...action.payload }
        },

        addEntry: (state, action) => {
            const id = getId()
            const { type, parentId } = action.payload
            const parentEntry = state.entries.find(e => e.id === parentId)
            parentEntry.children.push(id)

            switch (type) {
                case 'device':
                    state.entries.push({ type, parentId, id, device: [], state: true })
                    break
                case 'wait':
                    state.entries.push({ type, parentId, id, wait: '' })
                    break
                case 'if':
                    const seqId = getId()
                    state.entries.push(
                        { type, parentId, id, conditions: [], thenSeq: seqId },
                        { id: seqId, type: 'parent', parentId: id, children: [] }
                    )
                    break
                case 'ifElse':
                    const thenId = getId()
                    const elseId = getId()
                    state.entries.push(
                        { type, parentId, id, conditions: [], thenSeq: thenId, elseSeq: elseId },
                        { id: thenId, type: 'parent', parentId: id, children: [] },
                        { id: elseId, type: 'parent', parentId: id, children: [] }
                    )
                    break
                default:
                    break
            }
        },

        removeEntry: (state, action) => {
            const entry = state.entries.find(e => e.id === action.payload)
            const parent = state.entries.find(e => e.id === entry.parentId)
            parent.children = parent.children.filter(id => id !== entry.id)

            const removeIds = []

            const remove = id => {
                const entry = state.entries.find(e => e.id === id)
                if (entry.type === 'if') {
                    const thenSeq = state.entries.find(e => e.id === entry.thenSeq)
                    thenSeq.children.forEach(remove)
                    removeIds.push(thenSeq.id)
                } else if (entry.type === 'ifElse') {
                    const thenSeq = state.entries.find(e => e.id === entry.thenSeq)
                    const elseSeq = state.entries.find(e => e.id === entry.elseSeq)
                    thenSeq.children.forEach(remove)
                    elseSeq.children.forEach(remove)
                    removeIds.push(thenSeq.id, elseSeq.id)
                }
                removeIds.push(entry.id)
            }

            remove(entry.id)
            state.entries = state.entries.filter(e => !removeIds.includes(e.id))
        },
        addCondition: (state, action) => {
            const { id, type } = action.payload
            const entry = state.entries.find(e => e.id === id)
            if (entry.conditions.length > 0) {
                entry.conditions.push({ type: 'operator', isAnd: true })
            }
            entry.conditions.push(type === 'state' ? { type, device: '', state: true } : { type, start: '', end: '' })
        },

        setCondition: (state, action) => {
            const { id, index, ...props } = action.payload
            const entry = state.entries.find(e => e.id === id)
            entry.conditions[index] = { ...entry.conditions[index], ...props }
        },

        removeCondition: (state, action) => {
            const { id, index } = action.payload
            const entry = state.entries.find(e => e.id === id)
            if (entry.conditions.length === 1) {
                entry.conditions = []
            } else if (index === 0) {
                entry.conditions = entry.conditions.slice(2)
            } else {
                entry.conditions.splice(index - 1, 2)
            }
        },

        toggleOperator: (state, action) => {
            const { id, index } = action.payload
            const entry = state.entries.find(e => e.id === id)
            entry.conditions[index].isAnd = !entry.conditions[index].isAnd
        },
    },
})

export const getAutomations = state => state.automations.automations
export const getEntry = (state, id) => state.automations.entries.find(e => e.id === id)

export const {
    setAutomations,
    setTrigger,
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
