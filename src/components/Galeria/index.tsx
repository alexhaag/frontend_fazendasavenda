import { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

function Galeria({ imagens }) {
  const [fotos, setFotos] = useState(imagens);

  return (
    <div className={styles.container}>
      {
        fotos?.map((foto, index) => {
          return (
            <div key={index} className={styles.foto}>

              <Image
                src={foto.url}
                alt={foto.nome}
                width={310}
                height={280}
              />

            </div>
          )
        })
      }

    </div>
  )
}

export default Galeria;

