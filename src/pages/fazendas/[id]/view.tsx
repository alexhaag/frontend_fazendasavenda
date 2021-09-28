
import { GetStaticProps } from 'next';
import { db } from "../../../services/firebase";
import { Imoveis } from '../../../dtos/Imovel';
import Galeria from '../../../components/Galeria';
import BotaoVoltar from "../../../components/Botoes/Voltar";
import styles from './styles.module.scss';

interface ImovelProps {
  imovel?: Imoveis;
}

export default function FazendaView({ imovel }: ImovelProps) {

  return (
    <div className={styles.container}>
      <BotaoVoltar referencia={"/fazendas"} />
      <h1 className="titulo">Fazenda - Código: {imovel?.codigo}</h1>
      <div className={styles.content}>
        <aside className={styles.aside}>
          <h2 className={styles.titulo}>Descrição:</h2>
          <div><b>Área: </b>{imovel?.area}</div>
          <div><b>Cidade: </b>{imovel?.cidade} - {imovel?.uf}</div>
          <div><b>Preço: </b>{imovel?.preco}</div>
          <div><b>Moeda: </b>{imovel?.moeda}</div>
          <div><b>Observações: </b><br />{imovel?.obs}</div>
          <div className={styles.contato}>
            <div><b><u>Contato: </u></b></div>
            <div className={styles.whatsapp}>
              <a href="https://wa.me/5551999790578">
                <b>WhatsApp: </b>
                +55 51 99979-0578
              </a>
            </div>
            <div>
              <b>E-Mail: </b>
              <a href="mailto:araujo@fazendasavenda.com.br">
                araujo@fazendasavenda.com.br
              </a>
            </div>
          </div>
        </aside>
      </div>
      <Galeria imagens={imovel?.fotos} />
    </div>
  );

}

export const getStaticProps: GetStaticProps<ImovelProps> = async (context) => {
  const id = String(context.params.id);
  const data = [];

  const docRef = db.collection("imoveis").doc(id);
  const doc = await docRef.get();
  if (doc.exists) {
    const resultado = doc.data();
    resultado.id = doc.id;
    data.push(resultado);
  } else {
    console.log('Documento inexistente')
  }

  return {
    props: {
      imovel: data[0]
      // revalidate: 10
    }
  }
}

export async function getStaticPaths() {
  const data = []
  const dbRef = db.collection("imoveis")
  await dbRef.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let resultado = doc.data();
        resultado.id = doc.id;
        data.push(resultado);
      })
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  const paths = data.map(d => {
    return { params: { id: String(d.id) } }
  })
  return {
    paths,
    fallback: true
  }
}
