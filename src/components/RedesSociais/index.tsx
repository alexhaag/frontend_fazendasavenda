
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from './styles.module.scss';

export function RedesSociais() {
  return (
    <div className={styles.containerSocial}>
      <div>
        <Link href="https://facebook.com/fazendasavenda1">
          <a target="_blank">
            <FaFacebookF size={20} />
          </a>
        </Link>
      </div>
      <div>
        <Link href="https://instagram.com/fazendasavenda1">
          <a target="_blank">
            <FaInstagram size={20} />
          </a>
        </Link>
      </div>
      <div>
        <Link href="https://www.youtube.com/channel/UCSPpaKVkVXcmfthV7wxmxVA">
          <a target="_blank">
            <FaYoutube size={20} />
          </a>
        </Link>
      </div>
    </div>
  );
}