import Link from 'next/link';
import styles from './styles.module.scss'

function BotaoInserir(props) {

  return (
    <div className={styles.container}>
      <Link href={props.refer}>
        <a className={styles.btInserir}>+</a>
      </Link>
    </div>
  )
}

export default BotaoInserir;