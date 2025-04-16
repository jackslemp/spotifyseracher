import React from 'react';

const SongCard = ({ result }) => {
  let imageUrl = '';
  let title = '';
  let subtitle = '';
  let type = '';
  let albumName = '';
  let releaseYear = '';

  if (result.type === 'track') {
    imageUrl = result.album?.images[0]?.url;
    title = result.name;
    subtitle = result.artists?.map((artist) => artist.name).join(', ');
    type = 'Track';
    albumName = result.album?.name;
    releaseYear = new Date(result.album?.release_date).getFullYear();
  } else if (result.type === 'artist') {
    imageUrl = result.images?.[0]?.url; 
    title = result.name;
    subtitle = `Artist - ${result.genres?.join(', ') || 'No Genre'}`;
    type = 'Artist';
  } else if (result.type === 'album') {
    imageUrl = result.images?.[0]?.url; 
    title = result.name;
    subtitle = `Album by ${result.artists?.map((artist) => artist.name).join(', ')}`;
    type = 'Album';
  }

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-md mb-2" />}
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="text-gray-600">{subtitle}</p>
      {type === 'Track' && (
        <>
          <p className="text-gray-500">Album: {albumName}</p>
          <p className="text-gray-500">Release Year: {releaseYear}</p>
        </>
      )}
      <p className="text-gray-500">Type: {type}</p>
    </div>
  );
};

export default SongCard;
