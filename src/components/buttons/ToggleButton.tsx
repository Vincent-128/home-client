import styles from '../Input.module.css'

interface Props {
    label: string
    on: string
    off: string
    state: boolean
    onClick: (state: boolean) => void
}

const Toggle = ({ label, on, off, state, onClick }: Props) => {
    return (
        <div className={styles.container + ' ' + styles.minimize} onClick={() => onClick(!state)}>
            <div className={styles.label}>{label}</div>
            <div className={styles.selectText}>{state ? on : off}</div>
        </div>
    )
}

export default Toggle
