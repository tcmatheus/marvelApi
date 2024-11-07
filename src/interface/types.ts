export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Hero {
  id: string;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}


export interface Comic {
  id: string;
  title: string;
  description: string | null; // Ajustado para aceitar string ou null
  pageCount: number;
  thumbnail: Thumbnail;
  dates: Array<{ type: string; date: string }>;
}
