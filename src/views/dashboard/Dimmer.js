import styles from './Dimmer.module.css'
import { useState } from 'react'

const Dimmer = props => {
    const [value, setValue] = useState(props.brightness / 50)

    const onClick = e => e.stopPropagation()
    const onInput = e => setValue(parseInt(e.target.value))
    const onChange = e => props.onChange?.(e.target.value * 50)

    return (
        <div className={styles.content} onClick={onClick}>
            <input className={styles.range} type='range' min='0' max='20' value={value} onInput={onChange} onChange={onInput} />
            <div className={styles.label}>{value === 0 ? 'Off' : value * 5 + '%'}</div>
        </div>
    )
}

export default Dimmer
