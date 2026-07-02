import React, { Suspense } from 'react';
import useUIStore from '../stores/uiStore';
import './MainContent.css';

// Lazy-load all view components
const LazyHomeView = React.lazy(() => import('./HomeView'));
const LazyExploreView = React.lazy(() => import('./ExploreView'));
const LazyRadioView = React.lazy(() => import('./RadioView'));
const LazyPodcastView = React.lazy(() => import('./PodcastView'));
const LazyLibraryView = React.lazy(() => import('./LibraryView'));
const LazyArtistDetail = React.lazy(() => import('./ArtistDetail'));
const LazyAlbumDetail = React.lazy(() => import('./AlbumDetail'));
const LazySearchResults = React.lazy(() => import('./SearchResults'));
const LazyPlaylistView = React.lazy(() => import('./PlaylistView'));
const LazyAudiobookView = React.lazy(() => import('./AudiobookView'));
const LazyProfileView = React.lazy(() => import('./ProfileView'));
const LazyStatsView = React.lazy(() => import('./StatsView'));
const LazyUploadForm = React.lazy(() => import('./UploadForm'));

const LoadingFallback = () => (
  <div className="loading-state" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-subdued)' }}>
    <div style={{ fontSize: 24, marginBottom: 8 }}>â—Œ</div>
    <div style={{ fontSize: 13 }}>Loading...</div>
  </div>
);

const MainContent = () => {
  const activeView = useUIStore(s => s.activeView);
  const searchQuery = useUIStore(s => s.searchQuery);
  const setActiveView = useUIStore(s => s.setActiveView);
  const selectedArtist = useUIStore(s => s.selectedArtist);
  const selectedAlbum = useUIStore(s => s.selectedAlbum);

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <LazyHomeView />;
      case 'explore':
        return <LazyExploreView />;
      case 'search':
        return <LazySearchResults query={searchQuery} />;
      case 'radio':
        return <LazyRadioView />;
      case 'podcasts':
        return <LazyPodcastView />;
      case 'library':
        return <LazyLibraryView />;
      case 'playlists':
        return <LazyPlaylistView />;
      case 'audiobooks':
        return <LazyAudiobookView />;
      case 'profile':
        return <LazyProfileView />;
      case 'stats':
        return <LazyStatsView />;
      case 'upload':
        return <LazyUploadForm />;
      case 'artist':
        return <LazyArtistDetail artistId={selectedArtist} />;
      case 'album':
        return <LazyAlbumDetail albumId={selectedAlbum} />;
      default:
        return (
          <div className="empty-state" style={{ padding: '80px 20px', textAlign: 'center' }}>
            <div className="empty-state__icon" style={{ fontSize: 48, marginBottom: 12 }}>ðŸ”</div>
            <div className="empty-state__text" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Page not found</div>
            <div className="empty-state__sub" style={{ fontSize: 13, color: 'var(--text-subdued)', marginBottom: 20 }}>
              The view "{activeView}" doesn't exist.
            </div>
            <button
              className="hero__btn"
              onClick={() => setActiveView('home')}
              style={{ display: 'inline-flex' }}
            >
              â—‡ Go Home
            </button>
          </div>
        );
    }
  };

  return (
    <main className="main-content">
      <Suspense fallback={<LoadingFallback />}>
        {renderView()}
      </Suspense>
    </main>
  );
};

export default MainContent;

