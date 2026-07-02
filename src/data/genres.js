// ===== GENRES =====
export const GENRES = [
  { name: 'Rai', color: '#D32F2F', desc: 'From Oran to the world' },
  { name: 'Chaabi', color: '#006B3F', desc: 'The soul of Algiers' },
  { name: 'Kabyle', color: '#E65100', desc: 'Amazigh melodies' },
  { name: 'Diwan', color: '#C8A45C', desc: 'Saharan grooves' },
  { name: 'Staifi', color: '#7B1FA2', desc: 'Eastern vibes' },
  { name: 'Rap Dz', color: '#00ACC1', desc: 'Algerian hip-hop' },
  { name: 'Targhi', color: '#C62828', desc: 'Tuareg blues' },
  { name: 'Andalous', color: '#F5A623', desc: 'Moorish heritage' },
];

export const formatCount = (n) => {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
};
