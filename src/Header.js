import React from "react";
import logo from "./port.png";
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Meu Portfólio</h1>
      </div>
        <nav className="navbar">
          <a href="#projects">Projetos</a>
          <a href="#contact">Contato</a>
          <Link to="/paginas/NovaPagina">Nova Página</Link>
        </nav>
    </header>
  );
}

export default Header;
