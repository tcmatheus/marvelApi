import React, { useEffect, useState } from 'react';
import { Hero } from '../context/FavoriteContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importa os ícones de coração
import { useFavorites } from '../context/FavoriteContext'; // Certifique-se de ter uma função para acessar os favoritos

interface HeroCardProps {
  hero: Hero;
  onToggleFavorite: (hero: Hero) => void;
  openHeroModal: (heroId: number) => void;
  closeHeroModal: () => void;
  isActive: boolean;
  showComics?: boolean; // Flag para indicar se o modal está ativo
  comics?: any[]; // Quadrinhos passados para o modal
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, onToggleFavorite, openHeroModal, closeHeroModal, isActive, showComics, comics }) => {
  const { favorites } = useFavorites(); // Recupera a lista de favoritos do contexto
  const [isFavorited, setIsFavorited] = useState(false);

  // Verifica se o herói está nos favoritos quando o componente é montado
  useEffect(() => {
    const isHeroFavorited = favorites.some((fav) => fav.id === hero.id);
    setIsFavorited(isHeroFavorited);
  }, [favorites, hero.id]);

  // Atualiza o estado quando o botão de favorito é clicado
  const handleToggleFavorite = () => {
    setIsFavorited((prev) => !prev);
    onToggleFavorite(hero);
  };

  return (
    <div className="hero-card">
      <img
        src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
        alt={hero.name}
        className="hero-thumbnail"
        onClick={() => openHeroModal(hero.id)}
      />
      <div className="hero-header">
        <h3>{hero.name}</h3>
        <span
          className={`favorite-icon ${isFavorited ? 'filled' : ''}`}
          onClick={handleToggleFavorite}
        >
          {isFavorited ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
        </span>
      </div>
      <p>{hero.description}</p>

      {/* Modal para exibir detalhes do herói e quadrinhos */}
      {isActive && showComics && comics && (
        <div className="hero-modal-content">
          <span className="close-button" onClick={closeHeroModal}>&times;</span>
          <h2>{hero.name}</h2>
          <p>{hero.description}</p>

          <h3>Quadrinhos</h3>
          <div className="comics-list">
            {comics.map((comic) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCard;
