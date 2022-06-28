import styles from './Conditions.module.css'
import { removeCondition, setCondition, toggleOperator } from '../../app/automationSlice'
import { useState, useRef } from 'react'
import { useClickAway } from '../../utils'
import { useDispatch } from 'react-redux'
import { selects } from '../../app/selects'
import Options from '../../components/selects/Options'

const Condition = ({ id, condition, index }) => {
    const ref = useRef()
    const dispatch = useDispatch()
    useClickAway(ref, () => setShowOptions(false))
    const [showOptions, setShowOptions] = useState(false)
    const { type, device, state, start, end, isAnd } = condition

    switch (type) {
        case 'state':
            const name = selects.allDevices.find(d => d.id === device)?.name || 'Device'
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
                            options={selects.allDevices}
                            selected={device}
                            onSelect={device => dispatch(setCondition({ id, index, device }))}
                            ref={ref}
                        />
                    )}
                </div>
            )
        case 'range':
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
        case 'operator':
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
