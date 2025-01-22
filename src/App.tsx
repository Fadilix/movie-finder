import { MovieProvider } from './context/MovieContext';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { MovieList } from './components/MovieList';
import { MovieDetails } from './components/MovieDetails';
import { Pagination } from './components/Pagination';
import { Film } from 'lucide-react';
import { OfflineBanner } from './components/OfflineBanner';

function App() {
  return (
    <MovieProvider>
      <OfflineBanner />
      <div className="min-h-screen bg-black text-white">
        <header className="bg-black/90 fixed top-0 left-0 right-0 z-50 shadow-lg shadow-black/50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Film className="h-4 w-4 md:h-8 md:w-8 text-red-600 mr-2" /> 
                <h1 className="text-[14px] md:text-3xl font-bold text-red-600 mr-2">MovieFinder</h1>
              </div>
              <SearchBar />
            </div>
            <Filters />
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 pt-40 pb-8">
          <MovieList />
          <Pagination />
          <MovieDetails />
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;