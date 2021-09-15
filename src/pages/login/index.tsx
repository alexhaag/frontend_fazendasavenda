import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './styles.module.scss';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, signOut } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    }
    await signIn(data)
  }

  async function handleSignOut(event: FormEvent) {
    event.preventDefault();
    signOut();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>

      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>

      <button onClick={handleSignOut}>Sair</button>

    </form>
  );

}

//export const getServerSideProps = withSSRGuest(async (ctx) => {
//  return {
//    props: {}
//  }
//});
