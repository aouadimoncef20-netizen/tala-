// ===== ARTISTS =====
export const ARTISTS = [
  { id: 'khaled', name: 'Cheb Khaled', genre: 'Rai', image: 'https://picsum.photos/seed/khaled/400/400', color: '#D32F2F', followers: '12.5M', desc: 'The King of Rai. Didi, AÃ¯cha, C\'est la Vie — international icon.' },
  { id: 'cheb-hasni', name: 'Cheb Hasni', genre: 'Rai', image: 'https://picsum.photos/seed/hasni/400/400', color: '#8B0000', followers: '8.2M', desc: 'The Prince of Rai. Emotional love songs, tragic story, immortal legacy.' },
  { id: 'cheb-mami', name: 'Cheb Mami', genre: 'Rai', image: 'https://picsum.photos/seed/mami/400/400', color: '#C2185B', followers: '6.8M', desc: 'Algerian Rai pioneer who brought the sound to the world stage.' },
  { id: 'zahouania', name: 'Cheba Zahouania', genre: 'Rai', image: 'https://picsum.photos/seed/zahouania/400/400', color: '#AD1457', followers: '4.5M', desc: 'Iconic female Rai voice. Powerful vocals, breaking barriers.' },
  { id: 'bilal', name: 'Cheb Bilal', genre: 'Rai', image: 'https://picsum.photos/seed/bilal/400/400', color: '#E91E63', followers: '3.8M', desc: 'Modern Rai sensation. Traditional meets pop and electronic.' },
  { id: 'cheb-rimi', name: 'Cheb Rimi', genre: 'Rai', image: 'https://picsum.photos/seed/rimi/400/400', color: '#FF6F00', followers: '2.7M', desc: 'Oran-based Rai star. Energetic live shows, modern Rai hits.' },
  { id: 'cheb-akil', name: 'Cheb Akil', genre: 'Rai', image: 'https://picsum.photos/seed/akil/400/400', color: '#C62828', followers: '2.1M', desc: 'Contemporary Rai with traditional roots and modern beats.' },
  { id: 'el-anka', name: 'El Hadj El Anka', genre: 'Chaabi', image: 'https://picsum.photos/seed/anka/400/400', color: '#006B3F', followers: '3.2M', desc: 'Grandfather of Chaabi. Master of mandole, founder of modern Chaabi.' },
  { id: 'harrachi', name: 'Dahmane El Harrachi', genre: 'Chaabi', image: 'https://picsum.photos/seed/harrachi/400/400', color: '#2E7D32', followers: '2.8M', desc: 'Legendary Chaabi voice. Ya Rayah is an international anthem.' },
  { id: 'amar', name: 'Amar Ezzahi', genre: 'Chaabi', image: 'https://picsum.photos/seed/amar/400/400', color: '#388E3C', followers: '1.9M', desc: 'Master poet of Chaabi. Lyrical depth and distinctive vocal style.' },
  { id: 'boudjema', name: 'Boudjema El Ankis', genre: 'Chaabi', image: 'https://picsum.photos/seed/boudjema/400/400', color: '#1B5E20', followers: '1.5M', desc: 'Powerful Chaabi voice with decades of tradition and mastery.' },
  { id: 'idir', name: 'Idir', genre: 'Kabyle', image: 'https://picsum.photos/seed/idir/400/400', color: '#F5A623', followers: '4.1M', desc: 'Voice of Kabylie. A Vava Inouva brought Amazigh music worldwide.' },
  { id: 'lounis', name: 'Lounis Ait Menguellet', genre: 'Kabyle', image: 'https://picsum.photos/seed/lounis/400/400', color: '#E65100', followers: '3.5M', desc: 'Poet and singer. Among the greatest Kabyle artists of all time.' },
  { id: 'matoub', name: 'Matoub Lounes', genre: 'Kabyle', image: 'https://picsum.photos/seed/matoub/400/400', color: '#C62828', followers: '2.9M', desc: 'Rebel poet. Assassinated for his activism. Symbol of Amazigh identity.' },
  { id: 'taos', name: 'Taos Amrouche', genre: 'Kabyle / Traditional', image: 'https://picsum.photos/seed/taos/400/400', color: '#7B1FA2', followers: '1.2M', desc: 'First Algerian woman novelist. Preserved Kabyle oral traditions.' },
  { id: 'lotfi-dz', name: 'Lotfi Double Kanon', genre: 'Rap Dz', image: 'https://picsum.photos/seed/lotfi/400/400', color: '#00ACC1', followers: '3.4M', desc: 'Algerian rap pioneer. Politically charged lyrics, underground legend.' },
  { id: 'didine', name: 'Didine Canon 16', genre: 'Rap Dz', image: 'https://picsum.photos/seed/didine/400/400', color: '#00838F', followers: '2.8M', desc: 'Rapper blending traditional sounds with modern hip-hop energy.' },
  { id: 'tiba', name: 'Tiba', genre: 'Rap Dz', image: 'https://picsum.photos/seed/tiba/400/400', color: '#006064', followers: '1.9M', desc: 'Female Algerian rapper. Powerful voice breaking barriers.' },
  { id: 'tamtam', name: 'Tam Tam', genre: 'Diwan', image: 'https://picsum.photos/seed/tamtam/400/400', color: '#C8A45C', followers: '1.1M', desc: 'Saharan Diwan group. Masters of traditional Gnawa rhythms.' },
  { id: 'groupe-douli', name: 'Groupe Douli', genre: 'Targui', image: 'https://picsum.photos/seed/douli/400/400', color: '#C62828', followers: '890K', desc: 'Tuareg blues ensemble from Tamanrasset. Desert blues electric.' },
];

export const getArtistById = (id) => ARTISTS.find(a => a.id === id);

export const FEATURED_SECTIONS = [
  { title: 'Classic Rai', items: ARTISTS.filter(a => a.genre === 'Rai').slice(0, 5) },
  { title: 'Chaabi & Tradition', items: ARTISTS.filter(a => a.genre === 'Chaabi') },
  { title: 'Kabyle / Amazigh', items: ARTISTS.filter(a => a.genre?.includes('Kabyle')) },
];
