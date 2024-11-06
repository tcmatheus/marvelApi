import React from 'react';
import HeroList from '../components/HeroList';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">EXPLORE O UNIVERSO E CRIE SUA EQUIPE</h1>
      <p className="home-subtitle">
        Os melhores personagens já feitos em quadrinhos. Fique viciado em uma generosa porção de heróis e vilões!
      </p>
      <HeroList />
    </div>
  );
};

export default Home;

