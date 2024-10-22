import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/projetos"; // Defina a URL base aqui

const Projetos = () => {
  // Estado para armazenar os projetos em um array, e uma função para atualizar o estado
  const [projetosFAP, setProjetos] = useState([]);
  // Estado para armazenar os dados do novo projeto com os campos id, titulo e descricao (vazias)
  const [novoProjetoFAP, setNovoProjeto] = useState({
    titulo: "",
    descricao: "",
    preco: "",
    foto: "",
  });
  const [buscarProjeto, setBuscarProjeto] = useState("");
  // Estado para armazenar a busca dos projetos em um array, e uma função para atualizar o estado

  // Função para criar ou atualizar um projeto
  const criarProjeto = async () => {
    try {
      // Se 'id' estiver presente, é uma edição
      if (novoProjetoFAP.id) {
        // Verifica se existe outro projeto com o mesmo título
        const projetoExistente = projetosFAP.find(
          (projeto) =>
            projeto.titulo === novoProjetoFAP.titulo &&
            projeto.id !== novoProjetoFAP.id
        );

        if (projetoExistente) {
          alert("Já existe um projeto com esse nome!");
          return;
        }

        const response = await axios.put(
          `${BASE_URL}/${novoProjetoFAP.id}`,
          novoProjetoFAP
        );
        const projetoAtualizado = response.data;
        setProjetos((prevProjetos) =>
          prevProjetos.map((projeto) =>
            projeto.id === projetoAtualizado.id ? projetoAtualizado : projeto
          )
        );
        setNovoProjeto({ titulo: "", descricao: "", preco: "", foto: "" }); // Limpa o formulário
      } else {
        // Senão, é uma criação normal
        const projetoExistente = projetosFAP.find(
          (projeto) => projeto.titulo === novoProjetoFAP.titulo
        );

        if (projetoExistente) {
          alert("Já existe um projeto com esse nome!");
          return;
        }

        const response = await axios.post(BASE_URL, novoProjetoFAP);
        const novoProjeto = response.data;
        setProjetos((prevProjetos) => [...prevProjetos, novoProjeto]); // Atualiza o estado com o novo projeto
        setNovoProjeto({ titulo: "", descricao: "", preco: "", foto: "" }); // Limpa o formulário
      }
    } catch (error) {
      console.error("Erro ao criar ou atualizar projeto:", error);
    }
  };

  // Função para preencher os campos de edição com os detalhes do projeto selecionado
  const editarProjeto = (projeto) => {
    setNovoProjeto({
      ...novoProjetoFAP, // Manter os valores atuais
      id: projeto.id,
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      preco: projeto.preco,
      foto: projeto.foto,
    });
  };

  // Função para carregar os projetos
  const carregarProjetos = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setProjetos(response.data); // Atualiza o estado com os projetos obtidos da requisição
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    }
  };

  // Função para excluir um projeto
  const excluirProjeto = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`); // requisição para deletar um projeto pelo id
      setProjetos((prevProjetos) =>
        prevProjetos.filter((projeto) => projeto.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
    }
  };

  // Filtrar os projetos com base no termo de pesquisa
  const projetosFiltrados = projetosFAP.filter((projeto) =>
    projeto.titulo.toLowerCase().includes(buscarProjeto.toLowerCase())
  );

  useEffect(() => {
    //montagem dos componentes como efeito de reação
    carregarProjetos(); // Chama a função para carregar os projetos na montagem do componente
  }, []);

  return (
    <div>
      <h1 className="form-title">Meus Projetos</h1>
      <div className="form-container">
        <h2 className="form-title">Criar Novo Projeto</h2>
        <input
          className="form-input"
          type="text"
          placeholder="Nome do Projeto"
          value={novoProjetoFAP.titulo} // definindo o campo de entrada para o valor de estado
          onChange={(e) =>
            setNovoProjeto({ ...novoProjetoFAP, titulo: e.target.value })
          } // atualiza o estado com o novo valor do campo de entrada
        />
        <input
          className="form-input"
          type="text"
          placeholder="Descrição do Projeto"
          value={novoProjetoFAP.descricao}
          onChange={(e) =>
            setNovoProjeto({ ...novoProjetoFAP, descricao: e.target.value })
          } // atualiza o estado com o novo valor do campo de entrada
        />
        <input
          className="form-input"
          type="text"
          placeholder="Preço do Projeto"
          value={novoProjetoFAP.preco}
          onChange={(e) =>
            setNovoProjeto({ ...novoProjetoFAP, preco: e.target.value })
          } // atualiza o estado com o novo valor do campo de entrada
        />

        <input
          className="form-input"
          type="text"
          placeholder="Link da imagem"
          value={novoProjetoFAP.foto}
          onChange={(e) =>
            setNovoProjeto({ ...novoProjetoFAP, foto: e.target.value })
          } // atualiza o estado com o novo valor do campo de entrada
        />

        <button className="form-buttonNew" onClick={criarProjeto}>
          Criar Projeto
        </button>
      </div>

      <div>
        <div className="search-container">
          <h2 className="form-title">Meus Projetos</h2>

          {/* campo de pesquisa para filtrar pelo nome do projeto */}
          <input
            className="search"
            type="text"
            placeholder="Pesquisar por título"
            value={buscarProjeto}
            onChange={(e) => setBuscarProjeto(e.target.value)}
          />
        </div>
        <div className="card-container">
          {Array.isArray(projetosFiltrados) &&
            projetosFiltrados.map((projetoFAP) => (
              <div className="card" key={projetoFAP.id}>
                <img
                  className="imgProject"
                  src={projetoFAP.foto}
                  alt={projetoFAP.titulo}
                />
                <h3>{projetoFAP.titulo}</h3>
                <p>{projetoFAP.descricao}</p>
                <p>{projetoFAP.preco}</p>
                <div className="card-actions">
                  <button
                    className="form-buttonEdit"
                    onClick={() => editarProjeto(projetoFAP)}
                  >
                    Editar
                  </button>
                  <button
                    className="form-buttonDelete"
                    onClick={() => excluirProjeto(projetoFAP.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projetos;
