
import { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AiFillCloseCircle } from 'react-icons/ai';
import Link from 'next/link';
import Logo from '../Logo';
import { RedesSociais } from "../RedesSociais";
import { Empresas } from "../Home/Empresas"

import { SidebarData } from './sidebarData';
import { FaBars, FaWhatsapp } from 'react-icons/fa';


import styles from './styles.module.scss';

export default function Aside() {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const [onMenu, setOnMenu] = useState(true);

  async function handleSignOut(event: FormEvent) {
    event.preventDefault();
    signOut();
  }

  return (
    <>
      <div className={styles.container}>

        <div className={styles.bars}>
          <button type="button" onClick={() => setOnMenu(false)}>
            <FaBars size={35} />
          </button>
        </div>

        <div className={styles.whatsapp}>
          <Link href="https://api.whatsapp.com/send?phone=5551999790578">
            <a target="_blank">
              <FaWhatsapp size={60} color="white" style={{
                background: "green",
                borderRadius: "100%",
              }} />
            </a>
          </Link>

        </div>

        <nav className={onMenu ? styles.closeMenu : styles.openMenu}>

          <div className={styles.btClose}>
            <button type="button" onClick={() => setOnMenu(true)} >
              <AiFillCloseCircle size={60} />
            </button>
          </div>

          <Logo />

          <span className={styles.txtFazendasavenda}>
            fazendas à venda
          </span>

          <ul >
            {
              SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName} >
                    <Link href={item.path}  >
                      <a onClick={() => setOnMenu(true)}>
                        {item.title}
                      </a>
                    </Link>
                  </li>
                )
              })
            }
            <li>
              {
                isAuthenticated ?
                  (<Link href="#">
                    <a onClick={handleSignOut}>lOGOUT</a>
                  </Link>)
                  : (<Link href="/login">ADMINISTRAÇÃO</Link>)
              }
            </li>
          </ul>
          <RedesSociais />
          <Empresas />
        </nav>
      </div>
    </>

  )
}