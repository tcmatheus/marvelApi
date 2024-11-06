import React, { useEffect, useState } from 'react';
import { Hero } from '../context/FavoriteContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importa os ícones de coração
import { useFavorites } from '../context/FavoriteContext'; // Certifique-se de ter uma função para acessar os favoritos

interface HeroCardProps {
  hero: Hero;
  onToggleFavorite: (hero: Hero) => void;
  openHeroModal: (heroId: number) => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, onToggleFavorite, openHeroModal }) => {
  const { favorites } = useFavorites(); // Recupera a lista de favoritos do contexto
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const isHeroFavorited = favorites.some((fav) => fav.id === hero.id);
    setIsFavorited(isHeroFavorited);
  }, [favorites, hero.id]);

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
    </div>
  );
};

export default HeroCard;
