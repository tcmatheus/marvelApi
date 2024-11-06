import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getHeroDetails, getHeroComics } from '../../services/marvelApi';

const HeroProfile: React.FC = () => {
  const [hero, setHero] = useState<any>(null);
  const [comics, setComics] = useState<any[]>([]);
  const { query } = useRouter();
  
  useEffect(() => {
    if (query.id) {
      const fetchHeroDetails = async () => {
        try {
          const heroData = await getHeroDetails(query.id as string);
          setHero(heroData);
          
          const comicsData = await getHeroComics(query.id as string);
          setComics(comicsData);
        } catch (error) {
          console.error('Erro ao buscar os detalhes do herói:', error);
        }
      };

      fetchHeroDetails();
    }
  }, [query.id]);

  if (!hero) return <div>Carregando...</div>;

  return (
    <div className="hero-profile">
      <h1>{hero.name}</h1>
      <div className="hero-details">
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.name}
          className="hero-thumbnail"
        />
        <p>{hero.description || 'Descrição não disponível'}</p>
      </div>
      <h2>Quadrinhos</h2>
      <div className="comics-list">
        {comics.slice(0, 5).map((comic) => (
          <div key={comic.id} className="comic-card">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              className="comic-thumbnail"
            />
            <h3>{comic.title}</h3>
            <p>{comic.description ? comic.description.substring(0, 200) : 'Sem descrição'}</p>
            <p>Lançamento: {comic.dates[0]?.date}</p>
            <p>Páginas: {comic.pageCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroProfile;
