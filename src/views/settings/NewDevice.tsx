import { Fragment, useState } from 'react'
import { TextInput, Title } from '../../components'
import { ToggleButton } from '../../components/buttons'
import { deviceOptions, iconOptions, outletOptions, Select } from '../../components/selects'
import { Device, DeviceData, DeviceType, Icon, MultiOutlet, TuyaDevice } from '../../types'
import styles from './NewDevice.module.css'

const NewDevice = () => {
    const [id, setId] = useState('')
    const [ip, setIp] = useState('')
    const [key, setKey] = useState('')
    const [room, setRoom] = useState('')
    const [type, setType] = useState(DeviceType.Outlet)
    const [combine, setCombine] = useState(false)
    const [outlets, setOutlets] = useState(1)
    const [data, setData] = useState<DeviceData[]>([{ name: '', icon: Icon.Outlet, state: false }])

    const onSave = () => {
        switch (type) {
            case DeviceType.Outlet:
            case DeviceType.Dimmer:
                const device: TuyaDevice = { ip, key, custom: false, id, room, type, data: [data[0]] }
                break
            case DeviceType.MultiOutlet:
                const multiOutlet: MultiOutlet = {
                    ip, key, custom: false, id, room, type, 
                    data, combine, outlets
                }
                break
            default:
        }
    }

    const setName = (name: string, index: number) => {
        const copy = [...data]
        copy[index].name = name
        setData(copy)
    }

    const setIcon = (icon: Icon, index: number) => {
        const copy = [...data]
        copy[index].icon = icon
        setData(copy)
    }

    const onCancel = () => {}

    return (
        <div className={styles.container}>
            <Select label='Type' options={deviceOptions} selected={type} onSelect={t => setType(t)} />
            <TextInput label={'Id'} text={id} onInput={t => setId(t)} />
            <TextInput label={'Room'} text={room} onInput={r => setRoom(r)} />

            {DeviceType.MultiOutlet !== type && (
                <>
                    <Select label='Icon' options={iconOptions} selected={data[0].icon} onSelect={i => setIcon(i, 0)} />
                    <TextInput label={'Name'} text={data[0].name} onInput={t => setName(t, 0)} />
                </>
            )}

            {[DeviceType.Dimmer, DeviceType.Outlet, DeviceType.MultiOutlet].includes(type) && (
                <>
                    <TextInput label={'Ip'} text={ip} onInput={t => setIp(t)} />
                    <TextInput label={'Key'} text={key} onInput={t => setKey(t)} />
                </>
            )}

            {DeviceType.MultiOutlet === type && (
                <>
                    <Select label='Nunber of Outlets' options={outletOptions} selected={outlets} onSelect={t => setOutlets(t)} />
                    <ToggleButton label='Combine' on={'Yes'} off={'No'} state={false} onClick={c => setCombine(c)} />
                    {Array(outlets).map((_t, i) => (
                        <Fragment key={i}>
                            <Title title={'Outlet ' + (i + 1)} />
                            <TextInput label={'Name'} text={data[i].name} onInput={t => setName(t, i)} />
                            <Select label='Icon' options={iconOptions} selected={data[i].icon} onSelect={t => setIcon(t, i)} />
                        </Fragment>
                    ))}
                </>
            )}

            <div className={styles.footer}>
                <div className={`${styles.button} ${styles.cancel}`} onClick={onCancel}>
                    Cancel
                </div>
                <div className={styles.button} onClick={onSave}>
                    Save
                </div>
            </div>
        </div>
    )
}

export default NewDevice
