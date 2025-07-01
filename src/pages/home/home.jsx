import React, { useState } from 'react';
import Banner from './banner/Banner';
import './banner/home.css';

function Home() {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    marca: '',
    modelo: '',
    ano: '',
    fotos: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      fotos: filesArray
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('whatsapp', formData.whatsapp);
    formDataToSend.append('marca', formData.marca);
    formDataToSend.append('modelo', formData.modelo);
    formDataToSend.append('ano', formData.ano);

    formData.fotos.forEach((foto) => {
      formDataToSend.append('fotos[]', foto);
    });

    try {
      const response = await fetch('http://localhost:8000/orcamento', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Resposta inválida:', text);
        throw new Error('Erro ao enviar');
      }

      const result = await response.json();
      alert('Orçamento enviado com sucesso!');
      setFormData({
        nome: '',
        whatsapp: '',
        marca: '',
        modelo: '',
        ano: '',
        fotos: []
      });
      document.getElementById('fotos').value = null; // limpa o input file
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar o orçamento.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Banner />
      <div className="form-container">
        <h2>Solicite seu Orçamento</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome do proprietário"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp para contato"
            value={formData.whatsapp}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca do veículo"
            value={formData.marca}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="ano"
            placeholder="Ano"
            value={formData.ano}
            onChange={handleChange}
            required
          />
          <div className="upload-wrapper">
            <label htmlFor="fotos" className="upload-label">
              📷 Enviar fotos do veículo
            </label>
            <input
              type="file"
              id="fotos"
              name="fotos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar Orçamento'}
          </button>
          {isLoading && <p style={{ color: '#9c0707', marginTop: '10px', fontWeight: 'bold' }}>Aguarde o envio do orçamento...</p>}
        </form>
      </div>
    </div>
  );
}

export default Home;
