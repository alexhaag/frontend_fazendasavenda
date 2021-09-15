import { useEffect, useState } from 'react';
import { db } from '../../../services/firebase';
import Link from 'next/link';
import { Imoveis } from '../../../dtos/Imovel';
import BotaoIncluir from '../../../components/Botoes/Incluir';
import styles from './styles.module.scss';

interface ImoveisProps {
  imoveis?: Imoveis[];
}

function IndexAdmin() {
  const [imoveis, setImoveis] = useState([]);
  const [tipoSelect, setTipoSelect] = useState('Fazenda');

  useEffect(() => {
    db.collection('imoveis')
      .where("tipo", "==", tipoSelect)
      .onSnapshot(
        (snapshot) => setImoveis(
          snapshot.docs.map((doc) => {
            const eventData = doc.data()
            eventData.id = doc.id
            return eventData;
          })
        )
      );

  }, [tipoSelect]);

  return (
    <div className={styles.container}>
      <BotaoIncluir refer="/admin/imoveis/formulario" />
      <h1>Administração das fazendas</h1>
      <div className={styles.content}>
        <form>
          <label>LISTAR: </label>
          <select value={tipoSelect} onChange={e => setTipoSelect(e.target.value)}>
            <option value="Arrendamento">Arrendamento</option>
            <option value="Fazenda">Fazenda</option>
            <option value="Sítio">Sítio</option>
          </select>
        </form>
        <table>
          <thead>
            <tr>
              <th align="center"><b>CÓD</b></th>
              <th align="center"><b>ÁREA</b></th>
              <th align="center"><b>CIDADE/UF</b></th>
              <th align="center"><b>PUBLICADO?</b></th>
              <th align="center"></th>
              <th align="center"></th>
            </tr>
          </thead>
          <tbody>

            {
              imoveis.length > 0 ? (
                imoveis.map((imovel) => (
                  <tr key={imovel.id} >
                    <td align="center">{imovel.codigo}</td>
                    <td align="center">{imovel.area}</td>
                    <td align="center">{imovel.cidade} - {imovel.uf}</td>
                    <td align="center">{imovel.publicar ? 'SIM' : 'NÃO'}</td>
                    <td align="center">
                      <Link href={`/admin/imoveis/${imovel.id}/view/`}><a>[visualizar]</a></Link>
                    </td>
                  </tr>
                ))
              ) : (<tr><td colSpan={4}><h3>Não há dados registrados até o momento.</h3></td></tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

/*
export const getServerSideProps: GetServerSideProps = async () => {

  const dbRef = db.collection('imoveis')
    .orderBy('codigo', 'desc')
    .where('tipo', '==', 'Fazenda')
  const data = await dbRef.get();
  const result = data.docs.map(
    doc => ({ ...doc.data(), id: doc.id })
  );

  return {
    props: {
      imoveis: result
    }
  }
}
*/

export default IndexAdmin;