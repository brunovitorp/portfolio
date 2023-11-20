import React, { useState, useEffect } from "react";
import axios from "axios";


function Projects() {
  // Estado para armazenar os projetos em um array, e uma função para atualizar o estado
  const [projetosFAP, setProjetos] = useState([]);
  // Estado para armazenar os dados do novo projeto com os campos id, titulo e descricao (vazias)
  const [novoProjetoFAP, setNovoProjeto] = useState({
    id: "",
    titulo: "",
    descricao: "",
    preco:"",
    foto:"",
  });

  const [buscarProjeto, setBuscarProjeto] = useState("");
  // Estado para armazenar a busca dos projetos em um array, e uma função para atualizar o estado


  // Função para criar ou atualizar um projeto
  const criarProjeto = () => {
    // Verifica se já existe um projeto com o mesmo nome
    const projetoExistente = projetosFAP.find( //metodo array para busca
      (projeto) => projeto.titulo === novoProjetoFAP.titulo
    );

    if (projetoExistente) {
      alert("Já existe um projeto com esse nome!");
      return;
    }

    if (novoProjetoFAP.id) {
      // Se 'id' estiver presente, é uma edição
      axios
        .put(//requisição para atualizar informações
          `http://localhost:3001/projetos/${novoProjetoFAP.id}`,
          novoProjetoFAP
        )
        .then((response) => {//resposta se bem sucedida a requisição :)
          console.log("Projeto atualizado:", response.data);
          carregarProjetos();//atualizara lista de projetos após a atualização
          setNovoProjeto({ id: "", titulo: "", descricao: "",preco: "", foto: "" }); // Limpa os campos após salvar
        })
        .catch((error) => {
          console.error("Erro ao atualizar projeto:", error);
        });
    } else {
      // Senão, é uma criação normal
      axios
        .post("http://localhost:3001/projetos", novoProjetoFAP) //requisição para enviar os dados novos ao servidor
        .then((response) => {
          console.log("Projeto criado:", response.data);//obtem os dados que foram enviados no log
          carregarProjetos();
          setNovoProjeto({ id: "", titulo: "", descricao: "",preco: "", foto: "" }); // Limpa os campos após salvar
        })
        .catch((error) => {
          console.error("Erro ao criar projeto:", error);
        });
    }
  };

  // Função para excluir um projeto
  const excluirProjeto = (id) => {
    axios
      .delete(`http://localhost:3001/projetos/${id}`)//requisição para deletar uma informação do json (pelo id)
      .then((response) => {
        console.log("Projeto excluído:", response.data);
        carregarProjetos();
      })
      .catch((error) => {
        console.error("Erro ao excluir projeto:", error);
      });
  };

  // Função para carregar os projetos
  const carregarProjetos = () => {
    axios
      .get("http://localhost:3001/projetos")
      .then((response) => {
        setProjetos(response.data); // Atualiza o estado com os projetos obtidos da requisição
      })
      .catch((error) => {
        console.error("Erro ao carregar projetos:", error);
      });
  };

  // Função para preencher os campos de edição com os detalhes do projeto selecionado
  const editarProjeto = (projeto) => {
    setNovoProjeto({
      id: projeto.id,
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      preco: projeto.preco,
      foto: projeto.foto
    });
  };

    // Filtrar os projetos com base no termo de pesquisa
    const projetosFiltrados = projetosFAP.filter(projeto => 
      projeto.titulo.toLowerCase().includes(buscarProjeto.toLowerCase())
    );
  

  useEffect(() => {//montagem dos componentes como efeito de reação
    carregarProjetos();
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
          value={novoProjetoFAP.titulo}//definindo o campo de entrada para o valor de estado
          onChange={(e) =>
            setNovoProjeto({ ...novoProjetoFAP, titulo: e.target.value })
          }//atualiza o estado com o novo valor do campo de entrada
        />
        <input
          className="form-input"
          type="text"
          placeholder="Descrição do Projeto"
          value={novoProjetoFAP.descricao}
          onChange={(e) =>
            setNovoProjeto({ ...novoProjetoFAP, descricao: e.target.value })
          }//atualiza o estado com o novo valor do campo de entrada
        />
        <input
          className="form-input"
          type="text"
          placeholder="Preço do Projeto"
          value={novoProjetoFAP.preco}
          onChange={(e) =>
            setNovoProjeto({ ...novoProjetoFAP, preco: e.target.value })
          }//atualiza o estado com o novo valor do campo de entrada
        />

        <input
          className="form-input"
          type="text"
          placeholder="Link da imagem"
          value={novoProjetoFAP.foto}
          onChange={(e) =>
            setNovoProjeto({ ...novoProjetoFAP, foto: e.target.value })
          }//atualiza o estado com o novo valor do campo de entrada
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
        onChange={e => setBuscarProjeto(e.target.value)}
      />
      </div>
        <div className="card-container">
          {Array.isArray(projetosFiltrados) &&
            projetosFiltrados.map((projetoFAP) => (
              <div className="card" key={projetoFAP.id}>
                <img className="imgProject" src={projetoFAP.foto} alt={projetoFAP.titulo} />
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
}

export default Projects;
