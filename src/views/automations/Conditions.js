import styles from './Conditions.module.css'
import { addCondition, removeEntry } from '../../app/automationSlice'
import { useDispatch } from 'react-redux'
import RemoveButton from '../../components/buttons/RemoveButton'
import AddButton from '../../components/buttons/AddButton'
import Condition from './Condition'

const Conditions = ({ id, conditions }) => {
    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <RemoveButton onClick={() => dispatch(removeEntry(id))} />
            <div className={styles.if}>If</div>
            {conditions.map((condition, index) => (
                <Condition id={id} condition={condition} index={index} key={index} />
            ))}
            <AddButton
                options={[
                    { id: 'state', value: 'State' },
                    { id: 'range', value: 'Range' },
                ]}
                onClick={type => dispatch(addCondition({ id, type }))}
            />
        </div>
    )
}

export default Conditions
