// src/components/HeroModal.tsx

import React from 'react';

interface HeroModalProps {
  heroId: number;
  heroComics: any[];
  closeHeroModal: () => void;
}

const HeroModal: React.FC<HeroModalProps> = ({ heroId, heroComics, closeHeroModal }) => {
  return (
    <div className="hero-modal-overlay" onClick={closeHeroModal}>
      <div className="hero-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeHeroModal}>×</button>
        <h2>Detalhes do Herói {heroId}</h2>

        <h3>Quadrinhos</h3>
        <div className="comics-list">
          {heroComics.length > 0 ? (
            heroComics.map((comic) => (
              <div key={comic.id} className="comic-card">
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="comic-thumbnail"
                />
                <h4>{comic.title}</h4>
                <p>Data de Lançamento: {comic.dates.find((date: any) => date.type === 'onsaleDate')?.date.slice(0, 10) || 'Desconhecida'}</p>
                <p>Páginas: {comic.pageCount || 'N/A'}</p>
                <p>{comic.description ? `${comic.description.slice(0, 200)}...` : 'Descrição não disponível.'}</p>
              </div>
            ))
          ) : (
            <p>Sem quadrinhos disponíveis para este herói.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroModal; // Certifique-se de que está exportando como default
