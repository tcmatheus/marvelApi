import axios from 'axios';
import md5 from 'md5';

const PUBLIC_KEY = '1aee5681b6702b72fbe1c23b08e472a5';
const PRIVATE_KEY = '6aa879300dd0ce06a7422151cdca1283d91fc9b0';
const TS = Date.now().toString();
const HASH = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`);

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
});

export const getHeroes = async (limit: number, offset: number, searchTerm: string = '') => {
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

    // Log para inspecionar a resposta completa da API
    console.log('Dados completos da API:', response.data.data.results);

    // Mapeamento com verificação de descrição vazia
    return response.data.data.results.map((hero: any) => {
      // Verifica se a descrição está presente e não é apenas espaços em branco
      const cleanedDescription = hero.description && hero.description.trim() !== ''
        ? hero.description.trim()
        : 'Descrição não disponível.';

      console.log(`Herói: ${hero.name}, Descrição tratada: "${cleanedDescription}"`); // Log para verificação

      return {
        ...hero,
        description: cleanedDescription,
      };
    });
  } catch (error) {
    console.error('Error fetching Marvel heroes:', error.response?.data || error.message);
    return [];
  }
};

// Função para buscar os quadrinhos de um herói específico
export const getHeroComics = async (heroId: number) => {
  try {
    const response = await api.get(`characters/${heroId}/comics`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: TS,
        hash: HASH,
        limit: 5,  // Limite de 5 quadrinhos
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching comics for hero:', error.response?.data || error.message);
    return [];
  }
};
