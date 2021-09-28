import { db } from "../../../services/firebase";
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FiCameraOff } from 'react-icons/fi';
import { Imoveis } from '../../../dtos/Imovel';
import styles from '../styles.module.scss'

interface ImoveisProps {
  imoveis?: Imoveis[];
}

function Areas({ imoveis }: ImoveisProps) {
  const router = useRouter();
  const area = router.query.area;

  const titulo = (typeof area === "object")
    ? `Fazendas de ${area[0]} a ${area[1]} ha`
    : (area === 'undefined')
      ? "Todas fazendas"
      : `Fazendas acima de ${area} ha`;

  return (
    <>
      <div className="container">
        <span className="subtitulo">
          <Link href="/fazendas">
            <a>Voltar</a>
          </Link>
        </span>
        <h1 className="titulo">{titulo}</h1>

        <div className={styles.fotos}>

          {
            imoveis.length <= 0
              ? ("Não a cadastro")
              : (
                imoveis.map((imovel, index) => (

                  <div className={styles.cardsFotos} key={index}>
                    {
                      imovel.fotos
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
                        <Link href={`/fazendas/${imovel.id}/view`}>
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let data;
  const { area } = context.query;
  const dbRef = db.collection("imoveis").where("tipo", "==", "Fazenda");

  function queryComposta(area) {
    return dbRef.where("area", ">", Number(area[0]))
      .where("area", "<", Number(area[1])).get();
  }
  function querySimples(area) {
    return dbRef.where("area", ">", Number(area)).get();
  }
  if (area !== 'undefined') {
    data = (typeof area === "object")
      ? await queryComposta(area)
      : await querySimples(area);
  } else {
    data = await dbRef.get();
  }


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

export default Areas;