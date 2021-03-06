import { useState } from 'react'
import styles from '../styles/Input.module.css'

const TextInput = ({ text = '', label, onInput }) => {
    const [value, setValue] = useState(text)
    const [minimize, setMinimize] = useState(text !== '')

    const onBlur = () => {
        onInput(value)
        setMinimize(value !== '')
    }

    return (
        <div className={`${styles.container}${minimize ? ' ' + styles.minimize : ''}`}>
            <div className={styles.label}>{label}</div>
            <input
                className={styles.text}
                type='text'
                value={value}
                onBlur={onBlur}
                onFocus={() => setMinimize(true)}
                onChange={e => setValue(e.target.value)}
            />
        </div>
    )
}

export default TextInput
