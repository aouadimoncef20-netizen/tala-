const LYRICS = {
  'khaled_0': [
    { t: 0, text: "♪ (Music intro)" },
    { t: 5, text: "Didi, didi, didi..." },
    { t: 10, text: "Ya didi, didi, didi..." },
    { t: 15, text: "Ana n'habek didi" },
    { t: 20, text: "Wenta n'habeni didi" },
    { t: 25, text: "Didi, didi, didi..." },
    { t: 30, text: "Ya didi, didi, didi..." },
    { t: 35, text: "Algérie, mon amour" },
    { t: 40, text: "Didi, didi, didi..." },
    { t: 50, text: "♪" },
  ],
  'khaled_1': [
    { t: 0, text: "♪" },
    { t: 8, text: "Aïcha, Aïcha..." },
    { t: 15, text: "Écoute-moi, Aïcha" },
    { t: 22, text: "Je t'aime, Aïcha" },
    { t: 30, text: "Dis-moi oui, Aïcha" },
    { t: 38, text: "Ma vie est à toi" },
    { t: 45, text: "Aïcha, Aïcha..." },
    { t: 55, text: "♪" },
  ],
  'idir_0': [
    { t: 0, text: "♪" },
    { t: 10, text: "A vava inouva..." },
    { t: 18, text: "A vava inouva..." },
    { t: 26, text: "A mmi, a mmi" },
    { t: 34, text: "Ur tettiliḍ ara" },
    { t: 42, text: "A vava inouva..." },
    { t: 52, text: "♪" },
  ],
};

[
  'cheb-hasni_0', 'cheb-mami_0', 'lotfi-dz_0', 'el-anka_0',
  'harrachi_0', 'bilal_0', 'zahouania_0', 'matoub_0',
  'lounis_0', 'didine_0',
].forEach(id => {
  LYRICS[id] = [
    { t: 0, text: "♪ (Music)" },
    { t: 8, text: "Ya rayaḥ..." },
    { t: 16, text: "Ya rayaḥ..." },
    { t: 24, text: "Win rayaḥ..." },
    { t: 32, text: "Ya msafer..." },
    { t: 40, text: "Rayaḥ, rayaḥ..." },
    { t: 50, text: "♪" },
  ];
});

/**
 * Get lyrics for a given track ID.
 * Track IDs are like "track_khaled_0" — strips the "track_" prefix
 * to look up the lyrics key "khaled_0".
 */
export const getLyricsForTrack = (trackId) => {
  if (!trackId) return null;
  const key = trackId.replace(/^track_/, '');
  return LYRICS[key] || null;
};

export default LYRICS;
