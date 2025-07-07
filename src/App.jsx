import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormOrcamento from './pages/home/FormOrcamento'; // ou o caminho correto do seu componente
import Obrigado from './pages/obrigado/Obrigado'; // criaremos essa página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormOrcamento />} />
        <Route path="/obrigado" element={<Obrigado />} />
      </Routes>
    </Router>
  );
}

export default App;
