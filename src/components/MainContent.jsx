import React from 'react';
import HomeView from './HomeView';
import ExploreView from './ExploreView';
import RadioView from './RadioView';
import PodcastView from './PodcastView';
import LibraryView from './LibraryView';
import ArtistDetail from './ArtistDetail';
import AlbumDetail from './AlbumDetail';
import SearchResults from './SearchResults';
import PlaylistView from './PlaylistView';
import AudiobookView from './AudiobookView';
import ProfileView from './ProfileView';
import './MainContent.css';

const MainContent = ({
  activeView, searchQuery, onPlay, currentTrack, isPlaying, setActiveView,
  likedTracks, onToggleLike, onAddToQueue,
  onOpenArtist, onOpenAlbum, onOpenAudiobook,
  selectedArtist, selectedAlbum, onToast,
}) => {
  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} setActiveView={setActiveView} onOpenArtist={onOpenArtist} onOpenAlbum={onOpenAlbum} onOpenAudiobook={onOpenAudiobook} />;
      case 'explore':
        return <ExploreView searchQuery={searchQuery} onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} setActiveView={setActiveView} onToggleLike={onToggleLike} likedTracks={likedTracks} />;
      case 'search':
        return <SearchResults query={searchQuery} onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} onOpenArtist={onOpenArtist} onToggleLike={onToggleLike} likedTracks={likedTracks} />;
      case 'radio':
        return <RadioView onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} />;
      case 'podcasts':
        return <PodcastView onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} onToggleLike={onToggleLike} likedTracks={likedTracks} onToast={onToast} />;
      case 'library':
        return <LibraryView likedTracks={likedTracks} onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} />;
      case 'playlists':
        return <PlaylistView onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} />;
      case 'audiobooks':
        return <AudiobookView onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} />;
      case 'profile':
        return <ProfileView likedTracks={likedTracks} onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} />;
      case 'artist':
        return <ArtistDetail artistId={selectedArtist} onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} onOpenAlbum={onOpenAlbum} />;
      case 'album':
        return <AlbumDetail albumId={selectedAlbum} onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} onOpenArtist={onOpenArtist} />;
      default:
        return <HomeView onPlay={onPlay} currentTrack={currentTrack} isPlaying={isPlaying} setActiveView={setActiveView} onOpenArtist={onOpenArtist} onOpenAlbum={onOpenAlbum} onOpenAudiobook={onOpenAudiobook} />;
    }
  };

  return <main className="main-content">{renderView()}</main>;
};

export default MainContent;
