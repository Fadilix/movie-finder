import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import { Movie } from '../types/movie';

export const MovieList: React.FC = () => {
  const {
    movies,
    loading,
    //  error,
    fetchMovieDetails
  } = useMovieContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="text-center text-red-500 p-4">
  //       {error}
  //     </div>
  //   );
  // }

  if (movies.length === 0) {
    return (
      <div className="text-center text-gray-400 p-4 text-lg">
        Movies not found
      </div>
    );
  }


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie: Movie) => (
        <div
          key={movie.imdbID}
          className="group relative cursor-pointer"
          onClick={() => fetchMovieDetails(movie.imdbID)}
        >
          <div className="aspect-[2/3] overflow-hidden rounded-md">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://rezista.in/wp-content/uploads/2020/07/Image-Placeholder-Dark.png'}
              alt={movie.Title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-lg font-semibold text-white mb-1">{movie.Title}</h3>
            <p className="text-sm text-gray-300">{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};