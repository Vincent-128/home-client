import styles from './Title.module.css'

const Title = ({ title }: { title: string }) => {
    return <div className={styles.title}>{title}</div>
}

export default Title
