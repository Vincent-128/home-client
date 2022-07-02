import { addAutomation, getAutomations, saveAutomations } from '../../app/automationSlice'
import { useAppDispatch } from '../../app/hooks'
import { useSelector } from 'react-redux'
import { Title } from '../../components'
import styles from './Automations.module.css'
import Weekdays from './Weekdays'
import Entry from './Entry'
import Event from './Event'

const Automations = () => {
    const automations = useSelector(getAutomations)
    const dispatch = useAppDispatch()

    return (
        <div className={styles.automations}>
            {automations.map(automation => (
                <div className={styles.automation} key={automation.id}>
                    <Title title='Event' />
                    <Event id={automation.id} trigger={automation.trigger} />
                    <Title title='Weekdays' />
                    <Weekdays id={automation.id} selected={automation.weekdays} />
                    <Title title='Sequence' />
                    <Entry id={automation.sequence} />
                </div>
            ))}
            <div className={styles.button} onClick={() => dispatch(addAutomation())}>
                Add
            </div>
            <div className={styles.buttonGroup}>
                <div className={styles.button} onClick={() => dispatch(saveAutomations(true))}>
                    Save
                </div>
                <div className={styles.cancel} onClick={() => dispatch(saveAutomations(false))}>
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default Automations
