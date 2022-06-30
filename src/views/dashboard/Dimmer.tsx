import styles from './Dimmer.module.css'
import React, { useState } from 'react'

interface Props {
    brightness: number
    onChange?: (value: number) => void
}

const Dimmer = (props: Props) => {
    const [value, setValue] = useState(props.brightness / 50)

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()
    const onInput = (e: React.FormEvent<HTMLInputElement>) => setValue(parseInt(e.currentTarget.value))
    const onChange = (e: React.FormEvent<HTMLInputElement>) => props.onChange?.(parseInt(e.currentTarget.value) * 50)

    return (
        <div className={styles.content} onClick={onClick}>
            <input className={styles.range} type='range' min='0' max='20' value={value} onInput={onChange} onChange={onInput} />
            <div className={styles.label}>{value === 0 ? 'Off' : value * 5 + '%'}</div>
        </div>
    )
}

export default Dimmer
