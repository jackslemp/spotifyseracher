'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResultList from '../components/SearchResultList';
import axios from 'axios';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
        });

        const data = await response.json();

        if (response.ok) {
          setAccessToken(data.access_token);
        } else {
          console.error('Failed to fetch access token:', data.error);
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  const handleSearch = async (query, genre, type) => {
    if (!accessToken) {
      console.error('Access token not available');
      return;
    }

    let searchString = query;
    if (genre) {
      searchString += ` genre:${genre}`;
    }

    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: searchString,
          type: type, 
        },
      });

      const tracks = response.data.tracks?.items || [];
      const artists = response.data.artists?.items || [];
      const albums = response.data.albums?.items || [];

      let combinedResults = [];
      if (type.includes('track')) combinedResults.push(...tracks);
      if (type.includes('artist')) combinedResults.push(...artists);
      if (type.includes('album')) combinedResults.push(...albums);

      setSearchResults(combinedResults);
    } catch (error) {
      console.error('Error searching Spotify:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spotify Searcher</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResultList results={searchResults} />
    </div>
  );
};

export default HomePage;
