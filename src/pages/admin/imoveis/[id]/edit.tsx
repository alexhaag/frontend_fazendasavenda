
import { GetServerSideProps } from 'next';
import { db } from '../../../../services/firebase';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import BotaoVoltar from '../../../../components/Botoes/Voltar';

import styles from './edit.module.scss';

function EditImovel({ id }) {
  const router = useRouter();
  const [codigo, setCodigo] = useState();
  const [tipo, setTipo] = useState('');
  const [area, setArea] = useState(0);
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('RS');
  const [preco, setPreco] = useState(0);
  const [moeda, setMoeda] = useState('');
  const [obs, setObs] = useState('');
  const [publicar, setPublicar] = useState(false);

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
        moeda,
        publicar,
        created_at: Date.now()
      }


      await db.collection('imoveis').doc(id).set(data).then(() => {
        router.push(`/admin/imoveis/${id}/view`);
      });

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    db.collection('imoveis')
      .doc(id).get()
      .then((doc) => {
        const imovel = doc.data();
        setCodigo(imovel.codigo);
        setArea(imovel.area);
        setTipo(imovel.tipo);
        setCidade(imovel.cidade);
        setUf(imovel.uf);
        setMoeda(imovel.moeda);
        setObs(imovel.obs);
        setPublicar(imovel.publicar);
        setPreco(imovel.preco);
      });

  }, [])

  return (
    <div className="container">

      <BotaoVoltar referencia={`/admin/imoveis/${id}/view`} />

      <div className="titulo">
        Edição Imóvel
      </div>

      <div className={styles.content}>
        <form onSubmit={handleSubmit}>

          <div className={styles.fieldControl}>
            <div className={styles.label}>
              Código:
            </div>
            <div className={styles.field}>
              <span className={styles.codigo}>{codigo}</span>
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
                value={area}
                maxLength={10}
                size={10}
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
                size={10}
                maxLength={10}
                onChange={e => setPreco(Number(e.target.value))}
                placeholder="Valor"
              />
            </div>
          </div>

          <div className={styles.fieldControl}>
            <div className={styles.label}>Obs:</div>

            <textarea
              cols={25}
              rows={2}
              value={obs}
              onChange={e => setObs(e.target.value)}
              placeholder="Obs"
            >
            </textarea>

          </div>

          <div className={styles.fieldControl}>
            <div className={styles.label}>
              Moeda:
            </div>
            <div className={styles.field}>
              <select value={moeda} onChange={e => setMoeda(e.target.value)}>
                <option value="R$">R$</option>
                <option value="sacos de soja">sacos de soja</option>
                <option value="U$">U$</option>
              </select>
            </div>
          </div>

          <div className={styles.fieldControl}>
            <div className={styles.label}>
              Publicar:
            </div>
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
              <button type="submit">ATUALIZAR</button>
            </div>
          </div>

        </form>
      </div>
    </div >
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const id = String(ctx.query.id);


  return {
    props: {
      id
    }
  }
}

export default EditImovel;

