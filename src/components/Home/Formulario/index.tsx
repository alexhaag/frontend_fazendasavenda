import styles from './styles.module.scss';


export function Formulario() {
  return (
    <div className={styles.container}>

      <section id="contatos">
        <p>
          <span>
            <b>FAZENDAS À VENDA.</b> <br />
            CONFIANÇA, CREDIBILIDADE, ÉTICA, TRANSPARÊNCIA
          </span>
        </p>
        <p>
          WhatsApp: +55 51 99979-0578
        </p>
        <p>
          E-Mail: araujo@fazendasavenda.com.br
        </p>

        <p>
          Endereço: R. Marcílio Dias, 662<br />
          Gonçalves Cachoeira do Sul - RS<br />
          CEP: 96503-340

        </p>

      </section>
      <section>
        <span>
          <b>ENTRE EM CONTATO</b>
        </span>
        <form className={styles.formContato}>
          <input placeholder="Nome" />
          <input placeholder="Email" />
          <input placeholder="Telefone (whatsapp)" />
          <textarea placeholder="Manda aqui a sua mensagem. Temos ótimos negócios para você." />
          <input type="submit" value="ENVIAR" />
        </form>

      </section>

    </div>
  );
}