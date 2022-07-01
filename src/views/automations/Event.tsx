import { Select, allDeviceOptions, triggerOptions } from '../../components/selects'
import { ToggleButton } from '../../components/buttons'
import { setTrigger, setTriggerType } from '../../app/automationSlice'
import { Trigger, TriggerType } from '../../types'
import { useAppDispatch } from '../../app/hooks'
import { TextInput } from '../../components'
import styles from './Rows.module.css'

const Event = ({ id, trigger }: { id: string; trigger: Trigger }) => {
    const dispatch = useAppDispatch()

    const getInputs = () => {
        switch (trigger.type) {
            case TriggerType.Device:
                return (
                    <>
                        <Select
                            label='Device'
                            selected={trigger.device}
                            options={allDeviceOptions}
                            onSelect={device => dispatch(setTrigger({ id, prop: device }))}
                        />
                        <ToggleButton
                            label='State'
                            on='Turns On'
                            off='Turns Off'
                            state={trigger.state}
                            onClick={state => dispatch(setTrigger({ id, prop: state }))}
                        />
                    </>
                )
            case TriggerType.Sunset:
            case TriggerType.Sunrise:
                return (
                    <TextInput
                        label='Offset'
                        text={trigger.offset}
                        onInput={offset => dispatch(setTrigger({ id, prop: offset }))}
                    />
                )
            case TriggerType.Time:
                return (
                    <TextInput
                        label='Time'
                        text={trigger.time}
                        onInput={time => dispatch(setTrigger({ id, prop: time }))}
                    />
                )
            default:
                return <></>
        }
    }

    return (
        <div className={styles.triggerRow}>
            <Select
                label='Trigger'
                selected={trigger.type}
                options={triggerOptions}
                onSelect={type => dispatch(setTriggerType({ id, type: type as TriggerType }))}
            />
            {getInputs()}
        </div>
    )
}

export default Event
