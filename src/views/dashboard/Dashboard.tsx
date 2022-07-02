import { useSelector } from 'react-redux'
import { getLayout } from '../../app/userSlice'
import styles from '../views.module.css'
import Device from './Device'

const Dashboard = () => {
    const layout = useSelector(getLayout)
    return (
        <div>
            <div className={styles.dashboard}>
                {layout.map(device => {
                    const [id, index] = device.split('=>')
                    return <Device id={id} index={parseInt(index)} key={device} />
                })}
            </div>
        </div>
    )
}

export default Dashboard
