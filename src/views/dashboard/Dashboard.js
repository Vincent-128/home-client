import { useSelector } from 'react-redux'
import { getLayout } from '../../app/userSlice'
import { Select } from '../../components/selects'
import { selects } from '../../app/selects'
import styles from '../views.module.css'
import Device from './Device'

const Dashboard = () => {
    const layout = useSelector(getLayout)
    return (
        <div>
            <Select selected='home' options={selects.rooms} onSelect={console.log} />

            <div className={styles.dashboard}>
                {layout.map(device => {
                    const [id, index] = device.split('/')
                    return <Device id={id} index={parseInt(index)} key={device} />
                })}
            </div>
        </div>
    )
}

export default Dashboard
