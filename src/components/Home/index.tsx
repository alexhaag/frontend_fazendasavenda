
import { Abertura } from './Abertura';
import { CardsSelecaoArea } from '../CardsSelecaoArea';
import { QuemSomos } from './QuemSomos';
import { Formulario } from './Formulario';
import { Footer } from '../Footer';
import styles from './styles.module.scss';

export function Home() {
  return (
    <div className={styles.container}>
      <Abertura />
      <CardsSelecaoArea />
      <QuemSomos />
      <Formulario />
      <Footer />
    </div>
  );
}