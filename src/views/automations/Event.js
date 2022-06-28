import { useDispatch } from 'react-redux'
import { setTrigger } from '../../app/automationSlice'
import { selects } from '../../app/selects'
import { TextInput } from '../../components'
import { Select } from '../../components/selects'
import { Toggle } from '../../components/buttons'
import styles from './Rows.module.css'

const Event = ({ id, trigger }) => {
    const dispatch = useDispatch()

    const getInputs = () => {
        switch (trigger.type) {
            case 'device':
                return (
                    <>
                        <Select
                            label='Device'
                            selected={trigger.device}
                            options={selects.allDevices}
                            onSelect={device => dispatch(setTrigger({ id, prop: 'device', value: device }))}
                        />
                        <Toggle
                            label='State'
                            on='Turns On'
                            off='Turns Off'
                            state={trigger.state}
                            onClick={state => dispatch(setTrigger({ id, prop: 'state', value: state }))}
                        />
                    </>
                )
            case 'sunset':
            case 'sunrise':
                return (
                    <TextInput
                        label='Offset'
                        text={trigger.offset}
                        onInput={offset => dispatch(setTrigger({ id, prop: 'offset', value: offset }))}
                    />
                )
            case 'time':
                return (
                    <TextInput
                        label='Time'
                        text={trigger.time}
                        onInput={time => dispatch(setTrigger({ id, prop: 'time', value: time }))}
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
                options={selects.triggerTypes}
                onSelect={type => dispatch(setTrigger({ id, prop: 'type', value: type }))}
            />
            {getInputs()}
        </div>
    )
}

export default Event
