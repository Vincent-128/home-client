import styles from '../styles/Navbar.module.css'
import { useLongPress } from '../utils'
import { Link } from 'react-router-dom'

const themes = ['carbon', 'proton', 'monokai', 'snow', 'legacy', 'contrast']
const colors = ['#1a1d24','#1c223d','#11121d','#ffffff','#505061','#ffffff']

const Navbar = () => {
    const onLongPress = () => {
        console.log('Navbar long press')
    }

    const changeTheme = () => {
        const body = document.querySelector('body')!
        const index = themes.indexOf(body.classList[0])
        const nextIndex = index === 5 ? 0 : index + 1
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors[nextIndex])
        body?.classList.replace(themes[index], themes[nextIndex])
    }

    return (
        <div className={styles.container} {...useLongPress(onLongPress, { isPreventDefault: false })}>
            <Link className={styles.title} to='/'>Home</Link>
            <div className={styles.spacer}></div>
            <div className={styles.link} onClick={changeTheme}>Theme</div>
            <Link className={styles.link} to='/'>Dashboard</Link>
            <Link className={styles.link} to='/automations'>Automations</Link>
            <Link className={styles.link} to='/settings'>Settings</Link>
        </div>
    )
}

export default Navbar
