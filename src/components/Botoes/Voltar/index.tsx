
import Link from 'next/link';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import styles from './styles.module.scss'

function BtVoltar({ referencia }) {

  return (
    <div className={styles.container}>
      <Link href={referencia}>
        <a>
          <FaRegArrowAltCircleLeft size={30} color="green" />
          <span className={styles.texto}>Voltar</span>
        </a>
      </Link>
    </div>
  )

}

export default BtVoltar;