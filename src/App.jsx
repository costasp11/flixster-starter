import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import Modal from './components/Modal'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentQuery(searchQuery.trim());
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentQuery('');
    setFilterValue('');
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <h1 onClick={clearSearch} style={{cursor: 'pointer'}}> 
            Flixster 
          </h1>
          <div className="search-bar-container">
            <input 
              type="text" 
              placeholder="Search for a movie..." 
              className="search-bar"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch}> 
              Search
            </button>
            <button className="clear-button" onClick={clearSearch}>
              Clear
            </button>
          </div>
          <div className="filter-container">
            <select 
              htmlFor="filter"
              className="filter-select" 
              value={filterValue}
              onChange={handleFilterChange}
            >
              <option value="">Filter by</option>
              <option value="title.asc">Title (A-Z)</option>
              <option value="vote_average.desc">Top Rated</option>
              <option value="primary_release_date.desc">Newest First</option>
            </select>
          </div>
        </nav>  
      </header>

      <main>
        <MovieList 
          searchQuery={currentQuery} 
          filterValue={filterValue}
          onMovieClick={handleMovieClick}
        />
      </main>

      {selectedMovie && (
        <Modal 
          movie={selectedMovie} 
          onClose={handleCloseModal}
        />
      )}

      <footer className="App-footer">
        <p>© 2025 Flixster. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App