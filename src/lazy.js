import React from 'react';

// Lazy load all views
export const LazyHomeView = React.lazy(() => import('./components/HomeView'));
export const LazyExploreView = React.lazy(() => import('./components/ExploreView'));
export const LazyRadioView = React.lazy(() => import('./components/RadioView'));
export const LazyPodcastView = React.lazy(() => import('./components/PodcastView'));
export const LazyLibraryView = React.lazy(() => import('./components/LibraryView'));
export const LazyArtistDetail = React.lazy(() => import('./components/ArtistDetail'));
export const LazyAlbumDetail = React.lazy(() => import('./components/AlbumDetail'));
export const LazyPlaylistView = React.lazy(() => import('./components/PlaylistView'));
export const LazyAudiobookView = React.lazy(() => import('./components/AudiobookView'));
export const LazyProfileView = React.lazy(() => import('./components/ProfileView'));
export const LazyPremiumView = React.lazy(() => import('./components/PremiumView'));
