import Aside from "../../components/Aside";
import styles from "./styles.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Aside />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Layout;