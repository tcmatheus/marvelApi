import React from 'react';
import HeroList from '../components/HeroList';
import { FavoriteProvider } from '../context/FavoriteContext';

const Home: React.FC = () => {
  return (
    <FavoriteProvider>
      <div>
        <h1>Marvel Heroes</h1>
        <HeroList />
      </div>
    </FavoriteProvider>
  );
};

export default Home;
