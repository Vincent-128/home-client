import styles from './Conditions.module.css'
import { Condition as C, ConditionType } from '../../types'
import { addCondition, removeEntry } from '../../app/automationSlice'
import { RemoveButton, AddButton } from '../../components/buttons'
import { useDispatch } from 'react-redux'
import Condition from './Condition'

interface Props {
    id: string
    conditions: C[]
}

const options: { id: ConditionType; text: string }[] = [
    { id: ConditionType.State, text: 'State' },
    { id: ConditionType.Range, text: 'Range' },
]

const Conditions = ({ id, conditions }: Props) => {
    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <RemoveButton onClick={() => dispatch(removeEntry(id))} />
            <div className={styles.if}>If</div>
            {conditions.map((condition, index) => (
                <Condition id={id} condition={condition} index={index} key={index} />
            ))}
            <AddButton options={options} onClick={type => dispatch(addCondition({ id, type: type as ConditionType }))} />
        </div>
    )
}

export default Conditions
