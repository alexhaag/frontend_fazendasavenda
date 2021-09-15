import { useEffect, useState } from "react";
import { storage, db, auth } from '../../../../services/firebase';
import Link from 'next/link';
import styles from './fotos.module.scss';

function Upload({ imovel }) {
  const [fotos, setFotos] = useState([]);
  const id = imovel.id;

  const onFileChange = async (e) => {

    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child('galeria').child(file.name);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL()

    db.collection("galeria").doc().set({
      imovel_id: id,
      nome: file.name,
      url: fileUrl
    })
  }

  useEffect(() => {
    db.collection('galeria').where("imovel_id", "==", id)
      .onSnapshot(
        (snapshot) => setFotos(
          snapshot.docs.map((doc) => {
            const eventData = doc.data()
            eventData.id = doc.id
            return eventData;
          })
        )
      );
  }, []);

  const handleDelete = (id, nome) => {

    const imgRef = storage.ref().child('galeria').child(nome);
    imgRef.delete().then(() => {
      db.collection('galeria')
        .doc(id).delete();
    }).catch((error) => {
      console.log("O arquivo não foi apagado: ", error);
    })

  }

  return (

    <div className="container">
      <div className={styles.content}>
        <p className="subtitulo">
          <Link href={`/admin/imoveis/${id}/view`}>
            <a>Voltar</a>
          </Link>
        </p>
        <div className={styles.dados_imovel}>
          <h2>
            Imóvel: {imovel.codigo}<br />
            Área: {imovel.area}<br />
            Cidade: {imovel.cidade} / {imovel.uf}<br />
            Proprietário:
          </h2>
        </div>
        <form >
          <h3>Selecionar um arquivo:</h3>
          <p>
            <input type="file"
              onChange={onFileChange}
              className={styles.bt_file}
            />
          </p>
        </form>
        <div className={styles.galeria}>
          {fotos.map((foto) => {
            return (
              <div key={foto.id} className={styles.foto}>
                <img src={foto.url} alt={foto.nome} width="310" height="280" />
                <p>
                  <button
                    onClick={() => handleDelete(foto.id, foto.nome)}
                    className={`${styles.bt} ${styles.bt_excluir}`}>
                    Excluir
                  </button>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>

  )
}

export const getServerSideProps = async (ctx) => {

  const id = String(ctx.query.id);
  const imovelRef = db.collection('imoveis').doc(id);
  const doc = await imovelRef.get();
  const imovel = doc.data();
  imovel.id = id;

  return {
    props: {
      imovel
    }
  }
}
export default Upload;