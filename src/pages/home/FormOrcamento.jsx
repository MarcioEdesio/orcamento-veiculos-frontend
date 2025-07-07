import React, { useState } from 'react';
import Banner from './banner/Banner';
import './banner/home.css';

function FormOrcamento() {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    marca: '',
    modelo: '',
    ano: '',
  });

  const [fotosCount, setFotosCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFotosCount(e.target.files.length);
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    // Não chamar e.preventDefault() para permitir o envio normal do formulário
  };

  return (
    <div>
      <Banner />
      <div className="form-container">
        <h2>Solicite seu Orçamento</h2>
        <form
          action="https://formsubmit.co/marcioedesio@gmail.com"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
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
            <p style={{ fontSize: '0.9rem', color: '#333' }}>
              {fotosCount} foto(s) selecionada(s)
            </p>
          </div>

          {/* Campos ocultos para o FormSubmit */}
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://orcamento-veiculos-frontend-git-main-marcios-projects-d5abdcbb.vercel.app/obrigado"
          />

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Orçamento'}
          </button>

          {isSubmitting && (
            <p
              style={{ color: '#9c0707', marginTop: '10px', fontWeight: 'bold' }}
            >
              Aguarde o envio do orçamento...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormOrcamento;
