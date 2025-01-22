import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

export const Pagination: React.FC = () => {
  const { currentPage, totalResults, setCurrentPage, fetchMovies } = useMovieContext();
  const totalPages = Math.ceil(totalResults / 10);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchMovies();
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-gray-700 bg-gray-900/50 disabled:opacity-50 text-white hover:bg-gray-800 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center space-x-2 text-white">
        <span className="px-4 py-2 rounded-md border border-gray-700 bg-gray-900/50">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-gray-700 bg-gray-900/50 disabled:opacity-50 text-white hover:bg-gray-800 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};