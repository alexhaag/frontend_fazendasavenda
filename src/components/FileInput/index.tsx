import { useState } from 'react';
import { db, storage } from '../../services/firebase';
import styles from './styles.module.scss';
import Galeria from '../../components/GaleriaAdmin';

function FileInput({ id }) {
  const [newUrl, setNewUrl] = useState('');
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child('imoveis').child(file.name);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL()
    setNewUrl(fileUrl);
    const foto = {
      imovel_id: id,
      nome: file.name, url: fileUrl
    }

    await db.collection("imoveis").doc(id).set(foto);
  }

  return (
    <div>
      <form >
        <h3>Selecionar um arquivo:</h3>
        <input type="file"
          onChange={onFileChange}
          className={styles.bt_file}
        />
      </form>
      <Galeria id newUrl={newUrl} />
    </div>
  );
}

export default FileInput;