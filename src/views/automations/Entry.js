import { addEntry, removeEntry, setEntry, getEntry } from '../../app/automationSlice'
import { AddButton, RemoveButton, Toggle } from '../../components/buttons'
import { useDispatch, useSelector } from 'react-redux'
import { Select, MultiSelect } from '../../components/selects'
import { TextInput } from '../../components'
import { selects } from '../../app/selects'
import Conditions from './Conditions'
import styles from './Rows.module.css'

const options = [
    { id: 'device', value: 'Device' },
    { id: 'wait', value: 'Wait' },
    { id: 'if', value: 'If' },
    { id: 'ifElse', value: 'If Else' },
]

const Entry = ({ id }) => {
    const entry = useSelector(state => getEntry(state, id))
    const dispatch = useDispatch()

    switch (entry.type) {
        case 'parent':
            return (
                <div className={styles.parentRow}>
                    {entry.children.map(child => (
                        <Entry id={child} key={child} />
                    ))}
                    <AddButton options={options} onClick={type => dispatch(addEntry({ type, parentId: id }))} />
                </div>
            )
        case 'device':
            return (
                <div className={styles.entryRow}>
                    <RemoveButton onClick={() => dispatch(removeEntry(id))} />
                    <MultiSelect
                        label='Device'
                        selected={entry.device}
                        options={selects.allDevices}
                        onSelect={device => dispatch(setEntry({ id: id, device }))}
                    />
                    <Toggle
                        label='State'
                        on='Turn On'
                        off='Turn Off'
                        state={entry.state}
                        onClick={state => dispatch(setEntry({ id, state }))}
                    />
                </div>
            )
        case 'wait':
            return (
                <div className={styles.entryRow}>
                    <RemoveButton onClick={() => dispatch(removeEntry(id))} />
                    <TextInput label='Wait' text={entry.wait} onInput={wait => dispatch(setEntry({ id, wait }))} />
                </div>
            )
        case 'if':
            return (
                <>
                    <Conditions id={id} conditions={entry.conditions} />
                    <Entry id={entry.thenSeq} />
                </>
            )
        case 'ifElse':
            return (
                <>
                    <Conditions id={id} conditions={entry.conditions} />
                    <Entry id={entry.thenSeq} />
                    <div className={styles.elseRow}>Else</div>
                    <Entry id={entry.elseSeq} />
                </>
            )
        default:
            return <></>
    }
}

export default Entry
