import { makeSelectDevice } from '../../app/deviceSlice'
import { useMemo, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useLongPress } from '../../utils'
import { DeviceType } from '../../types'
import { send } from '../../app/websocket'
import { Icon } from '../../components'
import styles from './Device.module.css'
import Dimmer from './Dimmer'

const Device = ({ id, index }: { id: string; index: number }) => {
    const selectDevice = useMemo(makeSelectDevice, [])
    const [showDimmer, setShowDimmer] = useState(false)
    const device = useAppSelector(state => selectDevice(state, id, index))

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

    const onBrightness = (brightness: number) => {
        if (brightness === 0) {
            send({ event: 'setDevice', id, index, state: false, brightness: 50 })
        } else {
            send({ event: 'setDevice', id, index, state: true, brightness })
        }
    }

    const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setShowDimmer(false)
    }

    const getText = () => {
        switch (device.type) {
            case DeviceType.Dimmer:
                return device.state ? device.brightness! / 10 + '%' : 'Off'
            case DeviceType.Garage:
                return device.text
            case DeviceType.Door:
                return device.state ? 'Open' : 'Closed'
            case DeviceType.Button:
                return 'Connected'
            case DeviceType.Sensor:
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
                <Icon className={styles.image} type={device.image} />
                <div className={styles.room}>{device.room}</div>
                <div className={styles.name}>{device.name}</div>
                <div className={styles.state}>{getText()}</div>
            </div>
            {showDimmer && (
                <div className={styles.background} onClick={onBackgroundClick}>
                    <Dimmer brightness={device.brightness!} onChange={onBrightness} />
                </div>
            )}
        </>
    )
}

export default Device
