import ActionBar from '../action-bar'
import { Content } from '../content'
import styles from './style.module.css'

export default function App() {
  return (
    <div className={styles.layout}>
      <Content />
      <ActionBar />
    </div>
  )
}
