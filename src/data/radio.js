// ===== RADIO STATIONS (20) =====
export const RADIO_STATIONS = [
  { id: 'radio-1', name: 'Radio Algerienne', freq: 'Chaine 1', language: 'Arabic', image: 'https://picsum.photos/seed/chaine1/300/300', color: '#006B3F', listeners: '2.5M', category: 'General' },
  { id: 'radio-2', name: 'Chaine 2', freq: '94.2 FM', language: 'Kabyle/Amazigh', image: 'https://picsum.photos/seed/chaine2/300/300', color: '#E65100', listeners: '1.8M', category: 'Cultural' },
  { id: 'radio-3', name: 'Chaine 3', freq: 'FM', language: 'French', image: 'https://picsum.photos/seed/chaine3/300/300', color: '#1565C0', listeners: '1.2M', category: 'News' },
  { id: 'radio-4', name: 'Radio Coran', freq: '90.5 FM', language: 'Arabic', image: 'https://picsum.photos/seed/coran/300/300', color: '#2E7D32', listeners: '3.1M', category: 'Religious' },
  { id: 'radio-5', name: 'Radio El Bahdja', freq: '87.6 FM', language: 'Arabic', image: 'https://picsum.photos/seed/bahdja/300/300', color: '#D32F2F', listeners: '1.5M', category: 'Music' },
  { id: 'radio-6', name: 'Radio Jil FM', freq: '93.5 FM', language: 'Arabic/French', image: 'https://picsum.photos/seed/jilfm/300/300', color: '#F5A623', listeners: '2.2M', category: 'Youth/Music' },
  { id: 'radio-7', name: 'Radio Oran', freq: '92.1 FM', language: 'Arabic', image: 'https://picsum.photos/seed/oran/300/300', color: '#C9A04A', listeners: '980K', category: 'Regional' },
  { id: 'radio-8', name: 'Radio Constantine', freq: '91.3 FM', language: 'Arabic', image: 'https://picsum.photos/seed/constantine/300/300', color: '#7B1FA2', listeners: '850K', category: 'Regional' },
  { id: 'radio-9', name: 'Radio Tizi Ouzou', freq: '93.8 FM', language: 'Kabyle', image: 'https://picsum.photos/seed/tizi/300/300', color: '#00838F', listeners: '720K', category: 'Regional' },
  { id: 'radio-10', name: 'Radio Oasis', freq: '89.4 FM', language: 'Arabic/Targui', image: 'https://picsum.photos/seed/oasis/300/300', color: '#C8A45C', listeners: '450K', category: 'Regional/Cultural' },
  { id: 'radio-11', name: 'Radio Annaba', freq: '95.2 FM', language: 'Arabic', image: 'https://picsum.photos/seed/annaba/300/300', color: '#1E88E5', listeners: '580K', category: 'Regional' },
  { id: 'radio-12', name: 'Radio Setif', freq: '88.7 FM', language: 'Arabic/Chaoui', image: 'https://picsum.photos/seed/setif/300/300', color: '#43A047', listeners: '620K', category: 'Regional' },
  { id: 'radio-13', name: 'Radio Rai', freq: '96.4 FM', language: 'Arabic/Darija', image: 'https://picsum.photos/seed/radiorai/300/300', color: '#D32F2F', listeners: '1.7M', category: 'Music' },
  { id: 'radio-14', name: 'Chaabi FM', freq: '91.8 FM', language: 'Arabic', image: 'https://picsum.photos/seed/chaabifm/300/300', color: '#006B3F', listeners: '1.3M', category: 'Music' },
  { id: 'radio-15', name: 'Sahara FM', freq: '88.1 FM', language: 'Arabic/Targui', image: 'https://picsum.photos/seed/saharafm/300/300', color: '#C8A45C', listeners: '380K', category: 'Cultural' },
  { id: 'radio-16', name: 'Radio Culturelle', freq: '97.3 FM', language: 'French/Arabic', image: 'https://picsum.photos/seed/culturelle/300/300', color: '#1565C0', listeners: '650K', category: 'Cultural' },
  { id: 'radio-17', name: 'Algiers Jazz FM', freq: '99.1 FM', language: 'French', image: 'https://picsum.photos/seed/jazzfm/300/300', color: '#6A1B9A', listeners: '290K', category: 'Music' },
  { id: 'radio-18', name: 'DZ Rap Radio', freq: 'Digital', language: 'Arabic/French', image: 'https://picsum.photos/seed/dzrap/300/300', color: '#00ACC1', listeners: '520K', category: 'Youth' },
  { id: 'radio-19', name: 'Radio Student', freq: '98.6 FM', language: 'Arabic/French', image: 'https://picsum.photos/seed/student/300/300', color: '#F5A623', listeners: '410K', category: 'Youth' },
  { id: 'radio-20', name: 'Tamazight FM', freq: 'Digital', language: 'Kabyle/Chaoui', image: 'https://picsum.photos/seed/tamazightfm/300/300', color: '#E65100', listeners: '350K', category: 'Cultural' },
];

export const getRadioById = (id) => RADIO_STATIONS.find(r => r.id === id);
