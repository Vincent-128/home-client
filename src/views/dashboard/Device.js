import { makeSelectDevice } from '../../app/deviceSlice'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLongPress } from '../../utils'
import { send } from '../../app/websocket'
import Image from '../../components/Image'
import styles from './Device.module.css'
import Dimmer from './Dimmer'

const Device = ({ id, index }) => {
    const selectDevice = useMemo(makeSelectDevice, [])
    const [showDimmer, setShowDimmer] = useState(false)
    const device = useSelector(state => selectDevice(state, id, index))

    const onClick = () => {
        if (['outlet', 'switch', 'multioutlet', 'dimmer'].includes(device.type)) {
            send({ event: 'toggleDevice', id, index })
        } else if (device.type === 'garage') {
            send({ event: 'setDevice', id, index })
        }
    }

    const onLongPress = () => {
        if (device.type === 'dimmer') {
            setShowDimmer(true)
        }
    }

    const onBrightness = brightness => {
        if (brightness === 0) {
            send({ event: 'setDevice', id, index, state: false, brightness: 50 })
        } else {
            send({ event: 'setDevice', id, index, state: true, brightness })
        }
    }

    const onBackgroundClick = e => {
        e.stopPropagation()
        setShowDimmer(false)
    }

    const getText = () => {
        switch (device.type) {
            case 'dimmer':
                return device.state ? device.brightness / 10 + '%' : 'Off'
            case 'garage':
                return device.text
            case 'door':
                return device.state ? 'Open' : 'Closed'
            case 'button':
                return 'Connected'
            case 'sensor':
                return device.state ? 'Active' : device.text
            default:
                return device.state ? 'On' : 'Off'
        }
    }

    return (
        <>
            <div
                className={`${styles.card}${device.state ? ' ' + styles.active : ''}`}
                onClick={onClick}
                {...useLongPress(onLongPress, { isPreventDefault: false })}
            >
                <Image className={styles.image} type={device.image} />
                <div className={styles.room}>{device.room}</div>
                <div className={styles.name}>{device.name}</div>
                <div className={styles.state}>{getText()}</div>
            </div>
            {showDimmer && (
                <div className={styles.background} onClick={onBackgroundClick}>
                    <Dimmer brightness={device.brightness} onChange={onBrightness} />
                </div>
            )}
        </>
    )
}

export default Device
