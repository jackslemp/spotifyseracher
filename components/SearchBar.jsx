// components/SearchBar.jsx
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const genres = [
  'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Country', 'Jazz', 'Classical', 'R&B', 'Metal',
  // Add more genres as needed
];

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, genre);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Search for artists, songs, or albums"
        value={query}
        onChange={handleChange}
        className="px-4 py-2 rounded-l-md focus:outline-none"
      />
      <select
        value={genre}
        onChange={handleGenreChange}
        className="px-4 py-2 rounded-md focus:outline-none bg-white border border-gray-300 text-black"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
