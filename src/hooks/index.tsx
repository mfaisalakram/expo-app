import { useFetchMore } from '@utils';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Context {
  loading: boolean;
  movie: ItemsProps[];
  pages: { page: string | number; total: string | number };
  setPages: React.Dispatch<React.SetStateAction<number>>;
  setFavorites: React.Dispatch<React.SetStateAction<Array<Number>>>;
  favorite: Array<Number>;
  page: number;

}

const ContextAPI = createContext<Context>({} as Context);

export function useMovie() {
  const ctx = useContext(ContextAPI);

  if (ctx === null || ctx === undefined) throw new Error('not using contex');

  return ctx;
}

const Provides: React.FC = ({ children }) => {
  const [page, setPages] = useState(1);
  const [favorite, setFavorites] = useState<Array<Number>>([]);
  const [movie, loading, pages] = useFetchMore(page);
  useEffect(() => {
    if (favorite.length > 0) {
      AsyncStorage.setItem('DEMO_APP::COUNT_VALUE', `${favorite}`);
    }
  }, [favorite]);
  // const value = useMemo(() => ({movie, loading, pages, page, setPages}), []);

  return <ContextAPI.Provider value={{ movie, loading, page, setPages, pages, favorite, setFavorites }}>{children}</ContextAPI.Provider>;
};

export default Provides;
