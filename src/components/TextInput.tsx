import { useState } from 'react'
import styles from './Input.module.css'

interface Props {
    text?: string
    label: string
    onInput: (text: string) => void
}

const TextInput = ({ text = '', label, onInput }: Props) => {
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
