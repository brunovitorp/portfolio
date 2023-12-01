import React, { useState } from "react";
import axios from "axios";

function Contact() {
  // const [contatos, setContatos] = useState([]);
  const [novoContato, setNovoContato] = useState({
    id: "",
    nome: "",
    telefone: "",
    email: "",
    foto: "",
  });

  const criarContato = () => {
    axios
      .post("http://localhost:3001/contatos", novoContato)
      .then((response) => {
        // carregarContatos();
        setNovoContato({ id: "", nome: "", telefone: "", email: "", foto: "" });
      })
      .catch((error) => {
        console.error("Erro ao criar contato:", error);
      });
  };

  // const editarContato = (contato) => {
  //   setNovoContato({
  //     id: contato.id,
  //     nome: contato.nome,
  //     contato: contato.telefone,
  //     email: contato.email,
  //     foto: contato.foto,
  //   });

  //   if (novoContato.id) {
  //     axios
  //       .put(`http://localhoost:3001/${novoContato.id}`, novoContato)
  //       .then((response) => {
  //         // carregarContatos();
  //         setNovoContato({
  //           id: "",
  //           nome: "",
  //           telefone: "",
  //           email: "",
  //           foto: "",
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Erro ao editar o contato", error);
  //       });
  //   } else {
  //     alert("Não é uma edição!!!");
  //   }
  // };

  // const carregarContatos = () => {
  //   axios
  //     .get("http://localhost:3001/contatos")
  //     .then((response) => {
  //       setNovoContato(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao obter os contatos", error);
  //     });
  // };

  // const excluirContato = (id) => {
  //   axios
  //     .delete(`http://localhost:3001/contatos/${id}`)
  //     .then((response) => {
  //       // carregarContatos();
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao deletar o projeto", error);
  //     });
  // };

  // useEffect(() => {
  //   carregarContatos();
  // }, []);

  return (
    <section id="contact" className="contact">
      <h2 className="titulo">Newsletter - Cadastre-se aqui!</h2>

      <input
        type="text"
        id="name"
        name="name"
        placeholder="Nome"
        required
        value={novoContato.nome}
        onChange={(e) =>
          setNovoContato({ ...novoContato, nome: e.target.value })
        }
      />

      <input
        type="text"
        id="phone"
        name="phone"
        placeholder="Telefone"
        required
        value={novoContato.telefone}
        onChange={(e) =>
          setNovoContato({ ...novoContato, telefone: e.target.value })
        }
      />

      <input
        type="email"
        id="email"
        name="email"
        placeholder="E-mail"
        required
        value={novoContato.email}
        onChange={(e) =>
          setNovoContato({ ...novoContato, email: e.target.value })
        }
      />

      <input
        id="avatar"
        name="avatar"
        placeholder="Link da foto"
        required
        value={novoContato.foto}
        onChange={(e) =>
          setNovoContato({ ...novoContato, foto: e.target.value })
        }
      />
      <button className="form-buttonNew" onClick={criarContato}>
        Cadastrar
      </button>
    </section>
  );
}

export default Contact;
