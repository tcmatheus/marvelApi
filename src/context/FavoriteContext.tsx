import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Hero {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface FavoriteContextType {
  favorites: Hero[];
  toggleFavorite: (hero: Hero) => void;
}

interface FavoriteProviderProps {
  children: ReactNode; // Defina o tipo de `children` corretamente
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Hero[]>(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  const toggleFavorite = (hero: Hero) => {
    const updatedFavorites = favorites.some(fav => fav.id === hero.id)
      ? favorites.filter(fav => fav.id !== hero.id)
      : [...favorites, hero];

    setFavorites(updatedFavorites);
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
