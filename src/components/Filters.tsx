import React from 'react';
import { useMovieContext } from '../context/MovieContext';

const genres = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi',
  'Thriller', 'Romance', 'Animation', 'Adventure', 'Fantasy'
];

const years = Array.from({ length: 75 }, (_, i) => new Date().getFullYear() - i);

export const Filters: React.FC = () => {
  const { filters, setFilters, setCurrentPage } = useMovieContext();

  const handleFilterChange = (key: 'year' | 'genre', value: string) => {
    setCurrentPage(1);
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="flex gap-4">
      <select
        value={filters.genre}
        onChange={(e) => handleFilterChange('genre', e.target.value)}
        className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-600 text-white"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select
        value={filters.year}
        onChange={(e) => handleFilterChange('year', e.target.value)}
        className="px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-600 text-white"
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};