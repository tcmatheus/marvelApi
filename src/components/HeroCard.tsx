import React, { useEffect, useState } from 'react';
import { Hero } from '../context/FavoriteContext';
import Image from 'next/image';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Importa os ícones de coração
import { useFavorites } from '../context/FavoriteContext'; // Certifique-se de ter uma função para acessar os favoritos

interface HeroCardProps {
  hero: Hero;
  onToggleFavorite: (hero: Hero) => void;
  openHeroModal: (heroId: number) => void;
  isActive: boolean;
  closeHeroModal?: () => void; // Adicione esta linha se `closeHeroModal` for realmente necessária
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
      <Image
        src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
        alt={hero.name}
        width={300} // Ajuste conforme necessário
        height={400} // Ajuste conforme necessário
        className="hero-thumbnail"
        onClick={() => openHeroModal(Number(hero.id))}
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
