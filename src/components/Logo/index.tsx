/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <a href="/">
        <img src="/images/logo.png" alt="FaV" />
      </a>
    </div>
  );
}