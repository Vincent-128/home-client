import { useDispatch } from 'react-redux'
import { setWeekday } from '../../app/automationSlice'
import styles from './Weekdays.module.css'

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const Weekdays = ({ id, selected }) => {
    const dispatch = useDispatch()

    return (
        <div className={styles.row}>
            {days.map((day, i) => (
                <div
                    key={i}
                    className={`${styles.day}${selected[i] ? ' ' + styles.selected : ''}`}
                    onClick={() => dispatch(setWeekday({ id, index: i, selected: !selected[i] }))}
                >
                    {day}
                </div>
            ))}
        </div>
    )
}

export default Weekdays
