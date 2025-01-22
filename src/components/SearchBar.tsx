import React from 'react';
import { Search } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm, fetchMovies } = useMovieContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) { 
      fetchMovies();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="w-full px-4 py-2 pl-10 pr-12 text-white bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-400"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2 top-1.5 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};