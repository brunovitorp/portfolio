import React from 'react';

function Projects() {
  const projects = [
    { title: 'Calculadora', description: 'Descrição do Projeto 1' },
    { title: 'Alcool ou Gasolina', description: 'Descrição do Projeto 2' },
    { title: 'IMC', description: 'Descrição do Projeto 3' },
  ];

  return (
    <section id="projects" className="projects">
      <h2>Projetos</h2>
      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={index} className="project">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;
