import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Ativa o modo estrito do React
  images: {
    domains: ['gateway.marvel.com', 'i.annihil.us'], // Adicione os domínios das imagens externas que você utiliza
  },
  env: {
    NEXT_PUBLIC_MARVEL_PUBLIC_KEY: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
    MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
  },
};

export default nextConfig;
