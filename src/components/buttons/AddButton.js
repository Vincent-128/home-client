import { useRef } from 'react'
import styles from './AddButton.module.css'

const AddButton = ({ options, onClick }) => {
    const ref = useRef()

    const onMouse = () => {
        const test = ref.current.classList.toggle(styles.expand)
        ref.current.style.width = test ? ref.current.scrollWidth - 6 + 'px' : '24px'
    }

    return (
        <div className={styles.add} ref={ref} onMouseEnter={onMouse} onMouseLeave={onMouse}>
            <svg className={styles.plus} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                <path d='M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z' />
            </svg>
            {options.map(option => (
                <div className={styles.option} key={option.id} onClick={() => onClick(option.id)}>
                    {option.value}
                </div>
            ))}
        </div>
    )
}

export default AddButton
