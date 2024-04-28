import { createContext } from 'react';
import { Album } from './types/album'; 

export const AlbumContext = createContext<{
  albums: Album[];
  setAlbums: (albums: Album[]) => void;
}>({ albums: [], setAlbums: () => {} });
