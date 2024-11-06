// src/pages/_app.tsx

import React from 'react';
import '../styles/HeroList.css';  // Importe o CSS global aqui
import '../styles/HeroCard.css';  // Importe o CSS global aqui
import '../styles/HeroModal.css';  // Importe o CSS global aqui
import '../styles/Home.css';  // Importe o CSS global aqui




// Importação do FavoriteProvider (se você estiver usando)
import { FavoriteProvider } from '../context/FavoriteContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <FavoriteProvider>
      <Component {...pageProps} />
    </FavoriteProvider>
  );
};

export default MyApp;
