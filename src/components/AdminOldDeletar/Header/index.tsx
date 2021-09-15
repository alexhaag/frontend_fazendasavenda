import styles from './styles.module.scss';

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <nav>
          <ul className={styles.menu}>
            <li>Fazendas</li>
            <li>Arrendamentos</li>
            <li>Sítios</li>
            <li>Sair</li>
          </ul>

        </nav>
      </div>
    </div>
  );

}