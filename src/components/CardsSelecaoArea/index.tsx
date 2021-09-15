import Link from 'next/link';
import { FiLayers } from 'react-icons/fi';
import styles from './styles.module.scss';

export function CardsSelecaoArea() {
  return (
    <div className={styles.container}>

      <div className={styles.cards}>
        <div>
          <Link href="/fazendas/areas?area=0&area=100">
            <a>
              <span><FiLayers size={48} /></span>
              <h3>0 a 100 Ha</h3>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/fazendas/areas?area=101&area=500">
            <a>
              <span><FiLayers size={48} /></span>
              <h3>101 a 500 Ha</h3>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/fazendas/areas?area=501&area=1000">
            <a>
              <span><FiLayers size={48} /></span>
              <h3>501 a 1000 Ha</h3>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/fazendas/areas?area=1001&area=3000">
            <a>
              <span><FiLayers size={48} /></span>
              <h3>1001 a 3000 Ha</h3>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/fazendas/areas?area=3000">
            <a>
              <span><FiLayers size={48} /></span>
              <h3>mais de 3001 Ha</h3>
            </a>
          </Link>
        </div>
        <div>
          <Link href="/fazendas/areas?area=undefined">
            <a>
              <span><FiLayers size={48} /></span>
              <h3>Todas</h3>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}