import { useEffect, useState } from 'react';
import Image from 'next/image';
import { db, storage } from '../../services/firebase'
import styles from './styles.module.scss';

function Galeria({ id, newUrl = "" }) {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    db.collection('galeria')
      .where("imovel_id", "==", id)
      .onSnapshot(
        (snapshot) => setFotos(
          snapshot.docs.map((doc) => {
            const eventData = doc.data()
            eventData.id = doc.id
            return eventData;
          })
        )
      );
  }, [newUrl]);

  const handleDelete = (index, nome) => {

    const imgRef = storage.ref().child('imoveis').child(nome);
    imgRef.delete().then(() => {
      //imovel.fotos.splice(index, 1);
    }).catch((error) => {
      console.log("O arquivo não foi apagado: ", error);
    })

  }


  return (
    <div className={styles.container}>
      {
        fotos.map((foto, index) => {
          return (
            <div key={index} className={styles.foto}>

              <Image
                src={foto.url}
                alt={foto.nome}
                width={310}
                height={280}
              />

              <button
                onClick={() => handleDelete(index, foto.nome)}
                className={`${styles.bt} ${styles.bt_excluir}`}>
                Excluir
              </button>

            </div>
          )
        })
      }

    </div>
  )
}

export default Galeria;

