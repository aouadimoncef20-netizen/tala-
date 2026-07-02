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

const HERO_SLIDES = [
  {
    id: 'music', label: 'Trending Tracks', title: 'Discover Algerian Music',
    desc: 'From Rai to Chaabi, Kabyle to Rap Dz — the sounds of Algeria in one place.',
    action: 'explore', items: TRACKS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talamusic/1200/500', color: '#D4875E',
  },
  {
    id: 'albums', label: 'New Albums', title: 'Latest Album Releases',
    desc: 'Fresh releases from your favorite Algerian artists. Updated weekly.',
    action: 'explore', items: ALBUMS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talaalbums/1200/500', color: '#4A9BAA',
  },
  {
    id: 'radio', label: 'Live Radio', title: 'Listen Live',
    desc: '20 Algerian radio stations — news, music, culture. Streaming now.',
    action: 'radio', items: RADIO_STATIONS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talaradio/1200/500', color: '#C9A04A',
  },
  {
    id: 'podcasts', label: 'Podcasts', title: 'Algerian Stories',
    desc: 'Culture, history, tech, comedy — podcasts that speak to you.',
    action: 'podcasts', items: PODCASTS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talapod/1200/500', color: '#E65100',
  },
  {
    id: 'audiobooks', label: 'Audiobooks', title: 'Listen & Learn',
    desc: 'Algerian literature, history, poetry, and philosophy — narrated.',
    action: 'audiobooks', items: AUDIOBOOKS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talaaudio/1200/500', color: '#6A1B9A',
  },
  {
    id: 'artists', label: 'Artists', title: 'Explore Algerian Artists',
    desc: 'From legendary Rai icons to modern rap pioneers. Discover them all.',
    action: 'explore', items: ARTISTS.slice(0, 5),
    bg: 'https://picsum.photos/seed/talaartists/1200/500', color: '#5AA87A',
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

  useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 500); return () => clearTimeout(timer); }, []);

  const slide = HERO_SLIDES[currentSlide];
  const isActive = (id) => currentTrack?.id === id && isPlaying;

  const playTrack = (track) => playOrToggle({ ...track, podcastName: track.artist, podcastId: track.artistId });

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length); setFade(true); }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSlideClick = () => setActiveView(slide.action);

  const handleDotClick = (idx) => {
    setFade(false);
    setTimeout(() => { setCurrentSlide(idx); setFade(true); }, 300);
  };

  const getItemImage = (item) => item.image || item.bg || '';

  if (isLoading) {
    return (
      <div>
        <SkeletonHero />
        <div className="px-1 mt-5">{Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}</div>
        <div className="mt-8"><SkeletonGrid count={8} /></div>
        <div className="mt-8"><SkeletonGrid count={6} /></div>
      </div>
    );
  }

  return (
    <div>
      <ForYouSection />

      {/* Dynamic Hero Banner */}
      <div className="relative rounded-xl mx-5 mt-4 overflow-hidden cursor-pointer border border-[var(--border)]" onClick={handleSlideClick}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.bg})` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${slide.color}44, ${slide.color}22, rgba(12,15,20,0.85))` }} />

        <div className={`relative px-7 py-10 min-h-[260px] flex flex-col justify-center z-10 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider mb-3 self-start border" style={{ background: `${slide.color}33`, borderColor: `${slide.color}44`, color: slide.color }}>
            {slide.label}
          </span>
          <h1 className="text-[28px] font-black text-[var(--text-primary)] mb-2">{slide.title}</h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl mb-4">{slide.desc}</p>

          <div className="flex gap-2 mb-4">
            {slide.items.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-[rgba(12,15,20,0.5)] rounded px-2 py-1 backdrop-blur-sm" title={item.title || item.name}>
                <div className="w-6 h-6 rounded bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${getItemImage(item)})` }} />
                <span className="text-[10px] text-[var(--text-primary)] font-medium truncate max-w-[80px]">{item.title || item.name}</span>
              </div>
            ))}
          </div>

          <button className="bg-[#D4875E] text-[#0C0F14] px-5 py-2 rounded-md text-sm font-bold hover:bg-[#E09B75] transition-all hover:shadow-[0_0_20px_rgba(212,135,94,0.25)] inline-flex items-center gap-2 self-start" onClick={(e) => { e.stopPropagation(); setActiveView(slide.action); }}>
            <i className="fa-solid fa-play"></i> Explore {slide.label}
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 right-6 flex gap-1.5 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-5' : ''}`}
              style={i === currentSlide ? { background: slide.color } : { background: 'rgba(255,255,255,0.25)' }}
              onClick={(e) => { e.stopPropagation(); handleDotClick(i); }} />
          ))}
        </div>
      </div>

      {/* Trending Tracks */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-base font-bold section-title text-[var(--text-primary)]">Trending</span>
            <span className="text-[11px] text-[var(--text-subdued)] ml-2">top tracks</span>
          </div>
          <button className="text-[11px] text-[var(--text-subdued)] hover:text-[#D4875E] transition-colors font-medium" onClick={() => setActiveView('explore')}>View All</button>
        </div>
        <div className="space-y-0.5">
          {TRACKS.slice(0, 6).map((track, i) => (
            <div key={track.id} onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY, track }); }}>
              <TrackRow track={track} index={i} isActive={isActive(track.id)} onPlay={playTrack} onShare={setShareTrack} />
            </div>
          ))}
        </div>
      </section>

      {/* Mood Playlists */}
      <MoodPlaylists />

      {/* Artists */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-bold section-title text-[var(--text-primary)]">Artists</span>
          <button className="text-[11px] text-[var(--text-subdued)] hover:text-[#D4875E] transition-colors font-medium" onClick={() => setActiveView('explore')}>View All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {ARTISTS.slice(0, 8).map(artist => (
            <div key={artist.id} className="min-w-[130px] max-w-[130px] cursor-pointer group" onClick={() => setSelectedArtist(artist.id)} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedArtist(artist.id); } }}>
              <div className="relative rounded-full p-[6px] mb-1">
                <img className="w-full aspect-square rounded-full object-cover group-hover:scale-105 transition-transform duration-300" src={artist.image} alt={artist.name} loading="lazy" />
                <div className="absolute inset-0 bg-[rgba(12,15,20,0.3)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-9 h-9 rounded-md bg-[#D4875E] flex items-center justify-center shadow-lg" style={{boxShadow:'0 0 20px rgba(212,135,94,0.4)'}}>
                    <i className="fa-solid fa-play text-[#0C0F14] text-xs ml-0.5"></i>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[11px] font-semibold text-[var(--text-primary)] truncate">{artist.name}</div>
                <div className="text-[9px] text-[var(--text-subdued)]">{artist.genre}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Radio */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-base font-bold section-title text-[var(--text-primary)]">Live Radio</span>
            <span className="text-[11px] text-[var(--text-subdued)] ml-2">stations</span>
          </div>
          <button className="text-[11px] text-[var(--text-subdued)] hover:text-[#D4875E] transition-colors font-medium" onClick={() => setActiveView('radio')}>All Stations</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {RADIO_STATIONS.slice(0, 6).map(radio => (
            <div key={radio.id} className="min-w-[130px] max-w-[130px] cursor-pointer group" onClick={() => playOrToggle({
              id: radio.id, title: radio.name, artist: radio.freq, type: 'radio',
              image: radio.image, duration: 'Live', podcastName: radio.name,
            })} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playOrToggle({ id: radio.id, title: radio.name, artist: radio.freq, type: 'radio', image: radio.image, duration: 'Live', podcastName: radio.name }); } }}>
              <div className="relative rounded-[var(--radius-md)] overflow-hidden">
                <img className="w-full aspect-square object-cover" src={radio.image} alt={radio.name} loading="lazy" />
                <div className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-md bg-[#4A9BAA] flex items-center justify-center shadow">
                  <i className="fa-solid fa-play text-[#0C0F14] text-xs ml-0.5"></i>
                </div>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-semibold text-[var(--text-primary)] truncate">{radio.name}</div>
                <div className="text-[9px] text-[var(--text-subdued)]">{radio.freq}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Albums */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-base font-bold section-title text-[var(--text-primary)]">Albums</span>
            <span className="text-[11px] text-[var(--text-subdued)] ml-2">recent releases</span>
          </div>
          <button className="text-[11px] text-[var(--text-subdued)] hover:text-[#D4875E] transition-colors font-medium" onClick={() => setActiveView('explore')}>View All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {ALBUMS.slice(0, 10).map(album => (
            <div key={album.id} className="min-w-[130px] max-w-[130px] cursor-pointer group" onClick={() => setSelectedAlbum(album.id)} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedAlbum(album.id); } }}>
              <div className="relative rounded-[var(--radius-md)] overflow-hidden transition-all duration-300 group-hover:-translate-y-[2px] group-hover:shadow-lg">
                <img className="w-full aspect-square object-cover" src={album.image} alt={album.title} loading="lazy" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-9 h-9 rounded-md bg-[#D4875E] flex items-center justify-center shadow-lg translate-y-2 group-hover:translate-y-0 transition-all duration-300" style={{boxShadow:'0 0 20px rgba(212,135,94,0.4)'}}>
                    <i className="fa-solid fa-play text-[#0C0F14] text-xs ml-0.5"></i>
                  </div>
                </div>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-semibold text-[var(--text-primary)] truncate">{album.title}</div>
                <div className="text-[9px] text-[var(--text-subdued)]">{album.artist} · {album.year}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Podcasts */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-base font-bold section-title text-[var(--text-primary)]">Podcasts</span>
            <span className="text-[11px] text-[var(--text-subdued)] ml-2">episodes</span>
          </div>
          <button className="text-[11px] text-[var(--text-subdued)] hover:text-[#D4875E] transition-colors font-medium" onClick={() => setActiveView('podcasts')}>View All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {PODCASTS.slice(0, 6).map(pod => (
            <div key={pod.id} className="min-w-[130px] max-w-[130px] cursor-pointer group" onClick={() => setActiveView('podcasts')} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveView('podcasts'); } }}>
              <div className="relative rounded-[var(--radius-md)] overflow-hidden">
                <img className="w-full aspect-square object-cover" src={pod.image} alt={pod.title} loading="lazy" />
                <div className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-md bg-[#D4875E] flex items-center justify-center shadow">
                  <i className="fa-solid fa-play text-[#0C0F14] text-xs ml-0.5"></i>
                </div>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-semibold text-[var(--text-primary)] truncate">{pod.title}</div>
                <div className="text-[9px] text-[var(--text-subdued)]">{pod.host}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audiobooks */}
      <section className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-base font-bold section-title text-[var(--text-primary)]">Audiobooks</span>
            <span className="text-[11px] text-[var(--text-subdued)] ml-2">listen & learn</span>
          </div>
          <button className="text-[11px] text-[var(--text-subdued)] hover:text-[#D4875E] transition-colors font-medium" onClick={() => setActiveView('audiobooks')}>View All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {AUDIOBOOKS.slice(0, 8).map(book => (
            <div key={book.id} className="min-w-[130px] max-w-[130px] cursor-pointer group" onClick={() => setActiveView('audiobooks')} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveView('audiobooks'); } }}>
              <div className="relative rounded-[var(--radius-md)] overflow-hidden">
                <div className="w-full aspect-square flex items-center justify-center text-2xl font-bold text-white" style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}66)` }}>
                  {book.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-md bg-[#6A1B9A] flex items-center justify-center shadow">
                  <i className="fa-solid fa-play text-white text-xs ml-0.5"></i>
                </div>
              </div>
              <div className="mt-1.5">
                <div className="text-[11px] font-semibold text-[var(--text-primary)] truncate">{book.title}</div>
                <div className="text-[9px] text-[var(--text-subdued)]">{book.author} · {book.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Genres */}
      <section className="px-5 mt-7 mb-6">
        <span className="text-base font-bold section-title text-[var(--text-primary)]">Genres</span>
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {GENRES.map((g, i) => (
            <div key={g.name} className="rounded-[var(--radius-md)] p-3.5 cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg animate-fade-in-up"
              style={{ background: `linear-gradient(135deg, ${g.color}, ${g.color}77)`, animationDelay: `${i * 0.03}s` }}
              onClick={() => setActiveView('explore')} tabIndex={0} role="button" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveView('explore'); } }}>
              <div className="text-sm font-bold text-white mb-0.5">{g.name}</div>
              <div className="text-[10px] text-white/80">{g.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {shareTrack && <ShareMenu track={shareTrack} onClose={() => setShareTrack(null)} onToast={(type, title, msg) => addToast(createToast(type, title, msg))} />}
      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} track={contextMenu.track} onClose={() => setContextMenu(null)} />}

      {/* Spacer for player */}
      <div className="h-4"></div>
    </div>
  );
};

export default HomeView;
