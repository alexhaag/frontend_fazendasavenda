import React, { useState } from 'react';
import { db, storage } from '../../../../services/firebase';
import { Imoveis } from '../../../../dtos/Imovel';
import { FaTrash } from "react-icons/fa";
import BotaoVoltar from '../../../../components/Botoes/Voltar';
import Image from 'next/image';
import styles from './fotos.module.scss';
import Permissao from '../../../../components/Permissao';

interface ImovelDTO {
  imovel?: Imoveis;
}

function Upload({ imovel }: ImovelDTO) {

  const id = imovel.id;
  const [fotos, setFotos] = useState(imovel.fotos);

  const onFileChange = async (e) => {

    const file = e.target.files[0];
    const verificaExiste = fotos.map(f => f.nome);
    const exist = verificaExiste.includes(file.name);

    if (!exist) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child('imoveis').child(file.name);

      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();

      const imagem = { nome: file.name, url: fileUrl }

      if (fileUrl) {
        setFotos([...imovel.fotos, imagem]);
        imovel.fotos.push(imagem);
        await db.collection("imoveis").doc(imovel.id).set(imovel);
      }

    } else {
      console.log('já existe esta imagem para este registro.');
    };
  }

  const handleDelete = (index) => {
    const nome = imovel.fotos[index].nome;
    const imgRef = storage.ref().child('imoveis').child(nome);
    imgRef.delete().then(() => {

      imovel.fotos.splice(index, 1);

      db.collection("imoveis").doc(imovel.id).set(imovel)
        .then(() => {
          setFotos([...imovel.fotos]);
        }).catch((error) => {
          console.log("Firestore - O registro do arquivo não foi apagado: ", error);
        });

    });



  }

  return (
    <div className="container">
      <Permissao />
      <div className={styles.content}>

        <BotaoVoltar referencia={`/admin/imoveis/${id}/view`} />

        <div className={styles.dados_imovel}>
          <h2>
            Imóvel: {imovel.codigo}<br />
            Área: {imovel.area}<br />
            Cidade: {imovel.cidade} / {imovel.uf}<br />
            Proprietário:
          </h2>
        </div>
        <div>
          <form >
            <h3>Selecionar um arquivo:</h3>
            <input type="file"
              onChange={onFileChange}
              className={styles.bt_file}
            />
          </form>
          <div className={styles.galeria}>
            {
              fotos.map((foto, index) => (

                <div key={index} className={styles.foto}>

                  <Image
                    src={foto.url}
                    alt={foto.nome}
                    width={310}
                    height={280}
                    className={styles.imgCover}
                  />

                  <button
                    onClick={() => handleDelete(index)}
                    className={`${styles.bt} ${styles.bt_excluir}`}>
                    <FaTrash size={18} />
                  </button>

                </div>
              ))
            }
          </div>
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
  imovel.id = doc.id;

  return {
    props: {
      imovel
    }
  }

}

export default Upload;
