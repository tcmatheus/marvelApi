import React from 'react';
import '../styles/HeroList.css'; 
import '../styles/HeroCard.css';
import '../styles/HeroModal.css';
import '../styles/Home.css';
import '../styles/Footer.css'; // Importe o CSS global do rodapé aqui
import Footer from '../components/Footer';

// Importação do FavoriteProvider (se você estiver usando)
import { FavoriteProvider } from '../context/FavoriteContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <FavoriteProvider>
      <Component {...pageProps} />
      <Footer /> {/* Adicione o rodapé aqui */}
    </FavoriteProvider>
  );
};

export default MyApp;
