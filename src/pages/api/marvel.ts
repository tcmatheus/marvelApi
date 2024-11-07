import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import md5 from 'md5';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { endpoint, ...queryParams } = req.query;

  const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
  const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

  if (!PUBLIC_KEY || !PRIVATE_KEY) {
    return res.status(500).json({ error: 'As chaves de API não foram encontradas. Verifique as variáveis de ambiente.' });
  }

  if (typeof endpoint !== 'string') {
    return res.status(400).json({ error: 'Endpoint inválido.' });
  }

  const TS = Date.now().toString();
  const HASH = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`);

  try {
    const response = await axios.get(`https://gateway.marvel.com/v1/public/${endpoint}`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: TS,
        hash: HASH,
        ...queryParams,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados da API Marvel:', error);
    res.status(500).json({ error: 'Erro ao buscar dados da Marvel' });
  }
}
