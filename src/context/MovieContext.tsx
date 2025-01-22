import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MovieDetails, SearchFilters, MovieContextType } from '../types/movie';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    year: '',
    genre: '',
  });

  const fetchMovies = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const params: any = {
        apikey: API_KEY,
        s: searchTerm,
        page: currentPage,
      };

      if (filters.year) {
        params.y = filters.year;
      }
      
      const response = await axios.get(`${API_URL}`, { params });

      if (response.data.Response === 'True') {
        if (filters.genre && filters.genre.trim() !== '') {
          const detailedMoviesPromises = response.data.Search.map(async (movie: Movie) => {
            const detailResponse = await axios.get(`${API_URL}`, {
              params: {
                apikey: API_KEY,
                i: movie.imdbID,
              },
            });
            return detailResponse.data;
          });

          const detailedMovies = await Promise.all(detailedMoviesPromises);
          const filteredMovies = detailedMovies.filter(movie => 
            movie.Genre.toLowerCase().includes(filters.genre.toLowerCase())
          );
          
          setMovies(filteredMovies);
          setTotalResults(filteredMovies.length);
        } else {
          setMovies(response.data.Search);
          setTotalResults(parseInt(response.data.totalResults));
        }
      } else {
        setError(response.data.Error);
        setMovies([]);
        setTotalResults(0);
      }
    } catch (err) {
      setError('Failed to fetch movies');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}`, {
        params: {
          apikey: API_KEY,
          i: id,
          plot: 'full',
        },
      });

      if (response.data.Response === 'True') {
        setSelectedMovie(response.data);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchTerm('naruto');
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchMovies();
    }
  }, [searchTerm, currentPage, filters]);


  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        currentPage,
        totalResults,
        selectedMovie,
        setSelectedMovie,
        filters,
        searchTerm,
        setSearchTerm,
        setFilters,
        setCurrentPage,
        fetchMovies,
        fetchMovieDetails,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};