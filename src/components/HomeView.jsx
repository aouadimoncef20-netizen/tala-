import React, { useState, useEffect } from 'react';
import { ARTISTS } from '../data/artists';
import { TRACKS } from '../data/tracks';
import { RADIO_STATIONS } from '../data/radio';
import { PODCASTS } from '../data/podcasts';
import { GENRES } from '../data/genres';
import { ALBUMS } from '../data/albums';
import { AUDIOBOOKS } from '../data/audiobooks';
import MoodPlaylists from './MoodPlaylists';
import ForYouSection from './ForYouSection';
import ShareMenu from './ShareMenu';
import ContextMenu from './ContextMenu';
import TrackRow from './TrackRow';
import { SkeletonHero, SkeletonRow, SkeletonGrid } from './Skeleton';
import usePlayerStore from '../stores/playerStore';
import useUIStore from '../stores/uiStore';
import useLibraryStore from '../stores/libraryStore';
import { createToast } from './Toast';
import './MainContent.css';

const HERO_SLIDES = [
  {
    id: 'music',
    label: 'Trending Tracks',
    title: 'Discover Algerian Music',
    desc: 'From Rai to Chaabi, Kabyle to Rap Dz â€” the sounds of Algeria in one place.',
    action: 'explore',
    items: TRACKS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talamusic/1200/500',
    color: '#D4875E',
  },
  {
    id: 'albums',
    label: 'New Albums',
    title: 'Latest Album Releases',
    desc: 'Fresh releases from your favorite Algerian artists. Updated weekly.',
    action: 'explore',
    items: ALBUMS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talaalbums/1200/500',
    color: '#4A9BAA',
  },
  {
    id: 'radio',
    label: 'Live Radio',
    title: 'Listen Live',
    desc: '20 Algerian radio stations â€” news, music, culture. Streaming now.',
    action: 'radio',
    items: RADIO_STATIONS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talaradio/1200/500',
    color: '#C9A04A',
  },
  {
    id: 'podcasts',
    label: 'Podcasts',
    title: 'Algerian Stories',
    desc: 'Culture, history, tech, comedy â€” podcasts that speak to you.',
    action: 'podcasts',
    items: PODCASTS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talapod/1200/500',
    color: '#E65100',
  },
  {
    id: 'audiobooks',
    label: 'Audiobooks',
    title: 'Listen & Learn',
    desc: 'Algerian literature, history, poetry, and philosophy â€” narrated.',
    action: 'audiobooks',
    items: AUDIOBOOKS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talaaudio/1200/500',
    color: '#6A1B9A',
  },
  {
    id: 'artists',
    label: 'Artists',
    title: 'Explore Algerian Artists',
    desc: 'From legendary Rai icons to modern rap pioneers. Discover them all.',
    action: 'explore',
    items: ARTISTS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talaartists/1200/500',
    color: '#5AA87A',
  },
];

