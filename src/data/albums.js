import { ARTISTS } from './artists';

// ===== GENERATE ALBUMS =====
const ALBUM_SUFFIXES = ['Vol.1','Vol.2','Vol.3','Collection','Best Of','Live Session','Studio Session','Acoustic','Remix EP','Deluxe','Anthology','Unplugged','Classics','Essentials','Rarities','Gold Edition','Platinum','Night Session','Morning Session','Mega Hits'];
export const ALBUMS = [];

ARTISTS.forEach((artist, ai) => {
  const albumCount = 6 + (ai % 7);
  for (let i = 0; i < albumCount; i++) {
    const suffix = ALBUM_SUFFIXES[i % ALBUM_SUFFIXES.length];
    const albumColor = artist.color;
    const shade = ['33','44','55','66','77','88'][i % 6];
    ALBUMS.push({
      id: `alb-${artist.id}-${i}`,
      title: i === 0 ? `${artist.name} — ${suffix}` : `${artist.name} ${suffix}`,
      artist: artist.name,
      artistId: artist.id,
      year: `${2025 - (i % 5)}`,
      image: `https://picsum.photos/seed/${artist.id}album${i}/400/400`,
      color: `${albumColor}${shade}`,
      tracks: 8 + (i % 9),
    });
  }
});
ALBUMS.push({ id: 'alb-various-1', title: 'Sahara Grooves', artist: 'Various', artistId: null, year: '2025', image: 'https://picsum.photos/seed/sahara/400/400', color: '#C9A04A', tracks: 10 });
ALBUMS.push({ id: 'alb-various-2', title: 'Algerian Rap Vol.1', artist: 'Various', artistId: null, year: '2025', image: 'https://picsum.photos/seed/rapdzvol1/400/400', color: '#00ACC1', tracks: 12 });
ALBUMS.push({ id: 'alb-various-3', title: 'Gnawa Nights', artist: 'Various', artistId: null, year: '2024', image: 'https://picsum.photos/seed/gnawanights/400/400', color: '#C8A45C', tracks: 9 });

export const getAlbumById = (id) => ALBUMS.find(a => a.id === id);
