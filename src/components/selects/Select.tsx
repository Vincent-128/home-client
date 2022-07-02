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
            <svg className={styles.arrow} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 225 380'>
                <path d='M20 130h182.9c16.5 0 24.62-19.88 13.12-31.38L124.49 7.37C121 4 116.3 1.1 111.4 1.1s-9.5 2.9-13 6.3L6.8 98.6C-4.7 110.1 3.5 130 20 130zm182.9 120H20c-16.5 0-24.69 19.88-13.19 31.38L98.4 372.6c3.5 3.4 8.1 5.4 13 5.4s9.594-1.1 13.09-5.375l91.53-91.25C227.5 269.9 219.4 250 202.9 250z' />
            </svg>
            {showOptions && <Options ref={ref} options={items} onSelect={handleSelect} />}
        </div>
    )
}

export default Select
