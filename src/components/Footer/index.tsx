import { RedesSociais } from '../RedesSociais';
import { Empresas } from '../Home/Empresas';
import Logo from '../Logo';
import styles from './styles.module.scss';

export function Footer() {
  return (
    <div className={styles.container}>
      <Empresas />
      <div>
        <Logo />
        <span className={styles.fazendasavenda}>fazendas a venda</span>
      </div>
      <RedesSociais />
    </div>
  );
}