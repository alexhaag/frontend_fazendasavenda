
import { GetServerSideProps } from 'next';
import Permissao from '../../../../components/Permissao'
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../../services/firebase';
import BotaoVoltar from '../../../../components/Botoes/Voltar';
import { Imoveis } from '../../../../dtos/Imovel';
import styles from './styles.module.scss';



export default function Formulario({ indice }) {

  const router = useRouter();

  const [codigo, setCodigo] = useState(indice);
  const [tipo, setTipo] = useState('Fazenda');
  const [area, setArea] = useState(0);
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('RS');
  const [preco, setPreco] = useState(0);
  const [obs, setObs] = useState('');
  const [moeda, setMoeda] = useState('R$');
  const [publicar, setPublicar] = useState(false);

  interface ImovelDTO {
    data: Imoveis
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const data = {
        codigo,
        tipo,
        area,
        cidade,
        uf,
        preco,
        obs,
        fotos: [],
        proprietario: [],
        moeda,
        publicar,
        created_at: Date.now()
      }

      await db.collection('imoveis')
        .add(data).then((response) => {
          const id = response.id;
          router.push(`/admin/imoveis/${id}/view`)
        });

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <Permissao />
      <BotaoVoltar referencia={`/admin/imoveis/`} />

      <div className="titulo">
        Incluir Imóvel
      </div>

      <div className={styles.content}>

        <form onSubmit={handleSubmit}>

          <div className={styles.fieldControl}>
            <div className={styles.label}>
              Código:
            </div>
            <div className={styles.field}>
              <span className={styles.codigo}>{indice}</span>
            </div>
          </div>

          <div className={styles.fieldControl}>
            <div className={styles.label}>
              Classificação:
            </div>
            <div className={styles.field}>
              <select value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="Arrendamento">Arrendamento</option>
                <option value="Fazenda">Fazenda</option>
                <option value="Sítio">Sítio</option>
              </select>
            </div>
          </div>
          <div className={styles.fieldControl}>
            <div className={styles.label}>Área:</div>
            <div className={styles.field}>
              <input
                maxLength={10}
                size={10}
                value={area}
                onChange={e => setArea(Number(e.target.value))}
                placeholder="Area"
              />
            </div>
          </div>
          <div className={styles.fieldControl}>
            <div className={styles.label}>Cidade:</div>
            <div className={styles.field}>
              <input
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                placeholder="Cidade"
              />
            </div>
          </div>
          <div className={styles.fieldControl}>
            <div className={styles.label}>U.F.:</div>
            <div className={styles.field}>
              <input
                value={uf}
                maxLength={2}
                size={2}
                onChange={e => setUf(e.target.value)}
                placeholder="UF"
              />
            </div>
          </div>
          <div className={styles.fieldControl}>
            <div className={styles.label}>Preço:</div>
            <div className={styles.field}>
              <input
                value={preco}
                size={20}
                maxLength={20}
                onChange={e => setPreco(Number(e.target.value))}
                placeholder="Preço"
              />
            </div>
          </div>
          <div className={styles.fieldControl}>
            <div className={styles.label}>Obs:</div>
            <div className={styles.field}>
              <input
                value={obs}
                onChange={e => setObs(e.target.value)}
                placeholder="Obs"
              />
            </div>
          </div>
          <div className={styles.fieldControl}>
            <div className={styles.label}>Moeda:</div>
            <div className={styles.field}>
              <select value={moeda} onChange={e => setMoeda(e.target.value)}>
                <option value="R$">R$</option>
                <option value="sacos de soja">sacos de soja</option>
                <option value="U$">U$</option>
              </select>
            </div>
          </div>

          <div className={styles.fieldControl}>
            <div className={styles.label}>Publicar:</div>
            <div className={styles.field}>
              <input
                type="checkbox"
                checked={publicar}
                onChange={e => setPublicar(e.target.checked)}
              />
            </div>

          </div>
          <div className={styles.fieldControl}>
            <div className={styles.label}></div>
            <div>
              <button type="submit">SALVAR</button>
            </div>
          </div>

        </form>
      </div>
    </div >
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = []
  await db.collection('imoveis')
    .get().then((querySnapshot) => {
      const total = 1 + querySnapshot.size;
      data.push(total);
    });
  const indice = data[0];
  return {
    props: { indice }
  }
};