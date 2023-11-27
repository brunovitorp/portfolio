import React from 'react';
import './App.css';
import Home from './paginas/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TContatos from './paginas/TContatos';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/paginas/TContatos" element={<TContatos/>} />
      </Routes>
    </Router>
  );
}

export default App;
