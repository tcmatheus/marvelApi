import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'; // Import para substituir <img>
import { getHeroDetails, getHeroComics } from '../../services/marvelApiClient';

const HeroProfile: React.FC = () => {
  const [hero, setHero] = useState<{
    id: string;
    name: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  } | null>(null);

  const [comics, setComics] = useState<{
    id: string;
    title: string;
    description: string | null;
    pageCount: number;
    thumbnail: {
      path: string;
      extension: string;
    };
    dates: Array<{ type: string; date: string }>;
  }[]>([]);

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
        <Image
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.name}
          width={300} // Ajuste conforme necessário
          height={400} // Ajuste conforme necessário
          className="hero-thumbnail"
          layout="responsive"
        />
        <p>{hero.description || 'Descrição não disponível'}</p>
      </div>
      <h2>Quadrinhos</h2>
      <div className="comics-list">
        {comics.slice(0, 5).map((comic) => (
          <div key={comic.id} className="comic-card">
            <Image
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              width={150} // Ajuste conforme necessário
              height={200} // Ajuste conforme necessário
              className="comic-thumbnail"
              layout="responsive"
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
