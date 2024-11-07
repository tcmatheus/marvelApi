import axios from 'axios';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Hero {
  id: string;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

interface Comic {
  id: string;
  title: string;
  description: string | null;
  pageCount: number;
  thumbnail: Thumbnail;
  dates: Array<{ type: string; date: string }>;
}

const apiClient = axios.create({
  baseURL: '/api/marvel', // Rota local para a API do Next.js
});

export const getHeroes = async (limit: number, offset: number, searchTerm: string = ''): Promise<Hero[]> => {
  try {
    const response = await apiClient.get('/', {
      params: {
        endpoint: 'characters', // Passe o endpoint como parâmetro
        limit,
        offset,
        nameStartsWith: searchTerm || undefined,
      },
    });

    return response.data.data.results.map((hero: Hero) => ({
      ...hero,
      description: hero.description.trim() || 'Descrição não disponível.',
    }));
  } catch (error) {
    console.error('Error fetching Marvel heroes:', error);
    throw error; // Re-throw para identificar a origem do erro
  }
};

export const getHeroComics = async (heroId: string): Promise<Comic[]> => {
  try {
    const response = await apiClient.get('/', {
      params: {
        endpoint: `characters/${heroId}/comics`, // Passe o endpoint completo como parâmetro
        limit: 5,
      },
    });

    return response.data.data.results.map((comic: Comic) => ({
      ...comic,
      description: comic.description || 'Descrição não disponível.',
    }));
  } catch (error) {
    console.error('Error fetching comics for hero:', error);
    throw error; // Re-throw para identificar a origem do erro
  }
};

export const getHeroDetails = async (id: string) => {
  try {
    const response = await apiClient.get('/', {
      params: {
        endpoint: `characters/${id}`, // Passe o endpoint completo como parâmetro
      },
    });

    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching hero details:', error);
    throw error; // Re-throw para identificar a origem do erro
  }
};
