// ===== PODCASTS (20) =====
export const PODCASTS = [
  { id: 'pod-1', title: 'Sawt Eddarja', host: 'Amine B.', language: 'Darija', episodes: 89, image: 'https://picsum.photos/seed/darja/400/400', color: '#D32F2F', category: 'Culture', desc: 'Exploring Algerian identity through the Darija dialect.' },
  { id: 'pod-2', title: 'Kabyle Roots', host: 'Sami L.', language: 'Kabyle/English', episodes: 64, image: 'https://picsum.photos/seed/kabyles/400/400', color: '#E65100', category: 'Culture', desc: 'Kabyle culture, language, music, and traditions.' },
  { id: 'pod-3', title: 'Algerian Stories', host: 'Fatima Z.', language: 'English', episodes: 42, image: 'https://picsum.photos/seed/algerianstories/400/400', color: '#7B1FA2', category: 'Culture', desc: 'Untold stories from Algerian history.' },
  { id: 'pod-4', title: 'Algerie Demain', host: 'Sarah K.', language: 'French', episodes: 156, image: 'https://picsum.photos/seed/algeriedemain/400/400', color: '#1565C0', category: 'News/Politics', desc: 'Algerian news decoded. Politics, economy, society.' },
  { id: 'pod-5', title: 'North Africa Brief', host: 'James R.', language: 'English', episodes: 78, image: 'https://picsum.photos/seed/northafrica/400/400', color: '#1E88E5', category: 'News/Politics', desc: 'Weekly North African politics and geopolitics.' },
  { id: 'pod-6', title: 'Qisas Jazairiya', host: 'Karim D.', language: 'Arabic', episodes: 112, image: 'https://picsum.photos/seed/qisas/400/400', color: '#C9A04A', category: 'Storytelling', desc: 'Algerian stories, folklore, and oral tradition.' },
  { id: 'pod-7', title: 'Sahara Tales', host: 'Youssef T.', language: 'English/Arabic', episodes: 38, image: 'https://picsum.photos/seed/saharavoice/400/400', color: '#C8A45C', category: 'Storytelling', desc: 'Bedouin stories from the Sahara.' },
  { id: 'pod-8', title: 'Rai Stories', host: 'Nadia M.', language: 'French/English', episodes: 45, image: 'https://picsum.photos/seed/raistory/400/400', color: '#8B0000', category: 'Music', desc: 'The untold history of Rai music.' },
  { id: 'pod-9', title: 'Chaabi Cafe', host: 'Farid C.', language: 'Arabic', episodes: 56, image: 'https://picsum.photos/seed/chaabicipod/400/400', color: '#006B3F', category: 'Music', desc: 'Chaabi music from El Anka to modern masters.' },
  { id: 'pod-10', title: 'Gnawa Grooves', host: 'Hassan M.', language: 'English', episodes: 28, image: 'https://picsum.photos/seed/gnawapod/400/400', color: '#C8A45C', category: 'Music', desc: 'Exploring spiritual music of the Gnawa.' },
  { id: 'pod-11', title: 'El Bahdja Show', host: 'Meriem & Hakim', language: 'Darija', episodes: 203, image: 'https://picsum.photos/seed/bahdjapod/400/400', color: '#D32F2F', category: 'Entertainment', desc: 'Algiers favorite morning show.' },
  { id: 'pod-12', title: 'DZ Night Show', host: 'Rachid L.', language: 'Darija/French', episodes: 167, image: 'https://picsum.photos/seed/dznight/400/400', color: '#F5A623', category: 'Entertainment', desc: 'Late night talk show with Algerian celebrities.' },
  { id: 'pod-13', title: 'Tech Dzair', host: 'Rayan H.', language: 'French/Darija', episodes: 72, image: 'https://picsum.photos/seed/techdz/400/400', color: '#00ACC1', category: 'Technology', desc: 'Tech in Algeria and beyond.' },
  { id: 'pod-14', title: 'Sport Dz', host: 'Rachid O.', language: 'Arabic/French', episodes: 134, image: 'https://picsum.photos/seed/sportdz/400/400', color: '#F5A623', category: 'Sports', desc: 'Algerian sports talk.' },
  { id: 'pod-15', title: 'DZ Esports', host: 'Ilyes K.', language: 'English/Arabic', episodes: 34, image: 'https://picsum.photos/seed/dzesports/400/400', color: '#4CAF50', category: 'Technology', desc: 'Algerian gaming and esports.' },
  { id: 'pod-16', title: 'Tafseer Al Quran', host: 'Sheikh Noureddine', language: 'Arabic', episodes: 312, image: 'https://picsum.photos/seed/tafseer/400/400', color: '#2E7D32', category: 'Religious', desc: 'Weekly Quranic tafseer and Islamic teachings.' },
  { id: 'pod-17', title: 'History of the Maghreb', host: 'Dr. Amina B.', language: 'French', episodes: 67, image: 'https://picsum.photos/seed/maghrebhist/400/400', color: '#5D4037', category: 'Education', desc: 'Maghreb history from antiquity to independence.' },
  { id: 'pod-18', title: 'Tamazight Lessons', host: 'Djamila S.', language: 'Kabyle/French', episodes: 94, image: 'https://picsum.photos/seed/tamazightless/400/400', color: '#E65100', category: 'Education', desc: 'Learn Tamazight from scratch.' },
  { id: 'pod-19', title: 'Algerian Cuisine', host: 'Nora H.', language: 'English', episodes: 48, image: 'https://picsum.photos/seed/algeriancuisine/400/400', color: '#FF6F00', category: 'Lifestyle', desc: 'Couscous, tajines, pastries, and street food.' },
  { id: 'pod-20', title: 'DZ Entrepreneurship', host: 'Mehdi F.', language: 'French/English', episodes: 56, image: 'https://picsum.photos/seed/dzentrep/400/400', color: '#1565C0', category: 'Business', desc: 'Algerian founders, investors, and business leaders.' },
];