const HomeView = () => {
  const { currentTrack, isPlaying, playOrToggle, addToQueue } = usePlayerStore();
  const { setActiveView, setSelectedArtist, setSelectedAlbum, addToast } = useUIStore();
  const { likedTracks } = useLibraryStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);
  const [shareTrack, setShareTrack] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load with skeleton
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];
  const isActive = (id) => currentTrack?.id === id && isPlaying;

  const playTrack = (track) => playOrToggle({ ...track, podcastName: track.artist, podcastId: track.artistId });

  // Auto-cycle every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
        setFade(true);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideClick = () => {
    setActiveView(slide.action);
  };

  const handleDotClick = (idx) => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide(idx);
      setFade(true);
    }, 300);
  };

  const getItemImage = (item) => item.image || item.bg || '';

  if (isLoading) {
    return (
      <div>
        <SkeletonHero />
        <div style={{ padding: '0 4px', marginTop: 20 }}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
        <div style={{ marginTop: 32 }}>
          <SkeletonGrid count={8} />
        </div>
        <div style={{ marginTop: 32 }}>
          <SkeletonGrid count={6} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* For You Recommendations */}
      <ForYouSection />

      {/* Dynamic Hero Banner */}
      <div className="hero hero--dynamic" onClick={handleSlideClick} style={{ cursor: 'pointer' }}>
        {/* Background image */}
        <div className="hero__bg-img" style={{ backgroundImage: `url(${slide.bg})` }} />
        <div className="hero__overlay" style={{ background: `linear-gradient(135deg, ${slide.color}44, ${slide.color}22, rgba(12,15,20,0.85))` }} />

        <div className={`hero__content ${fade ? 'hero__content--visible' : ''}`}>
          <div className="hero__tag" style={{ background: `${slide.color}33`, borderColor: `${slide.color}44`, color: slide.color }}>
            {slide.label}
          </div>
          <h1 className="hero__title">{slide.title}</h1>
          <p className="hero__desc">{slide.desc}</p>

          {/* Mini preview of items */}
          <div className="hero__items">
            {slide.items.map((item, i) => (
              <div key={i} className="hero__item" title={item.title || item.name}>
                <div className="hero__item-img" style={{ backgroundImage: `url(${getItemImage(item)})` }} />
                <span className="hero__item-name">{item.title || item.name}</span>
              </div>
            ))}
          </div>

          <button className="hero__btn" onClick={(e) => { e.stopPropagation(); setActiveView(slide.action); }}>
            â–¶ Explore {slide.label}
          </button>
        </div>

        {/* Dots */}
        <div className="hero__dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === currentSlide ? 'hero__dot--active' : ''}`}
              onClick={(e) => { e.stopPropagation(); handleDotClick(i); }}
              style={i === currentSlide ? { background: slide.color } : {}}
            />
          ))}
        </div>
      </div>

      {/* Trending Tracks */}
      <section className="section">
        <div className="section__head">
          <div>
            <span className="section__title">Trending</span>
            <span className="section__count">top tracks</span>
          </div>
          <button className="section__more" onClick={() => setActiveView('explore')}>View All</button>
        </div>
        <div className="track-list">
          {TRACKS.slice(0, 6).map((track, i) => (
            <div
              key={track.id}
              onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY, track }); }}
            >
              <TrackRow
                track={track}
                index={i}
                isActive={isActive(track.id)}
                onPlay={playTrack}
                onShare={setShareTrack}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Mood Playlists */}
      <MoodPlaylists />

      {/* Artists */}
      <section className="section">
        <div className="section__head">
          <span className="section__title">Artists</span>
          <button className="section__more" onClick={() => setActiveView('explore')}>View All</button>
        </div>
        <div className="scroll">
          {ARTISTS.slice(0, 8).map(artist => (
            <div key={artist.id} className="card" style={{ minWidth: 130, maxWidth: 130, cursor: 'pointer' }} onClick={() => setSelectedArtist(artist.id)} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedArtist(artist.id); } }}>
              <div className="card__img-wrap" style={{ borderRadius: '50%', padding: 6, background: 'transparent' }}>
                <img className="card__img" src={artist.image} alt={artist.name} loading="lazy" style={{ borderRadius: '50%' }} />
              </div>
              <div className="card__body" style={{ textAlign: 'center' }}>
                <div className="card__title" style={{ fontSize: 11 }}>{artist.name}</div>
                <div className="card__sub" style={{ fontSize: 9 }}>{artist.genre}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Radio */}
      <section className="section">
        <div className="section__head">
          <div>
            <span className="section__title">Live Radio</span>
            <span className="section__count">stations</span>
          </div>
          <button className="section__more" onClick={() => setActiveView('radio')}>All Stations</button>
        </div>
        <div className="scroll">
          {RADIO_STATIONS.slice(0, 6).map(radio => (
            <div key={radio.id} className="card" onClick={() => playOrToggle({
              id: radio.id, title: radio.name, artist: radio.freq, type: 'radio',
              image: radio.image, duration: 'Live', podcastName: radio.name,
            })} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playOrToggle({ id: radio.id, title: radio.name, artist: radio.freq, type: 'radio', image: radio.image, duration: 'Live', podcastName: radio.name }); } }}>
              <div className="card__img-wrap">
                <img className="card__img" src={radio.image} alt={radio.name} loading="lazy" />
                <div className="card__play card__play--visible" style={{ background: '#4A9BAA' }}>
                  <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
                </div>
              </div>
              <div className="card__body">
                <div className="card__title">{radio.name}</div>
                <div className="card__sub">{radio.freq}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Albums */}
      <section className="section">
        <div className="section__head">
          <div>
            <span className="section__title">Albums</span>
            <span className="section__count">recent releases</span>
          </div>
          <button className="section__more" onClick={() => setActiveView('explore')}>View All</button>
        </div>
        <div className="scroll">
          {ALBUMS.slice(0, 10).map(album => (
            <div key={album.id} className="card" onClick={() => setSelectedAlbum(album.id)} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedAlbum(album.id); } }}>
              <div className="card__img-wrap">
                <img className="card__img" src={album.image} alt={album.title} loading="lazy" />
                <div className="card__play card__play--visible">
                  <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
                </div>
              </div>
              <div className="card__body">
                <div className="card__title">{album.title}</div>
                <div className="card__sub">{album.artist} Â· {album.year}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Podcasts */}
      <section className="section">
        <div className="section__head">
          <div>
            <span className="section__title">Podcasts</span>
            <span className="section__count">episodes</span>
          </div>
          <button className="section__more" onClick={() => setActiveView('podcasts')}>View All</button>
        </div>
        <div className="scroll">
          {PODCASTS.slice(0, 6).map(pod => (
            <div key={pod.id} className="card" onClick={() => setActiveView('podcasts')} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveView('podcasts'); } }}>
              <div className="card__img-wrap">
                <img className="card__img" src={pod.image} alt={pod.title} loading="lazy" />
                <div className="card__play card__play--visible">
                  <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
                </div>
              </div>
              <div className="card__body">
                <div className="card__title">{pod.title}</div>
                <div className="card__sub">{pod.host}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audiobooks */}
      <section className="section">
        <div className="section__head">
          <div>
            <span className="section__title">Audiobooks</span>
            <span className="section__count">listen & learn</span>
          </div>
          <button className="section__more" onClick={() => setActiveView('audiobooks')}>View All</button>
        </div>
        <div className="scroll">
          {AUDIOBOOKS.slice(0, 8).map(book => (
            <div key={book.id} className="card" onClick={() => setActiveView('audiobooks')} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveView('audiobooks'); } }}>
              <div className="card__img-wrap">
                <div className="card__img" style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff' }}>
                  {book.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div className="card__play card__play--visible" style={{ background: '#6A1B9A' }}>
                  <svg viewBox="0 0 24 24"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 001.12.56l12.8-8.3a.7.7 0 000-1.12l-12.8-8.3A.7.7 0 005.7 3z"/></svg>
                </div>
              </div>
              <div className="card__body">
                <div className="card__title">{book.title}</div>
                <div className="card__sub">{book.author} Â· {book.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Genres */}
      <section className="section">
        <div className="section__head">
          <span className="section__title">Genres</span>
        </div>
        <div className="genre-grid">
          {GENRES.map((g, i) => (
            <div key={g.name} className="genre-card" style={{ background: `linear-gradient(135deg, ${g.color}, ${g.color}77)`, animationDelay: `${i * 0.03}s` }} onClick={() => setActiveView('explore')} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveView('explore'); } }}>
              <div className="genre-card__name">{g.name}</div>
              <div className="genre-card__desc">{g.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Share Menu */}
      {shareTrack && (
        <ShareMenu track={shareTrack} onClose={() => setShareTrack(null)} onToast={(type, title, msg) => addToast(createToast(type, title, msg))} />
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          track={contextMenu.track}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default HomeView;

