export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Genre: string;
  Plot: string;
  Director: string;
  Actors: string;
  Runtime: string;
  imdbRating: string;
}
 
export interface SearchFilters {
  year: string;
  genre: string;
}

export interface MovieContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalResults: number;
  selectedMovie: MovieDetails | null;
  setSelectedMovie: (movie: MovieDetails | null) => void;
  filters: SearchFilters;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: SearchFilters) => void;
  setCurrentPage: (page: number) => void;
  fetchMovies: () => Promise<void>;
  fetchMovieDetails: (id: string) => Promise<void>;
}