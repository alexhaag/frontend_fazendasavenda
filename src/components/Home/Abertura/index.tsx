import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import styles from './styles.module.scss';

export function Abertura() {
  return (
    <div className={styles.container}>
      <Image
        className={styles.logo_principal}
        src={logo}
        height={200}
        width={200}
        alt="FAZENDAS À VENDA"
      />
      <h1>FAZENDAS À VENDA</h1>
      <h2>Desde 1980</h2>
    </div>
  );

}