// ===== GENERATE PODCAST EPISODES =====
const PODCAST_EPISODE_TITLES = {
  'pod-1': ['The Meaning of Algerian Identity', 'Darija Expressions You Need', 'Algiers Through the Ages', 'Street Food Stories', 'The Art of Algerian Tea', 'Ramadan in Algiers', 'Wedding Traditions', 'Old City Tales', 'Music and Memory', 'The Last Hammam'],
  'pod-2': ['Kabyle Traditions', 'Amazigh New Year', 'The Legend of Lalla Setti', 'Mountain Villages', 'Kabyle Jewelry', 'Olive Harvest Season', 'Oral Poetry', 'Berber Kings', 'Tizi Ouzou Market', 'Taqbaylit Language'],
  'pod-3': ["L'Algérie face aux défis", 'Réformes économiques', 'La Société Civile', 'Énergie et Transition', 'Diplomatie Maghrébine', 'Jeunesse et Emploi', 'Système de Santé', 'Éducation Nationale', 'Médias et Liberté', 'Investissement Étranger'],
  'pod-4': ['أسطورة وهران', 'مدينة الأشباح', 'كنوز الصحراء', 'الرجل الذي تحدى', 'حكاية القصبة', 'سلاطين الزمن', 'المرأة الثائرة', 'الطريق إلى تيمقاد', 'أمير المؤمنين', 'البحر والملح'],
  'pod-5': ['Cheb Hasni Story', 'The Oran Sound', 'Women of Rai', 'Rai and Politics', 'From Cassette to Streaming', 'Cheb Khaled Interview', 'Rai Wedding Special', 'The Underground Scene', 'Rai in Paris', 'New Generation'],
  'pod-6': ['Diwan Music Origins', 'Tuareg Blue', 'The Camel Caravan', 'Tamanrasset Nights', 'Desert Poetry', 'Gnawa Trance', 'Saharan Wedding', 'Oasis Life', 'Sand and Strings', 'The Hoggar Mountains'],
  'pod-7': ['Morning Laughs', 'Guest: Cheb Bilal', 'Algiers Comedy Night', 'Street Interviews', 'Phone Pranks', 'Celebrity Q&A', 'Music Hour', 'Listener Stories', 'Weekend Special', 'Behind the Scenes'],
  'pod-8': ['Startup Funding', 'Yassir Success Story', 'AI in Algeria', 'Remote Work', 'E-commerce Boom', 'Digital Payment', 'Algerian Unicorns', 'Tech Education', 'Freelancing Tips', 'Future of Work'],
  'pod-9': ['El Anka Legacy', 'The Mandole', 'Chaabi Poetry', 'Ya Rayah History', 'Amar Ezzahi Style', 'Algiers Schools', 'Modern Chaabi', 'Wedding Chaabi', 'The Qacidates', 'Chaabi Masters'],
  'pod-10': ['Algeria vs Egypt Preview', 'Mahrez Interview', 'Boxing in Algeria', 'African Cup Review', 'Women\'s Football', 'Olympic Hopes', 'Transfer Window', 'Youth Academies', 'Algerian Derby', 'Manager Analysis'],
};

const EPISODE_DURATIONS = ['28:22','34:15','41:08','25:44','38:52','31:30','45:12','22:18','36:44','29:55'];

export const PODCAST_EPISODES = [];
Object.entries(PODCAST_EPISODE_TITLES).forEach(([podId, titles]) => {
  const pod = PODCASTS.find(p => p.id === podId);
  titles.forEach((title, i) => {
    PODCAST_EPISODES.push({
      id: `pep-${podId}-${i}`,
      title,
      podcast: pod?.title || 'Unknown',
      podcastId: podId,
      host: pod?.host || '',
      duration: EPISODE_DURATIONS[i % EPISODE_DURATIONS.length],
      date: `2026-0${Math.min(6, 1 + Math.floor((i+1)/2))}-${String(10 + i * 2).padStart(2, '0')}`,
      image: `https://picsum.photos/seed/${podId}ep${i}/300/170`,
      desc: `Episode ${i+1} of ${pod?.title}. Join ${pod?.host} for an exploration of ${title.toLowerCase()}.`,
    });
  });
});

export const getEpisodesForPodcast = (podcastId) => PODCAST_EPISODES.filter(e => e.podcastId === podcastId);

export const getPodcastById = (id) => PODCASTS.find(p => p.id === id);
