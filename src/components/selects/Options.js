import { forwardRef } from 'react'
import styles from '../../styles/Input.module.css'

const Options = forwardRef(({ options, onSelect }, ref) => {
    return (
        <div className={styles.options} ref={ref}>
            {options.map(option => (
                <div
                    className={styles.option + (option.selelected ? ' ' + styles.checked : '')}
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
