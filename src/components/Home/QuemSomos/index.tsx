import Image from 'next/image';
import empresa from '../../../../public/images/empresa.jpg';
import styles from './styles.module.scss';

export function QuemSomos() {
  return (
    <div id="quemsomos" className={styles.container}>

      <span className="subtitulo">A empresa</span>
      <h2 className="titulo">Quem Somos</h2>

      <section className={styles.apresentacao}>

        <Image
          className={styles.imgQuemSomos}
          src={empresa}
          alt="Empresa"
          width={400}
          height={400}
          objectFit="cover"
        />

        <article className={styles.quebraP}>

          <span className={styles.subtitulo}>FAZENDAS À VENDA</span>
          <div className={styles.espaco}></div>

          <p>
            Atuamos na comercialização e assessoria imobiliária, apresentando a oferta mais qualificada de Fazendas.
          </p>
          <p>
            Primamos pela confiança, credibilidade e ética, fatores fundamentais para o fechamento de um negócio, pois sabemos o quanto é importante, para você, empreendedor, investir com segurança em um imóvel que lhe traga rentabilidade e satisfação.
          </p>

          <div className={styles.contato}>
            <div>
              <b>Telefone:</b><br /> +55 (51) 99979-0578
            </div>
            <div>
              <b>
                E-Mail:
              </b> <br /> araujo@fazendasavenda.com.br
            </div>
          </div>

        </article>

      </section>

      <section className={styles.descricao}>

        <article className={styles.descricao_colunas}>
          <div>
            <p>
              Temos certeza de que a seriedade, competência, conhecimento técnico e qualidade no atendimento nos diferencia dentro do mercado imobiliário.
            </p>
            <p>
              Tais qualidades transmitem a você a segurança necessária para realização de uma transação imobiliária.
            </p>
            <p>
              Ante essas características, cabe ressaltar que possuímos Assessoria Jurídica para dirimir quaisquer dúvidas, consultoria Agronômica e Geológica para a medição de áreas, análise e qualidade de solo, estudo de águas subterrâneas quanto ao volume, distribuição e qualidade dentre outras.
            </p>
          </div>
          <div>
            <p>
              Aplicamos nosso serviço de assessoria imobiliária às necessidades e expectativas dos clientes, uma vez que apresentamos as melhores ofertas de qualidade e rentabilidade do ramo imobiliário rural.
            </p>
            <p>
              Agimos no mercado com comportamento ético irrepreensível, cordialidade e transparência em todas as ações.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}