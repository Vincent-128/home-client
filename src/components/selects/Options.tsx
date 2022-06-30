import { forwardRef } from 'react'
import styles from '../../styles/Input.module.css'

interface Props {
    options: {
        id: string
        name: string
        selected: boolean
    }[]
    onSelect: (selected: string) => void
}

const Options = forwardRef<HTMLDivElement, Props>(({ options, onSelect }, ref) => {
    return (
        <div className={styles.options} ref={ref}>
            {options.map(option => (
                <div
                    className={styles.option + (option.selected ? ' ' + styles.checked : '')}
                    onClick={() => onSelect(option.id)}
                    key={option.id}
                >
                    {option.name}
                </div>
            ))}
        </div>
    )
})

export default Options
