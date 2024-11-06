import React from 'react';
import { Hero } from '../context/FavoriteContext';

interface HeroCardProps {
  hero: Hero;
  onToggleFavorite: (hero: Hero) => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, onToggleFavorite }) => {
  return (
    <div className="hero-card">
      <img
        src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
        alt={hero.name}
        className="hero-thumbnail"
      />
      <h3>{hero.name}</h3>
      <p>{hero.description}</p>
      <button onClick={() => onToggleFavorite(hero)}>Favoritar</button>
    </div>
  );
};

export default HeroCard;
