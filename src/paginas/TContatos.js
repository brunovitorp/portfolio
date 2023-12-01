import React, { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";
import Footer from "../Footer";

function TContatos() {
  // Estado para armazenar os contatos em um array, e uma função para atualizar o estado
  const [contatosFAP, setContatos] = useState([]);
  // Estado para armazenar os dados do novo contato com os campos id, titulo e descricao (vazias)
  const [novoContatoFAP, setNovoContato] = useState({
    id: "",
    nome: "",
    telefone: "",
    email: "",
    foto: "",
  });

  const [buscarContato, setBuscarContato] = useState("");
  // Estado para armazenar a busca dos contatos em um array, e uma função para atualizar o estado

  // Função para criar ou atualizar um contato
  const criarContato = () => {
    // Verifica se já existe um contato com o mesmo nome
    const contatoExistente = contatosFAP.find(
      //metodo array para busca
      (contato) => contato.nome === novoContatoFAP.nome
    );

    if (contatoExistente) {
      alert("Já existe um contato com esse nome!");
      return;
    }

    if (novoContatoFAP.id) {
      // Se 'id' estiver presente, é uma edição
      axios
        .put(
          //requisição para atualizar informações
          `http://localhost:3001/contatos/${novoContatoFAP.id}`,
          novoContatoFAP
        )
        .then((response) => {
          //resposta se bem sucedida a requisição :)
          console.log("Contato atualizado:", response.data);
          carregarContatos(); //atualizara lista de contatos após a atualização
          setNovoContato({
            id: "",
            nome: "",
            telefone: "",
            email: "",
            foto: "",
          }); // Limpa os campos após salvar
        })
        .catch((error) => {
          console.error("Erro ao atualizar contato:", error);
        });
    } else {
      // Senão, é uma criação normal
      axios
        .post("http://localhost:3001/contatos", novoContatoFAP) //requisição para enviar os dados novos ao servidor
        .then((response) => {
          console.log("Contato criado:", response.data); //obtem os dados que foram enviados no log
          carregarContatos();
          setNovoContato({
            id: "",
            nome: "",
            telefone: "",
            email: "",
            foto: "",
          }); // Limpa os campos após salvar
        })
        .catch((error) => {
          console.error("Erro ao criar contato:", error);
        });
    }
  };

  // Função para excluir um contato
  const excluirContato = (id) => {
    axios
      .delete(`http://localhost:3001/contatos/${id}`) //requisição para deletar uma informação do json (pelo id)
      .then((response) => {
        console.log("Contato excluído:", response.data);
        carregarContatos();
      })
      .catch((error) => {
        console.error("Erro ao excluir contato:", error);
      });
  };

  // Função para carregar os contatos
  const carregarContatos = () => {
    axios
      .get("http://localhost:3001/contatos")
      .then((response) => {
        setContatos(response.data); // Atualiza o estado com os contatos obtidos da requisição
      })
      .catch((error) => {
        console.error("Erro ao carregar contatos:", error);
      });
  };

  // Função para preencher os campos de edição com os detalhes do contato selecionado
  const editarContato = (contato) => {
    setNovoContato({
      id: contato.id,
      nome: contato.nome,
      telefone: contato.telefone,
      email: contato.email,
      foto: contato.foto,
    });
  };

  // Filtrar os contatos com base no termo de pesquisa
  const contatosFiltrados = contatosFAP.filter((contato) =>
    contato.nome.toLowerCase().includes(buscarContato.toLowerCase())
  );

  useEffect(() => {
    //montagem dos componentes como efeito de reação
    carregarContatos();
  }, []);

  return (
    <>
      <Header />
      <div>
        <div className="search-container">
          <h2 className="form-title">Meus Contatos</h2>
          <input
            className="search"
            type="text"
            placeholder="Pesquisar por título"
            value={buscarContato}
            onChange={(e) => setBuscarContato(e.target.value)}
          />
          {/* campo de pesquisa para filtrar pelo nome do contato */}
        </div>
        <div className="card-container">
          {Array.isArray(contatosFiltrados) &&
            contatosFiltrados.map((contatoFAP) => (
              <div className="card" key={contatoFAP.id}>
                <div className="callContainer">
                  <img className="imgProject" src={contatoFAP.foto} alt="" />
                  <div>
                    <h3>{contatoFAP.nome}</h3>
                    <p>{contatoFAP.telefone}</p>
                  </div>
                </div>
                <p>{contatoFAP.email}</p>
                <div className="card-actions">
                  <button
                    className="form-buttonEdit"
                    onClick={() => editarContato(contatoFAP)}
                  >
                    Editar
                  </button>
                  <button
                    className="form-buttonDelete"
                    onClick={() => excluirContato(contatoFAP.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="contact">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nome"
          required
          value={novoContatoFAP.nome}
          onChange={(e) =>
            setNovoContato({ ...novoContatoFAP, nome: e.target.value })
          }
        />

        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Telefone"
          required
          value={novoContatoFAP.telefone}
          onChange={(e) =>
            setNovoContato({ ...novoContatoFAP, telefone: e.target.value })
          }
        />

        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          required
          value={novoContatoFAP.email}
          onChange={(e) =>
            setNovoContato({ ...novoContatoFAP, email: e.target.value })
          }
        />

        <input
          id="avatar"
          name="avatar"
          placeholder="Link da foto"
          required
          value={novoContatoFAP.foto}
          onChange={(e) =>
            setNovoContato({ ...novoContatoFAP, foto: e.target.value })
          }
        />
        <button className="form-buttonNew" onClick={criarContato}>
          Cadastrar
        </button>
      </div>
      
      <table className="contatos-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(contatosFiltrados) &&
            contatosFiltrados.map((contatoFAP) => (
              <tr key={contatoFAP.id}>
                <td>
                  <img className="imgProject" src={contatoFAP.foto} alt="" />
                </td>
                <td>{contatoFAP.nome}</td>
                <td>{contatoFAP.telefone}</td>
                <td>{contatoFAP.email}</td>
                <td>
                  <button
                    className="form-buttonEdit"
                    onClick={() => editarContato(contatoFAP)}
                  >
                    Editar
                  </button>
                  <button
                    className="form-buttonDelete"
                    onClick={() => excluirContato(contatoFAP.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Footer />
    </>
  );
}

export default TContatos;
