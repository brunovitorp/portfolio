import React from 'react';

// Definindo um componente funcional chamado Projects
function Projects() {
  // Criando um array de objetos chamado 'projects'
  const projects = [
    { title: 'Calculadora', description: 'Descrição do Projeto 1' },
    { title: 'Alcool ou Gasolina', description: 'Descrição do Projeto 2' },
    { title: 'IMC', description: 'Descrição do Projeto 3' },
  ];

  // O componente retorna JSX, representando a seção de projetos
  return (
    <section id="projects" className="projects">
      {/* Título da seção */}
      <h2>Projetos</h2>
      
      {/* Lista de projetos */}
      <ul className="project-list">
        {/* Mapeando os projetos e criando um elemento <li> para cada um */}
        {projects.map((project, index) => (
          <li key={index} className="project">
            {/* Título do projeto */}
            <h3>{project.title}</h3>
            {/* Descrição do projeto */}
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Exportando o componente Projects para que possa ser utilizado em outros arquivos
export default Projects;
