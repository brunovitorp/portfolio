import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/contatos"; // Defina a URL base aqui

function Contato() {
  const [contatos, setContatos] = useState([]);
  const [novoContato, setNovoContato] = useState({
    nome: "",
    telefone: "",
    email: "",
    foto: "",
  });
  const [buscarContato, setBuscarContato] = useState("");

  const criarContato = async () => {
    try {
      const response = await axios.post(`${BASE_URL}`, novoContato);
      console.log("Contato criado:", response.data);
      setNovoContato({ nome: "", telefone: "", email: "", foto: "" });
      carregarContatos(); // Chame a função para atualizar a lista de contatos após a criação
    } catch (error) {
      console.error("Erro ao criar contato:", error);
    }
  };

  // Função para carregar os contatos
  const carregarContatos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      setContatos(response.data); // Atualiza o estado com os contatos obtidos da requisição
    } catch (error) {
      console.error("Erro ao carregar contatos:", error);
    }
  };

  // Filtrar os contatos com base no termo de pesquisa
  const contatosFiltrados = contatos.filter((contato) =>
    contato.nome.toLowerCase().includes(buscarContato.toLowerCase())
  );

  // Função para excluir um contato
  const excluirContato = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`); // requisição para deletar um contato pelo id
      console.log("Contato excluído:", response.data);
      carregarContatos(); //atualizar a lista de contatos após a exclusão
    } catch (error) {
      console.error("Erro ao excluir contato:", error);
    }
  };

  useEffect(() => {
    carregarContatos();
  }, []);

  return (
    <>
      <section id="contact" className="contact">
        <h2 className="titulo">Newsletter - Cadastre-se aqui!</h2>

        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nome"
          required
          value={novoContato.nome}
          /* O valor do input é controlado pelo estado 'novoContato.nome'. 
          Isso significa que o campo vai mostrar o valor atual do nome armazenado no estado 'novoContato'. */

          onChange={
            (e) => setNovoContato({ ...novoContato, nome: e.target.value })
          /* Quando o valor do campo de texto mudar (usuário digitar), a função onChange será chamada.
          Ela usa o evento 'e' para capturar o novo valor inserido ('e.target.value') e atualiza o estado 'novoContato',
          mantendo os outros campos de 'novoContato' intactos (...novoContato) e modificando apenas o campo 'nome'.  */
          }
        />

        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Telefone"
          required
          value={novoContato.telefone}
          onChange={(e) =>
            setNovoContato({ ...novoContato, telefone: e.target.value })
          }
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          required
          value={novoContato.email}
          onChange={(e) =>
            setNovoContato({ ...novoContato, email: e.target.value })
          }
        />

        <input
          id="avatar"
          name="avatar"
          placeholder="Link da foto"
          required
          value={novoContato.foto}
          onChange={(e) =>
            setNovoContato({ ...novoContato, foto: e.target.value })
          }
        />
        <button className="form-buttonNew" onClick={criarContato}>
          Cadastrar
        </button>
        <input
          className="search"
          type="text"
          placeholder="Pesquisar por nome"
          value={buscarContato}
          onChange={(e) => setBuscarContato(e.target.value)}
        />
      </section>

      <div className="card-container">
        {
          Array.isArray(contatosFiltrados) &&
            /* Verifica se 'contatosFiltrados' é realmente um array antes de executar o map. 
          Isso evita erros caso 'contatosFiltrados' não seja um array. */

            contatosFiltrados.map((contato) => (
              /* Percorre o array 'contatosFiltrados' e, para cada 'contato', renderiza um novo bloco JSX. */

              <div className="card" key={contato.id}>
                {/* Cria um cartão individual para cada contato com a classe CSS 'card'.
              A prop 'key' é necessária no React para dar uma identificação única a cada cartão,
              utilizando o 'id' do contato. Isso melhora a performance na atualização da lista. */}

                <img
                  className="imgProject"
                  src={contato.foto}
                  alt={contato.nome}
                />
                {/* Renderiza a imagem do contato, onde 'src' pega o link da foto e 'alt' define o texto alternativo para a imagem,
                usando o nome do contato, útil para acessibilidade. */}

                <h3>{contato.nome}</h3>
                {/* Renderiza o nome do contato dentro de um título de nível 3 (<h3>). */}

                <p>{contato.email}</p>
                {/* Renderiza o e-mail do contato dentro de um parágrafo (<p>). */}

                <p>{contato.telefone}</p>
                {/* Renderiza o telefone do contato dentro de outro parágrafo (<p>). */}

                <div className="card-actions">
                  <button
                    className="form-buttonDelete"
                    onClick={() => excluirContato(contato.id)}
                    /* Adiciona um botão de exclusão com a classe 'form-buttonDelete'. Quando clicado,
               chama a função 'excluirContato', passando o 'id' do contato como argumento para excluí-lo. */
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          /* Fecha o bloco da função .map(), completando o loop que renderiza cada contato como um cartão. */
        }
      </div>
    </>
  );
}

export default Contato;
