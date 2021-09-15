import { db } from "../../services/firebase";
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiCameraOff } from 'react-icons/fi';
import { Imoveis } from '../../dtos/Imovel';
import { Footer } from "../../components/Footer";
import styles from './styles.module.scss'

interface ImoveisProps {
  imoveis?: Imoveis[];
}

function Arrendamentos({ imoveis }: ImoveisProps) {


  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className="subtitulo">
            <Link href="/">
              <a>Voltar</a>
            </Link>
          </span>
          <h1 className="titulo">Arrendamentos</h1>

          <div className={styles.fotos}>

            {
              imoveis.length <= 0
                ? ("Não a cadastro")
                : (
                  imoveis.map((imovel, index) => (

                    <div className={styles.cardsFotos} key={index}>
                      {
                        imovel.fotos.length > 0
                          ? (
                            <Image
                              src={imovel.fotos[0].url}
                              height={280}
                              width={280} alt=""
                            />
                          )
                          : (
                            <div className="semFoto">
                              <FiCameraOff size={35} />
                            </div>
                          )
                      }
                      <div className={styles.cardsDados}>
                        Código: {imovel.codigo}<br />
                        Área: {imovel.area}<br />
                        Preço: {imovel.preco}<br />
                        <span className={styles.saibamais}>
                          <Link href={`/arrendamentos/${imovel.id}/view`}>
                            <a>saiba mais</a>
                          </Link>
                        </span>
                      </div>
                    </div>

                  ))
                )
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const dbRef = db.collection("imoveis")
    .where("tipo", "==", "Arrendamento")

  const data = await dbRef.get();

  const doc = data.docs.map(doc => {
    const imovel = doc.data();
    imovel.id = doc.id;
    return imovel;
  });

  return {
    props: {
      imoveis: doc
    }
  }
}

export default Arrendamentos;