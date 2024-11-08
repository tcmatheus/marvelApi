import React, { Key } from 'react';
import Image from 'next/image';

interface Thumbnail {
  path: string;
  extension: string;
}

interface DateInfo {
  type: string;
  date: string;
}

interface Comic {
  id: Key;
  thumbnail: Thumbnail;
  title: string;
  dates: DateInfo[];
  pageCount: string | number;
  description: string | null;
}

interface HeroModalProps {
  heroName: string;
  heroDescription: string;
  heroImage: string;
  heroComics: Comic[];
  closeHeroModal: () => void;
}

const HeroModal: React.FC<HeroModalProps> = ({ heroName, heroDescription, heroImage, heroComics, closeHeroModal }) => {
  return (
    <div className="hero-modal-overlay" onClick={closeHeroModal}>
      <div className="hero-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeHeroModal}>×</button>
        <div className="modal-header-text">
          <h2>DESCUBRA TODOS OS QUADRINHOS DESTE PERSONAGEM</h2>
        </div>
        <div className="hero-modal-background">
          <Image
            src="/images/papel-de-parede-quadrinhos-marvel-1-07.webp"
            alt="Background"
            className="background-image"
            width={800} // Ajuste conforme necessário
            height={400} // Ajuste conforme necessário
            layout="responsive"
          />
        </div>
        <div className="hero-details-card">
            <Image
              src={heroImage}
              alt={heroName}
              className="hero-thumbnail-modal"
              width={150}  // Largura ajustada para a proporção desejada
              height={150} // Altura igual à largura para manter a imagem circular
              layout="intrinsic"
            />
          <div className="hero-info-modal">
            <h2>{heroName}</h2>
            <p className="hero-description-modal">{heroDescription || 'Descrição não disponível.'}</p>
          </div>
        </div>
        <div className="comics-list">
          {heroComics.length > 0 ? (
            heroComics.map((comic) => (
              <div key={comic.id} className="comic-card">
                <Image
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className="comic-thumbnail"
                  width={100}  // Reduza o tamanho
                  height={150} // Ajuste a altura conforme necessário
                  layout="intrinsic" // Use 'intrinsic' para manter um tamanho mais controlado
                  />
                <div className="comic-info">
                  <h4>{comic.title}</h4>
                  <p>
                    Data de Lançamento:{' '}
                    {comic.dates.find((date) => date.type === 'onsaleDate')?.date.slice(0, 10) || 'Desconhecida'}
                  </p>
                  <p>Páginas: {comic.pageCount || 'N/A'}</p>
                  <p>{comic.description ? `${comic.description.slice(0, 200)}...` : 'Descrição não disponível.'}</p>
                </div>
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

export default HeroModal;
