import { getAutomations } from '../../app/automationSlice'
import { useSelector } from 'react-redux'
import { Title } from '../../components'
import styles from '../views.module.css'
import Entry from './Entry'
import Event from './Event'
import Weekdays from './Weekdays'

const Automations = () => {
    const automations = useSelector(getAutomations)

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
        </div>
    )
}

export default Automations
