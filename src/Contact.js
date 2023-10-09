import React from 'react';

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Entre em Contato</h2>
      <form>
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">Mensagem:</label>
          <textarea id="message" name="message" required />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contact;
