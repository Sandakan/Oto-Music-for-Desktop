/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import { AppContext } from 'renderer/contexts/AppContext';
import { HomePage } from './HomePage/homePage';
import { ArtistPage } from './ArtistPage/ArtistPage';
import { AlbumsPage } from './AlbumsPage/AlbumsPage';
import { PlaylistsPage } from './PlaylistsPage/PlaylistsPage';
import SearchPage from './SearchPage/SearchPage';
import { SettingsPage } from './SettingsPage/SettingsPage';
import { LyricsPage } from './LyricsPage/LyricsPage';
import SongInfoPage from './SongInfoPage/SongInfoPage';
import ArtistInfoPage from './ArtistInfoPage/ArtistInfoPage';
import AlbumInfoPage from './AlbumInfoPage/AlbumInfoPage';
import PlaylistsInfoPage from './PlaylistsInfoPage/PlaylistsInfoPage';
import CurrentQueuePage from './CurrentQueuePage/CurrentQueuePage';
import AllSearchResultsPage from './SearchPage/AllSearchResultsPage';
import GenresPage from './GenresPage/GenresPage';
import GenreInfoPage from './GenreInfoPage/GenreInfoPage';
import SongTagsEditingPage from './SongTagsEditingPage/SongTagsEditingPage';
import { SongsPage } from './SongsPage/SongsPage';

const Body = React.memo(() => {
  const { currentlyActivePage } = useContext(AppContext);
  return (
    <div className="body w-full h-full order-2 relative overflow-auto">
      {currentlyActivePage.pageTitle === 'Songs' && <SongsPage />}
      {currentlyActivePage.pageTitle === 'Home' && <HomePage />}
      {currentlyActivePage.pageTitle === 'Artists' && <ArtistPage />}
      {currentlyActivePage.pageTitle === 'Albums' && <AlbumsPage />}
      {currentlyActivePage.pageTitle === 'Playlists' && <PlaylistsPage />}
      {currentlyActivePage.pageTitle === 'Search' && <SearchPage />}
      {currentlyActivePage.pageTitle === 'Genres' && <GenresPage />}
      {currentlyActivePage.pageTitle === 'AllSearchResults' && (
        <AllSearchResultsPage />
      )}
      {currentlyActivePage.pageTitle === 'Settings' && <SettingsPage />}
      {currentlyActivePage.pageTitle === 'Lyrics' && <LyricsPage />}
      {currentlyActivePage.pageTitle === 'CurrentQueue' && <CurrentQueuePage />}
      {currentlyActivePage.pageTitle === 'SongInfo' && <SongInfoPage />}
      {currentlyActivePage.pageTitle === 'ArtistInfo' && <ArtistInfoPage />}
      {currentlyActivePage.pageTitle === 'AlbumInfo' &&
        currentlyActivePage.data !== '' && <AlbumInfoPage />}
      {currentlyActivePage.pageTitle === 'PlaylistInfo' &&
        currentlyActivePage.data !== '' && <PlaylistsInfoPage />}
      {currentlyActivePage.pageTitle === 'GenreInfo' && <GenreInfoPage />}
      {currentlyActivePage.pageTitle === 'SongTagsEditor' && (
        <SongTagsEditingPage />
      )}
    </div>
  );
});

Body.displayName = 'Body';
export default Body;
