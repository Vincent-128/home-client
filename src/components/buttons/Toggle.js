import styles from '../../styles/Input.module.css'

const Toggle = ({ label, on, off, state, onClick }) => {
    return (
        <div className={styles.container + ' ' + styles.minimize} onClick={() => onClick(!state)}>
            <div className={styles.label}>{label}</div>
            <div className={styles.selectText}>{state ? on : off}</div>
        </div>
    )
}

export default Toggle
