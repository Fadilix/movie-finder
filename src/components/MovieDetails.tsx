import React from 'react';
import { X } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

export const MovieDetails: React.FC = () => {
  const { selectedMovie, setSelectedMovie } = useMovieContext();

  if (!selectedMovie) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={() => setSelectedMovie(null)}
            className="absolute right-4 top-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white z-10" 
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={selectedMovie.Title}
                className="w-full md:w-[300px] h-[450px] object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-white">{selectedMovie.Title}</h2>
                
                <div className="space-y-4">
                  <p className="text-gray-300">{selectedMovie.Plot}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-red-600">Year</h3>
                      <p className="text-gray-300">{selectedMovie.Year}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">Genre</h3>
                      <p className="text-gray-300">{selectedMovie.Genre}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">Director</h3>
                      <p className="text-gray-300">{selectedMovie.Director}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">Runtime</h3>
                      <p className="text-gray-300">{selectedMovie.Runtime}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">IMDb Rating</h3>
                      <p className="text-gray-300">{selectedMovie.imdbRating}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">Actors</h3>
                      <p className="text-gray-300">{selectedMovie.Actors}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};