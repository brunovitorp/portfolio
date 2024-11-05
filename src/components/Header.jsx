import {useEffect } from "react";
import logo from '../assets/port.png'
// import { Link } from "react-router-dom";

function dark() {
  const darkmode = document.body;
  darkmode.classList.toggle("darkMode");

  if (darkmode.classList.contains("darkMode")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
}

function Header() {
  useEffect(() => {
    const temaAtual = localStorage.getItem("tema");
    if (temaAtual === "dark") {
      document.body.classList.add("darkMode");
    } else {
      document.body.classList.remove("darkMode");
    }
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Meu Portfólio</h1>
      </div>
      <nav className="navbar">
        {/* <Link to="/">Projetos</Link>
        <Link to="/contato">Contatos</Link> */}
        <button className="btndark" alt="" onClick={dark}>
          Dark
        </button>
      </nav>
    </header>
  );
}

export default Header;
