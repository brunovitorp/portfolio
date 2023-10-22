import React from 'react';

// Definindo um componente funcional chamado Projects
function Projects() {
  // Criando um array de objetos chamado 'projects'
  const projetos = [
    { titulo: 'Calculadora', descricao: 'Descrição do Projeto 1' },
    { titulo: 'Alcool ou Gasolina', descricao: 'Descrição do Projeto 2' },
    { titulo: 'IMC', descricao: 'Descrição do Projeto 3' },
  ];

  // O componente retorna JSX, representando a seção de projetos
  return (
    <section id="projects" className="projects">
      {/* Título da seção */}
      <h2>Projetos</h2>
      
      {/* Lista de projetos */}
      <ul className="project-list">
        {/* Mapeando os projetos e criando um elemento <li> para cada um */}
        {projetos.map((project, index) => (
          <li key={index} className="project">
            {/* Título do projeto */}
            <h3>{project.titulo}</h3>
            {/* Descrição do projeto */}
            <p>{project.descricao}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Exportando o componente Projects para que possa ser utilizado em outros arquivos
export default Projects;
