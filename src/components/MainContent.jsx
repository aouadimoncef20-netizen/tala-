import React, { Suspense } from 'react';
import useUIStore from '../stores/uiStore';

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
  <div className="py-16 px-5 text-center text-[var(--text-subdued)]">
    <i className="fa-solid fa-circle-notch text-2xl mb-2 animate-spin"></i>
    <div className="text-sm">Loading...</div>
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
      case 'home': return <LazyHomeView />;
      case 'explore': return <LazyExploreView />;
      case 'search': return <LazySearchResults query={searchQuery} />;
      case 'radio': return <LazyRadioView />;
      case 'podcasts': return <LazyPodcastView />;
      case 'library': return <LazyLibraryView />;
      case 'playlists': return <LazyPlaylistView />;
      case 'audiobooks': return <LazyAudiobookView />;
      case 'profile': return <LazyProfileView />;
      case 'stats': return <LazyStatsView />;
      case 'upload': return <LazyUploadForm />;
      case 'artist': return <LazyArtistDetail artistId={selectedArtist} />;
      case 'album': return <LazyAlbumDetail albumId={selectedAlbum} />;
      default:
        return (
          <div className="py-20 px-5 text-center">
            <i className="fa-solid fa-magnifying-glass text-5xl mb-3 text-[var(--text-subdued)]"></i>
            <div className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Page not found</div>
            <div className="text-sm text-[var(--text-subdued)] mb-5">The view "{activeView}" doesn't exist.</div>
            <button className="bg-[#D4875E] text-[#0C0F14] px-5 py-2.5 rounded-md text-sm font-bold hover:bg-[#E09B75] transition-all inline-flex items-center gap-2" onClick={() => setActiveView('home')}>
              <i className="fa-solid fa-house"></i> Go Home
            </button>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
      <Suspense fallback={<LoadingFallback />}>
        {renderView()}
      </Suspense>
    </main>
  );
};

export default MainContent;
