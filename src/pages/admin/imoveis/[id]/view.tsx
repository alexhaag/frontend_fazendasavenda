import { GetServerSideProps } from "next"
import { db, auth } from "../../../../services/firebase";
import Link from "next/link";
import styles from './view.module.scss';
import { Imoveis } from "../../../../dtos/Imovel";
import Galeria from "../../../../components/Galeria"
import BotaoIncluir from '../../../../components/Botoes/Incluir';
import BotaoVoltar from '../../../../components/Botoes/Voltar';
import Permissao from "../../../../components/Permissao";

interface ImovelDTO {
  imovel?: Imoveis;
}

function FazendaView({ imovel }: ImovelDTO) {

  return (
    <div className="container">
      <Permissao />
      <BotaoIncluir refer="/admin/imoveis/formulario" />
      <BotaoVoltar referencia={`/admin/imoveis`} />
      <h1 className="titulo">Setor de Administração</h1>
      <h3 className="subtitulo">Visualização do imóvel:</h3>
      <div className={styles.content}>
        <div className={styles.control}>
          <label className={styles.label}>Código:</label>
          <div className={styles.campo}>{imovel.codigo}</div>
        </div>

        <div className={styles.control}>
          <label className={styles.label}>Classificação: </label>
          <div className={styles.campo}>{imovel.tipo}</div>
        </div>

        <div className={styles.control}>
          <label className={styles.label}>Área:</label>
          <div className={styles.campo}>{imovel.area}</div>
        </div>

        <div className={styles.control}>
          <label className={styles.label}>Cidade:</label>
          <div className={styles.campo}>{imovel.cidade} / {imovel.uf}</div>
        </div>

        <div className={styles.control}>
          <label className={styles.label}>Observações:</label>
          <div className={styles.campo}>{imovel.obs}</div>
        </div>
        <div className={styles.control}>
          <label className={styles.label}>Preço:</label>
          <div className={styles.campo}>{(Number(imovel.preco)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
        </div>


        <div className={styles.control}>
          <label className={styles.label}>Forma Pagto:</label>
          <div className={styles.campo}>{imovel.moeda}</div>
        </div>


        <div className={styles.botoes}>
          <Link href={`/admin/imoveis/${imovel.id}/edit`}>
            <a className={`${styles.bt} ${styles.bt_editar}`}>Editar Imóvel</a>
          </Link>
          <Link href={`/admin/imoveis/${imovel.id}/fotos`}>
            <a className={`${styles.bt} ${styles.bt_fotos}`}>fotos</a>
          </Link>
        </div>

        <h3 className="subtitulo">Fotos do imóvel ---------------------------</h3>
        <Galeria imagens={imovel.fotos} />
      </div>



    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {

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

export default FazendaView;