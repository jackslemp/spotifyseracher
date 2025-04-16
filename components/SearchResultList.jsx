import React from 'react';
import SongCard from './SongCard';

const SearchResultList = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <SongCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default SearchResultList;
