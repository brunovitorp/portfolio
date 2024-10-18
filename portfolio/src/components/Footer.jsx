
const Footer = () => {

    const anoAtual = new Date().getFullYear();

  return (
    <footer className="footer">
    <p>&copy; {anoAtual} Bruno Vitor Pires</p>
  </footer>
  )
}

export default Footer