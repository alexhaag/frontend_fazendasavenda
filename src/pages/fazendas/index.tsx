import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { db } from '../../services/firebase';
import { FiCameraOff } from 'react-icons/fi';
import Image from 'next/image';
import { CardsSelecaoArea } from '../../components/CardsSelecaoArea';
import { Imoveis } from '../../dtos/Imovel';
import { Footer } from "../../components/Footer";

interface ImoveisProps {
  imoveis?: Imoveis[];
}

import styles from './styles.module.scss';


function Fazendas({ imoveis }: ImoveisProps) {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className="subtitulo">Ache sua fazenda por ha</span>
          <h1 className="titulo">Fazendas</h1>

          <CardsSelecaoArea />
          <div className={styles.fotos}>
            {imoveis.map((imovel, index) => {

              return (
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
                      <Link href={`/fazendas/area/${imovel.id}`}>
                        <a>saiba mais</a>
                      </Link>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
}

export const getServerSideProps: GetServerSideProps<ImoveisProps> = async () => {
  const data = [];
  const dbRef = db.collection("imoveis")
    .where("tipo", "==", "Fazenda");

  await dbRef.get()
    .then((doc) => {
      doc.docs.map((d) => {
        const result = d.data();
        result.id = d.id;
        data.push(result);
      })


    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  return {
    props: {
      imoveis: data
    }
  }
}

export default Fazendas;
