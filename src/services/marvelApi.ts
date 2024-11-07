import axios from 'axios';
import md5 from 'md5';

// Função para criar a instância de API com as chaves e hash geradas no lado do servidor
const createApiInstance = () => {
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
  const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

  // Verifique se as chaves estão definidas, caso contrário, lance um erro com uma mensagem clara
  if (!PUBLIC_KEY) {
    throw new Error('A chave pública de API não foi encontrada. Verifique a variável NEXT_PUBLIC_MARVEL_PUBLIC_KEY.');
  }
  if (!PRIVATE_KEY) {
    throw new Error('A chave privada de API não foi encontrada. Verifique a variável MARVEL_PRIVATE_KEY.');
  }

  // Gere o hash para a autenticação da API
  const TS = Date.now().toString();
  const HASH = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`);

  return {
    api: axios.create({
      baseURL: 'https://gateway.marvel.com/v1/public/',
    }),
    PUBLIC_KEY,
    TS,
    HASH,
  };
};

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

export const getHeroes = async (limit: number, offset: number, searchTerm: string = ''): Promise<Hero[]> => {
  try {
    const { api, PUBLIC_KEY, TS, HASH } = createApiInstance();
    const response = await api.get('characters', {
      params: {
        apikey: PUBLIC_KEY,
        ts: TS,
        hash: HASH,
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
    return [];
  }
};

export const getHeroComics = async (heroId: string): Promise<Comic[]> => {
  try {
    const { api, PUBLIC_KEY, TS, HASH } = createApiInstance();
    const response = await api.get(`characters/${heroId}/comics`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: TS,
        hash: HASH,
        limit: 5,
      },
    });

    return response.data.data.results.map((comic: Comic) => ({
      ...comic,
      description: comic.description || 'Descrição não disponível.', // Mantém um fallback caso seja null
    }));
  } catch (error) {
    console.error('Error fetching comics for hero:', error);
    return [];
  }
};

export const getHeroDetails = async (id: string) => {
  try {
    const { api, PUBLIC_KEY, TS, HASH } = createApiInstance();
    const response = await api.get(`characters/${id}`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: TS,
        hash: HASH,
      },
    });

    return response.data.data.results[0]; // Assumindo que você quer o primeiro resultado
  } catch (error) {
    console.error('Error fetching hero details:', error);
    return null;
  }
};
