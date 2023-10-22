import React, { useState, useEffect } from "react"; // Importa o React, useState e useEffect do pacote 'react'
import axios from "axios"; // Importa a biblioteca Axios para fazer requisições HTTP

function Projects() {
  // Define um estado 'projects' e uma função 'setProjects' para atualizá-lo
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // --- Passo 1: Criar um Dweet com os Dados dos Projetos ---

    // Faz uma requisição POST para criar um novo dweet com os dados dos projetos
    axios
      .post("https://dweet.io/dweet/for/projetosFAP", {
        projetos: [
          { titulo: "Projeto 1", descricao: "Descrição do Projeto 1" },
          { titulo: "Projeto 2", descricao: "Descrição do Projeto 2" },
          // Adicione mais projetos conforme necessário
        ],
      })
      .then((response) => {
        // Quando o dweet é criado com sucesso
        console.log("Dweet criado com sucesso:", response.data);
      })
      .catch((error) => {
        // Em caso de erro ao criar o dweet
        console.error("Erro ao criar o dweet:", error);
      });

    // --- Passo 2: Consumir o Dweet no React com Axios ---

    // Faz uma requisição para obter o dweet mais recente do dispositivo 'myProjects'
    axios
      .get("https://dweet.io/get/latest/dweet/for/projetosFAP")
      .then((response) => {
        // Quando a resposta da API é recebida com sucesso

        // Extraia os dados da resposta
        const data = response.data;

        // Acesse o conteúdo do dweet que contém os projetos
        const projetos = data.with[0].content.projetos;

        // Atualize o estado 'projects' com os dados dos projetos
        setProjects(projetos);
      })
      .catch((error) => {
        // Em caso de erro na requisição
        console.error("Erro ao buscar projetos:", error);
      });
  }, []);

  return (
    <div>
      <h2>Projetos</h2>
      <ul>
        {projects && projects.map((project, index) => (
          <li key={index}>
            <h3>{project.titulo}</h3>
            <p>{project.descricao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects; // Exporta o componente 'Projects' para uso em outros arquivos
