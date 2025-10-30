import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import movieApi from '../api/movieAPI';
import { initialMovieState, movieReducer } from '../reducers/movieReducers';

export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const res = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: res.data });
    } catch (e) {
      console.error(e);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, []);

  const fetchGenres = useCallback(async () => {
    try {
      const res = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: res.data });
    } catch (e) {
      console.error(e);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, []);

  const handleCreateOrUpdate = useCallback(async (data, isEditing, id) => {
    dispatch({ type: 'START_LOADING' });
    try {
      if (isEditing) {
        await movieApi.put(`/movies/${id}`, data);
      } else {
        await movieApi.post('/movies', data);
      }
      dispatch({ type: 'RESET_FORM' });
      fetchMovies();
      return true;
    } catch (e) {
      console.error(e);
      fetchMovies();
      return false;
    }
  }, [fetchMovies]);

  const confirmDelete = useCallback(async (id) => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
    dispatch({ type: 'START_LOADING' });
    try {
      await movieApi.delete(`/movies/${id}`);
      fetchMovies();
    } catch (e) {
      console.error(e);
      fetchMovies();
    }
  }, [fetchMovies]);

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    handleCreateOrUpdate,
    confirmDelete
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
