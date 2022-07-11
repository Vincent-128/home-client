import styles from './Selects.module.css'
import { useState, useRef, useEffect } from 'react'

interface Props<T extends string | number> {
    label: string
    selected: T[]
    options: { id: T; text: string }[]
    onSelect: (selected: T[]) => void
}

const MultiSelect = <T extends string | number>({ label, selected, options, onSelect }: Props<T>) => {
    const items = options.map(o => ({ ...o, selected: selected.includes(o.id) }))
    const text = items.filter(i => i.selected).map(i => i.text).join(', ')
    const classes = styles.container + (text !== '' ? ' ' + styles.minimize : '')
    const [active, setActive] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)
    const optionsRef = useRef<HTMLDivElement>(null)

    const handleSelect = (id: T) => {
        const item = items.find(i => i.id === id)
        if (item === undefined) return
        item.selected = !item.selected
        onSelect(items.filter(i => i.selected).map(i => i.id))
    }

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (selectRef.current === e.target) {
                setActive(!active)
            } else if (!optionsRef.current?.contains(e.target as Node)) {
                setActive(false)
            }
        }
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }, [active])

    return (
        <div ref={selectRef} className={classes}>
            <div className={styles.label}>{label}</div>
            <div className={styles.selectText}>{text}</div>
            <svg className={styles.arrow} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 225 380'>
                <path d='M20 130h182.9c16.5 0 24.62-19.88 13.12-31.38L124.49 7.37C121 4 116.3 1.1 111.4 1.1s-9.5 2.9-13 6.3L6.8 98.6C-4.7 110.1 3.5 130 20 130zm182.9 120H20c-16.5 0-24.69 19.88-13.19 31.38L98.4 372.6c3.5 3.4 8.1 5.4 13 5.4s9.594-1.1 13.09-5.375l91.53-91.25C227.5 269.9 219.4 250 202.9 250z' />
            </svg>
            {active && (
                <div ref={optionsRef} className={styles.options}>
                    {items.map(option => (
                        <div
                            className={`${styles.option} ${option.selected ? styles.selected : ''}`}
                            onClick={() => handleSelect(option.id)}
                            key={option.id as string}
                        >
                            <div className={styles.text}>{option.text}</div>
                            <svg className={styles.check} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                                {option.selected && (
                                    <path d='M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z'></path>
                                )}
                            </svg>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MultiSelect
