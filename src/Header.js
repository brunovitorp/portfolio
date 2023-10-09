import React from "react";

function Header() {
  return (
    <header className="header">
      <div class="img-container" >
        <h1>Meu Portfólio</h1>
      </div>
      <nav className="navbar">
        <a href="#projects">Projetos</a>
        <a href="#contact">Contato</a>
      </nav>
    </header>
  );
}

export default Header;
