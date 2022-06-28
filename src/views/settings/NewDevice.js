import { Fragment, useState } from 'react'
import { TextInput, Title } from '../../components'
import { Select } from '../../components/selects'
import { selects } from '../../app/selects'
import styles from './NewDevice.module.css'

const NewDevice = () => {
    const [device, setDevice] = useState({ type: '', ip: '', key: '', id: '', room: '', name: [''], image: [''], numOutlets: 2 })

    const update = (key, value) => {
        setDevice({ ...device, [key]: value })
    }

    const updateAt = (key, index, value) => {
        const copy = [...device[key]]
        copy[index] = value
        setDevice({ ...device, [key]: copy })
    }

    const onSave = () => {
        const newDevice = { type: device.type, id: device.id, room: device.room }

        if (['dimmer', 'outlet', 'multioutlet'].includes(device.type)) {
            newDevice.ip = device.ip
            newDevice.key = device.key
        }

        if (device.type === 'multioutlet') {
            newDevice.numOutlets = device.numOutlets
            newDevice.name = device.name.slice(0, device.numOutlets)
            newDevice.image = device.image.slice(0, device.numOutlets)
        } else {
            newDevice.name = [device.name[0]]
            newDevice.image = [device.image[0]]
        }
        console.log(newDevice)
    }

    const onCancel = () => {}

    return (
        <div className={styles.container}>
            <Select label='Type' options={selects.deviceTypes} selected={device.type} onSelect={t => update('type', t)} />
            <TextInput label={'Id'} text={device.id} onInput={t => update('id', t)} />
            <TextInput label={'Room'} text={device.room} onInput={t => update('room', t)} />
            {device.type !== 'multioutlet' && (
                <>
                    <Select
                        label='Image'
                        options={selects.images}
                        selected={device.image[0]}
                        onSelect={i => updateAt('image', 0, i)}
                    />
                    <TextInput label={'Name'} text={device.name[0]} onInput={t => updateAt('name', 0, t)} />
                </>
            )}

            {['dimmer', 'outlet', 'multioutlet'].includes(device.type) && (
                <>
                    <TextInput label={'Ip'} text={device.ip} onInput={t => update('ip', t)} />
                    <TextInput label={'Key'} text={device.key} onInput={t => update('key', t)} />
                </>
            )}

            {device.type === 'multioutlet' && (
                <>
                    <Select
                        label='Nunber of Outlets'
                        options={selects.numOutlets}
                        selected={device.numOutlets}
                        onSelect={t => update('numOutlets', t)}
                    />
                    {[...Array(device.numOutlets).keys()].map((t, i) => (
                        <Fragment key={i}>
                            <Title title={'Outlet ' + (i + 1)} />
                            <TextInput label={'Name'} text={device.name[i]} onInput={t => updateAt('name', i, t)} />
                            <Select
                                label='Image'
                                options={selects.images}
                                selected={device.image[i]}
                                onSelect={image => updateAt('image', i, image)}
                            />
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
