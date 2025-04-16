// components/SongCard.jsx
import React from 'react';

const SongCard = ({ result }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <img src={result.album?.images[0]?.url} alt={result.name} className="w-full h-40 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-semibold text-black">{result.name}</h3>
      <p className="text-gray-600">{result.artists?.map((artist) => artist.name).join(', ')}</p>
      <p className="text-gray-500">Album: {result.album?.name}</p>
    </div>
  );
};

export default SongCard;
