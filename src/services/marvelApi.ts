import axios from 'axios';
import md5 from 'md5';

// Defina as suas chaves e o timestamp (ts)
const PUBLIC_KEY = '1aee5681b6702b72fbe1c23b08e472a5';
const PRIVATE_KEY = '6aa879300dd0ce06a7422151cdca1283d91fc9b0';
const TS = Date.now().toString();

// Crie o hash necessário para a autenticação
const HASH = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`);

// Crie a instância do axios
const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
});

export const getHeroes = async (limit: number, offset: number) => {
  try {
    // Verifique se o limit é válido, caso contrário, defina um valor padrão (por exemplo, 10)
    if (limit <= 0) {
      console.error('O valor de limit deve ser maior que 0. Usando limit padrão: 10.');
      limit = 10;  // Valor padrão
    }

    // Agora faça a requisição para a API
    const response = await api.get('characters', {
      params: {
        apikey: PUBLIC_KEY,
        ts: TS,
        hash: HASH,
        limit,  // O limit agora é garantido para ser maior que 0
        offset,
      },
    });

    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching Marvel heroes:', error.response?.data || error.message);
    return [];
  }
};
