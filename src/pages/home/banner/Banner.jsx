import React from 'react';
import './style.css';
import bannerImg from '../../../assets/banner.png';

function Banner() {
  return (
    <div className="banner">
      <img src={bannerImg} alt="Banner" className="banner-image" />
      <div className="overlay"></div>
      <div className="banner-text">
        <h1>Orçamento de Reparos</h1>
      </div>
      <div className="banner-description">
        <h2>Seu orçamento sem sair de casa. Pesquisamos para você o melhor lugar no melhor preço com qualidade. </h2>
      </div>
    </div>
  );
}

export default Banner;
