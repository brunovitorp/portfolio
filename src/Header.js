import React, { useEffect } from "react";
import logo from "./port.png";
import { Link } from "react-router-dom";

function dark() {
  // Obtém uma referência ao elemento <body> do documento
  const darkmode = document.body;

  // Alterna a classe 'darkMode' no elemento <body>.
  // Se 'darkMode' estiver presente, ele será removido; se não estiver, será adicionado.
  darkmode.classList.toggle("darkMode");

  // Verifica se o elemento <body> contém a classe 'darkMode'
  if (darkmode.classList.contains("darkMode")) {
    // Se a classe 'darkMode' estiver presente, define o item 'theme' no localStorage como 'dark'
    localStorage.setItem("tema", "dark");
  } else {
    // Se a classe 'darkMode' não estiver presente, define o item 'theme' no localStorage como 'light'
    localStorage.setItem("tema", "light");
  }
}

function Header() {
  useEffect(() => {
    // Quando o componente é montado, verifique a preferência no localStorage
    const temaAtual = localStorage.getItem("tema");
    if (temaAtual === "dark") {
      document.body.classList.add("darkMode");
    } else {
      document.body.classList.remove("darkMode");
    }
  }, []); // A dependência vazia [] significa que este efeito será executado apenas uma vez, similar ao componentDidMount

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Meu Portfólio</h1>
      </div>
      <nav className="navbar">
        <Link to="/">Projetos</Link>
        <Link to="/paginas/TContatos">Contatos</Link>
        <button className="btndark" alt="" onClick={dark}>
          Dark
        </button>
      </nav>
    </header>
  );
}

export default Header;
