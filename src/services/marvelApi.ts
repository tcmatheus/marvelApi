import axios from 'axios';
import md5 from 'md5';

// Leia as variáveis de ambiente
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

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
});

interface Hero {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export const getHeroes = async (limit: number, offset: number, searchTerm: string = ''): Promise<Hero[]> => {
  try {
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
    console.error('Error fetching Marvel heroes:', error.response?.data || error.message);
    return [];
  }
};

export const getHeroComics = async (heroId: string): Promise<any[]> => {
  try {
    const response = await api.get(`characters/${heroId}/comics`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: TS,
        hash: HASH,
        limit: 5,
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching comics for hero:', error.response?.data || error.message);
    return [];
  }
};
