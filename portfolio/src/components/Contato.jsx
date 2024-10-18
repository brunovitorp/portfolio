import { useEffect, useState } from "react";
import axios from "axios";

function Contato() {
  const [contatos, setContatos] = useState([]);
  const [novoContato, setNovoContato] = useState({
    nome: "",
    telefone: "",
    email: "",
    foto: "",
  });
  const [buscarContato, setBuscarContato] = useState("");

  const criarContato = () => {
    axios
      .post("http://localhost:3002/contatos", novoContato)
      .then((response) => {
        console.log("Contato criado:", response.data);
        setNovoContato({ nome: "", telefone: "", email: "", foto: "" });
      })
      .catch((error) => {
        console.error("Erro ao criar contato:", error);
      });
  };

   // Função para carregar os projetos
   const carregarContatos = () => {
    axios
      .get("http://localhost:3002/contatos")
      .then((response) => {
        setContatos(response.data); // Atualiza o estado com os projetos obtidos da requisição
      })
      .catch((error) => {
        console.error("Erro ao carregar projetos:", error);
      });
  };

      // Filtrar os projetos com base no termo de pesquisa
      const contatosFiltrados = contatos.filter(contato => 
        contato.nome.toLowerCase().includes(buscarContato.toLowerCase())
      );

        // Função para excluir um projeto
  const excluirContato = (id) => {
    axios
      .delete(`http://localhost:3002/contatos/${id}`)//requisição para deletar uma informação do json (pelo id)
      .then((response) => {
        console.log("Contato excluído:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao excluir contato:", error);
      });
  };

      useEffect(() => {//montagem dos componentes como efeito de reação
        carregarContatos();
      }, [contatos]);

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
        onChange={(e) =>
          setNovoContato({ ...novoContato, nome: e.target.value })
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
        onChange={e => setBuscarContato(e.target.value)}
      />


    </section>
    
    <div className="card-container">
    {Array.isArray(contatosFiltrados) &&
          contatosFiltrados.map((contato) => (
            <div className="card" key={contato.id}>
              <img className="imgProject" src={contato.foto} alt={contato.nome} />
              <h3>{contato.nome}</h3>
              <p>{contato.email}</p>
              <p>{contato.telefone}</p>
              <div className="card-actions">
                  <button
                    className="form-buttonDelete"
                    onClick={() => excluirContato(contato.id)}
                  >
                    Excluir
                  </button>
              </div>
            </div>
          ))}
      </div>
      </>
  );
}

export default Contato;
