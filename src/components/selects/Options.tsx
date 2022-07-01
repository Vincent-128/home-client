import { forwardRef, Ref } from 'react'
import styles from '../Input.module.css'

type Type = any

interface Props<T extends Type> {
    options: {
        id: T
        text: string
        selected: boolean
    }[]
    onSelect: (selected: T) => void
}

const Options = forwardRef(<T extends Type>({ options, onSelect }: Props<T>, ref: Ref<HTMLDivElement>) => {
    return (
        <div className={styles.options} ref={ref}>
            {options.map(option => (
                <div
                    className={styles.option + (option.selected ? ' ' + styles.checked : '')}
                    onClick={() => onSelect(option.id)}
                    key={option.text}
                >
                    {option.text}
                </div>
            ))}
        </div>
    )
})

export default Options as <T extends Type>(props: Props<T> & { ref: Ref<HTMLDivElement> }) => JSX.Element
