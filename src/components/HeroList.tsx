import React, { useState, useEffect } from 'react';
import { Hero, Comic } from '../interface/types'; // Importe as interfaces necessárias
import { useFavorites } from '../context/FavoriteContext';
import { getHeroes, getHeroComics } from '../services/marvelApiClient';
import HeroCard from './HeroCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import HeroModal from './HeroModal';
import { FaHeart, FaSearch } from 'react-icons/fa';

const HeroList: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [activeHeroComics, setActiveHeroComics] = useState<Comic[]>([]); // Mantenha apenas uma declaração
  const { favorites, toggleFavorite } = useFavorites();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeHero, setActiveHero] = useState<Hero | null>(null);

  // Função para buscar heróis da API
  const fetchHeroes = async (page: number, searchTerm: string = '') => {
    try {
      const newHeroes = await getHeroes(20, page * 20, searchTerm);
      const heroesWithDescriptions = newHeroes.map((hero: Hero) => ({
        ...hero,
        description: hero.description || 'Descrição não disponível.',
      }));
      setHeroes((prevHeroes) => (page === 0 ? heroesWithDescriptions : [...prevHeroes, ...heroesWithDescriptions]));
      setHasMore(newHeroes.length >= 20);
    } catch (error) {
      console.error('Erro ao carregar heróis:', error);
    }
  };

  useEffect(() => {
    if (!showFavoritesOnly) {
      fetchHeroes(page, search);
    }
  }, [page, search, showFavoritesOnly]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setPage(0);
  };

  const toggleFavoritesView = () => {
    setShowFavoritesOnly((prev) => !prev);
    setPage(0);
  };

  const displayedHeroes = showFavoritesOnly ? favorites : heroes;

  // Função para abrir o modal do herói e buscar seus quadrinhos
  const openHeroModal = async (hero: Hero) => {
    setActiveHero(hero);
    const heroComics = await getHeroComics(hero.id);
    setActiveHeroComics(heroComics);
  };

  const closeHeroModal = () => {
    setActiveHero(null);
    setActiveHeroComics([]);
  };

  return (
    <div className="hero-list-container">
      <div className="search-bar">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Procure por heróis"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="favorites-toggle-container">
        <div className="favorites-toggle" onClick={toggleFavoritesView}>
          <FaHeart className={`favorites-icon ${showFavoritesOnly ? 'active' : ''}`} />
          <span className="favorites-text">Somente favoritos</span>
        </div>
      </div>

      <InfiniteScroll
        dataLength={displayedHeroes.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={!showFavoritesOnly && hasMore}
        loader={<h4>Carregando...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}>Fim dos heróis</p>}
      >
        <div className="hero-cards-grid">
          {displayedHeroes.map((hero) => (
            <HeroCard
            key={hero.id}
            hero={hero}
            onToggleFavorite={toggleFavorite}
            openHeroModal={() => openHeroModal(hero)}
            isActive={activeHero?.id === hero.id}
          />
          
          ))}
        </div>
      </InfiniteScroll>

      {activeHero && (
        <HeroModal
          heroName={activeHero.name}
          heroDescription={activeHero.description}
          heroImage={`${activeHero.thumbnail.path}.${activeHero.thumbnail.extension}`}
          heroComics={activeHeroComics}
          closeHeroModal={closeHeroModal}
        />
      )}
    </div>
  );
};

export default HeroList;
