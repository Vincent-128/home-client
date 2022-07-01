import { addEntry, removeEntry, setEntry, getEntry } from '../../app/automationSlice'
import { AddButton, RemoveButton, ToggleButton } from '../../components/buttons'
import { MultiSelect, allDeviceOptions, entryOptions } from '../../components/selects'
import { TextInput } from '../../components'
import Conditions from './Conditions'
import styles from './Rows.module.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { EntryType } from '../../types'

const Entry = ({ id }: { id: string }) => {
    const entry = useAppSelector(state => getEntry(state, id))
    const dispatch = useAppDispatch()

    switch (entry.type) {
        case EntryType.Parent:
            return (
                <div className={styles.parentRow}>
                    {entry.children.map(child => (
                        <Entry id={child} key={child} />
                    ))}
                    <AddButton
                        options={entryOptions}
                        onClick={type => dispatch(addEntry({ type: type as EntryType, parentId: id }))}
                    />
                </div>
            )
        case EntryType.Device:
            return (
                <div className={styles.entryRow}>
                    <RemoveButton onClick={() => dispatch(removeEntry(id))} />
                    <MultiSelect
                        label='Device'
                        selected={entry.device}
                        options={allDeviceOptions}
                        onSelect={prop => dispatch(setEntry({ id, prop }))}
                    />
                    <ToggleButton
                        label='State'
                        on='Turn On'
                        off='Turn Off'
                        state={entry.state}
                        onClick={prop => dispatch(setEntry({ id, prop }))}
                    />
                </div>
            )
        case EntryType.Wait:
            return (
                <div className={styles.entryRow}>
                    <RemoveButton onClick={() => dispatch(removeEntry(id))} />
                    <TextInput label='Wait' text={entry.wait} onInput={prop => dispatch(setEntry({ id, prop }))} />
                </div>
            )
        case EntryType.If:
            return (
                <>
                    <Conditions id={id} conditions={entry.conditions} />
                    <Entry id={entry.thenSeq} />
                </>
            )
        case EntryType.IfElse:
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
