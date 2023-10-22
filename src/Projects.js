import React, { useState, useEffect } from "react";
import axios from "axios";

function Projects() {
  // Estado para armazenar os projetos
  const [projetosFAP, setProjetos] = useState([]);

  // Estado para armazenar os dados do novo projeto
  const [novoProjetoFAP, setNovoProjeto] = useState({
    id: "",
    titulo: "",
    descricao: "",
  });

  // Função para criar ou atualizar um projeto
  const criarProjeto = () => {
    // Verifica se já existe um projeto com o mesmo nome
    const projetoExistente = projetosFAP.find(projeto => projeto.titulo === novoProjetoFAP.titulo);

    if (projetoExistente) {
      alert("Já existe um projeto com esse nome!");
      return;
    }

    if (novoProjetoFAP.id) {
      // Se 'id' estiver presente, é uma edição
      axios.put(`http://localhost:3001/projetos/${novoProjetoFAP.id}`, novoProjetoFAP)
        .then(response => {
          console.log('Projeto atualizado:', response.data);
          carregarProjetos();
          setNovoProjeto({ id: '', titulo: '', descricao: '' }); // Limpa os campos após a edição
        })
        .catch(error => {
          console.error('Erro ao atualizar projeto:', error);
        });
    } else {
      // Senão, é uma criação normal
      axios.post("http://localhost:3001/projetos", novoProjetoFAP)
        .then(response => {
          console.log('Projeto criado:', response.data);
          carregarProjetos();
        })
        .catch(error => {
          console.error('Erro ao criar projeto:', error);
        });
    }
  };

  // Função para excluir um projeto
  const excluirProjeto = (id) => {
    axios.delete(`http://localhost:3001/projetos/${id}`)
      .then(response => {
        console.log('Projeto excluído:', response.data);
        carregarProjetos();
      })
      .catch(error => {
        console.error('Erro ao excluir projeto:', error);
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
    setNovoProjeto({ id: projeto.id, titulo: projeto.titulo, descricao: projeto.descricao });
  };

  useEffect(() => {
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
    value={novoProjetoFAP.titulo}
    onChange={(e) => setNovoProjeto({ ...novoProjetoFAP, titulo: e.target.value })}
  />
  <input
    className="form-input"
    type="text"
    placeholder="Descrição do Projeto"
    value={novoProjetoFAP.descricao}
    onChange={(e) => setNovoProjeto({ ...novoProjetoFAP, descricao: e.target.value })}
  />
  <button className="form-buttonNew" onClick={criarProjeto}>
    Criar Projeto
  </button>
</div>

      <div>
        <h2 className="form-title">Meus Projetos</h2>
        <div className="card-container">
          {Array.isArray(projetosFAP) &&
            projetosFAP.map((projetoFAP) => (
              <div className="card" key={projetoFAP.id}>
                <h3>{projetoFAP.titulo}</h3>
                <p>{projetoFAP.descricao}</p>
                <div className="card-actions">
                  <button className="form-buttonEdit" onClick={() => editarProjeto(projetoFAP)}>Editar</button>
                  <button className="form-buttonDelete" onClick={() => excluirProjeto(projetoFAP.id)}>Excluir</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
