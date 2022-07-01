import { removeCondition, setCondition, toggleOperator } from '../../app/automationSlice'
import { allDeviceOptions, Options } from '../../components/selects'
import { Condition as C, ConditionType } from '../../types'
import { useState, useRef } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { useClickAway } from '../../utils'
import styles from './Conditions.module.css'

interface Props {
    id: string
    condition: C
    index: number
}

const Condition = ({ id, condition, index }: Props) => {
    const [showOptions, setShowOptions] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    useClickAway(ref, () => setShowOptions(false))

    switch (condition.type) {
        case ConditionType.State:
            const { device, state } = condition
            const name = allDeviceOptions.find(d => d.id === device)?.text || 'Device'
            return (
                <div className={styles.condition}>
                    <div className={styles.device} onClick={() => setShowOptions(true)}>
                        {name}
                    </div>
                    <div className={styles.state} onClick={() => dispatch(setCondition({ id, index, state: !state }))}>
                        {(name[name.length - 1] === 's' ? 'Are ' : 'Is ') + (state ? 'On' : 'Off')}
                    </div>
                    <svg
                        className={styles.remove}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 320 512'
                        onClick={() => dispatch(removeCondition({ id, index }))}
                    >
                        <path d='M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z' />
                    </svg>
                    {showOptions && (
                        <Options
                            options={allDeviceOptions.map(o => ({ ...o, selected: false }))}
                            onSelect={device => dispatch(setCondition({ id, index, device }))}
                            ref={ref}
                        />
                    )}
                </div>
            )
        case ConditionType.Range:
            const { start, end } = condition
            return (
                <div className={styles.condition}>
                    <input
                        className={styles.time}
                        type='text'
                        value={start}
                        placeholder='24:00'
                        onChange={e => dispatch(setCondition({ id, index, start: e.target.value }))}
                    />
                    <div>To</div>
                    <input
                        className={styles.time}
                        type='text'
                        value={end}
                        placeholder='24:00'
                        onChange={e => dispatch(setCondition({ id, index, end: e.target.value }))}
                    />
                    <svg
                        className={styles.remove}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 320 512'
                        onClick={() => dispatch(removeCondition({ id, index }))}
                    >
                        <path d='M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z' />
                    </svg>
                </div>
            )
        case ConditionType.Operator:
            const { isAnd } = condition
            return (
                <div className={styles.operator} onClick={() => dispatch(toggleOperator({ id, index }))}>
                    {isAnd ? 'AND' : 'OR'}
                </div>
            )
        default:
            return <></>
    }
}

export default Condition
