import { useState, useRef, useEffect } from 'react'
import styles from './Selects.module.css'

interface Props<T> {
    label: string
    selected: T
    options: { id: T; text: string }[]
    onSelect: (selected: T) => void
}

const Select = <T extends any>({ label, selected, options, onSelect }: Props<T>) => {
    const items = options.map(o => ({ ...o, selected: selected === o.id }))
    const text = items.find(i => i.selected)?.text || ''
    const classes = styles.container + (text !== '' ? ' ' + styles.minimize : '')
    const [active, setActive] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.target === ref.current) {
                console.log(active)
                setActive(!active)
            } else {
                setActive(false)
            }
            // if (e.target !== ref.current) setActive(false)
        }
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }, [active, setActive])

    return (
        <div ref={ref} className={classes}>
            <div className={styles.label}>{label}</div>
            <div className={styles.selectText}>{text}</div>
            <svg className={styles.arrow} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 225 380'>
                <path d='M20 130h182.9c16.5 0 24.62-19.88 13.12-31.38L124.49 7.37C121 4 116.3 1.1 111.4 1.1s-9.5 2.9-13 6.3L6.8 98.6C-4.7 110.1 3.5 130 20 130zm182.9 120H20c-16.5 0-24.69 19.88-13.19 31.38L98.4 372.6c3.5 3.4 8.1 5.4 13 5.4s9.594-1.1 13.09-5.375l91.53-91.25C227.5 269.9 219.4 250 202.9 250z' />
            </svg>
            {active && (
                <div className={styles.options}>
                    {items.map(option => (
                        <div
                            className={`${styles.option} ${option.selected ? styles.selected : ''}`}
                            onClick={() => onSelect(option.id)}
                            key={option.id as string}
                        >
                            <div className={styles.text}>{option.text}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Select
