import React from 'react';
import './App.css';
import Home from './paginas/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NovaPagina from './paginas/NovaPagina';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/paginas/NovaPagina" element={<NovaPagina/>} />
      </Routes>
    </Router>
  );
}

export default App;
