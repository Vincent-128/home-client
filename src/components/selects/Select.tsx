import { useState, useRef } from 'react'
import { useClickAway } from '../../utils'
import styles from '../Input.module.css'
import Options from './Options'

type Type = any

interface Props<T extends Type> {
    label: string
    selected: T
    options: { id: T; text: string }[]
    onSelect: (selected: T) => void
}

const path =
    'M310 55 182.9 183c-7.1 6.3-15.3 9.4-23.5 9.4s-16.38-3.125-22.63-9.375l-127.1-128C-.376 ' +
    '45.9-3.116 32.1 1.838 20.2S18.47.4 31.4.4h255.1c12.94 0 24.62 7.781 29.58 19.75S319.2 45.9 310 55z'

const Select = <T extends Type>({ label, selected, options, onSelect }: Props<T>) => {
    const items = options.map(o => ({ ...o, selected: selected === o.id }))
    const text = items.find(i => i.selected)?.text || ''
    const classes = styles.container + (text !== '' ? ' ' + styles.minimize : '')
    const [showOptions, setShowOptions] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const handleSelect = (selected: T) => {
        setShowOptions(false)
        onSelect(selected)
    }

    useClickAway(ref, () => setShowOptions(false))

    return (
        <div className={classes} onClick={() => setShowOptions(true)}>
            <div className={styles.label}>{label}</div>
            <div className={styles.selectText}>{text}</div>
            <svg className={styles.arrow} viewBox='0 0 320 195'>
                <path d={path} />
            </svg>
            {showOptions && <Options ref={ref} options={items} onSelect={handleSelect} />}
        </div>
    )
}

export default Select
