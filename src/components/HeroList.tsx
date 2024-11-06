import React, { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoriteContext';
import { getHeroes } from '../services/marvelApi';
import HeroCard from './HeroCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const HeroList: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [heroes, setHeroes] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  // Função para buscar heróis com um valor válido de limit
  const fetchHeroes = async (page: number) => {
    try {
      const limit = 20; // Defina um valor fixo para o limit, garantindo que seja maior que 0
      const offset = page * limit; // Defina o offset de acordo com a página
      const newHeroes = await getHeroes(limit, offset); // Passando limit e offset
      setHeroes((prevHeroes) => [...prevHeroes, ...newHeroes]);
      if (newHeroes.length < limit) {
        setHasMore(false); // Se não houver mais heróis, desativa a rolagem infinita
      }
    } catch (error) {
      console.error('Erro ao carregar heróis:', error);
    }
  };

  // Carregar heróis ao mudar a página
  useEffect(() => {
    fetchHeroes(page);
  }, [page]);

  // Filtro de busca dos heróis
  useEffect(() => {
    if (search) {
      // Se houver busca, filtra os heróis com base no nome
      setHeroes((prevHeroes) => prevHeroes.filter(hero =>
        hero.name.toLowerCase().includes(search.toLowerCase())
      ));
    } else {
      // Se não houver busca, mostra todos os heróis
      fetchHeroes(page);
    }
  }, [search, page]); // Atualiza quando a busca ou a página mudar

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar herói"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <InfiniteScroll
        dataLength={heroes.length}
        next={() => setPage(page + 1)}  // Aumenta a página para carregar mais heróis
        hasMore={hasMore}  // Verifica se há mais heróis para carregar
        loader={<h4>Carregando...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}>Fim dos heróis</p>}
      >
        <div className="hero-list">
          {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default HeroList;
