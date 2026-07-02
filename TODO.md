# 🚀 Tala — Master Roadmap v2.0

> **Current:** React 19 · All static data · Simulated audio · No backend  
> **Content:** 20 artists · 200+ albums · 1,048 tracks · 20 radio · 20 podcasts · 8 genres  
> **Built:** Full player · Playlists · Sleep timer · Search · Likes · Themes · Responsive  

---

## 🔑 Priority Key

| Icon | Meaning |
|------|---------|
| 🟢 P0 | **Critical** — core experience blocker, do first |
| 🟡 P1 | **High** — major feature, big user impact |
| 🔵 P2 | **Medium** — polish, nice-to-have, compound value |
| ⚪ P3 | **Low** — future, experimental, when everything else works |

---

# 📋 COMPLETE TASK LIST

---

## 🏆 PHASE 0 — Foundation Upgrades (P0)

> These unlock everything else. Without them, the app is a beautiful demo.

### 0.1 🔧 Migrate from CRA to Vite

- [ ] Create Vite + React scaffold
- [ ] Move `public/` assets to Vite `public/`
- [ ] Convert `import` paths, env vars (`REACT_APP_` → `VITE_`)
- [ ] Replace `react-scripts` scripts in `package.json`
- [ ] Test dev server HMR works
- [ ] Test `npm run build` produces smaller output

**Effort:** 2-3 hrs · **Dependency:** None · **Why:** CRA is EOL. Vite is 10× faster, smaller bundles

### 0.2 🎵 Real Audio Streaming Engine

- [ ] Set up audio hosting (Cloudinary / S3 + CloudFront / Firebase Storage)
- [ ] Generate or source ~50 actual MP3 demo files (30s clips min)
- [ ] Replace `athir-data.js` track URLs from picsum to real audio URLs
- [ ] Remove `generateTone()` from `LazyImage.jsx`
- [ ] Rewrite `App.jsx` audio `useEffect` — real `<audio>` with proper `src`
- [ ] Add preloading: `preload="auto"` on next track
- [ ] Add gapless playback: pre-buffer next track before current ends
- [ ] Add crossfade: 2-3s audio overlap when transitioning tracks
- [ ] Add `AudioContext` visualizer for waveform/equalizer
- [ ] Handle network errors: retry logic + fallback message
- [ ] Add audio quality selector (Low 128k / Medium 192k / High 320k)
- [ ] Show real loading state while audio buffers

**Effort:** 8-12 hrs · **Dependency:** 0.1 · **Why:** The single biggest UX leap — turns simulation into real music

### 0.3 🗄️ Backend — Database + API

- [ ] Choose stack: **Supabase** (easier) or **Node.js + Express + PostgreSQL** (more control)
- [ ] Design database schema:
  - `users` (id, email, name, avatar, created_at)
  - `tracks` (id, title, artist_id, album_id, duration, audio_url, image_url, genre)
  - `artists` (id, name, bio, image, genre, followers_count)
  - `albums` (id, title, artist_id, year, image)
  - `playlists` (id, user_id, name, description, is_public, created_at)
  - `playlist_tracks` (id, playlist_id, track_id, position, added_at)
  - `likes` (id, user_id, track_id, created_at)
  - `listening_history` (id, user_id, track_id, listened_at, duration_played)
- [ ] Seed database with current `athir-data.js` content
- [ ] Build REST API endpoints (or Supabase client queries):
  - `GET /api/tracks` — paginated, filterable by genre/artist
  - `GET /api/tracks/:id` — single track
  - `GET /api/artists` — paginated
  - `GET /api/artists/:id` — with tracks + albums
  - `GET /api/albums/:id` — with tracklist
  - `GET /api/search?q=` — full-text search across tracks/artists/albums
  - `POST /api/auth/register` + `POST /api/auth/login`
  - CRUD for playlists, likes, history (authenticated)
- [ ] Add rate limiting + CORS headers

**Effort:** 16-24 hrs · **Dependency:** 0.1 · **Why:** Backend is the foundation for auth, sync, personalization, and scaling beyond static data

### 0.4 🔐 User Authentication

- [ ] Build sign-up / login page (email + password or Google OAuth)
- [ ] JWT token or Supabase session management
- [ ] Protected routes — guest can browse but can't save
- [ ] Guest mode: works without login, prompts to save on first like/playlist
- [ ] User menu dropdown: Profile, Settings, Logout
- [ ] Password reset flow

**Effort:** 4-6 hrs · **Dependency:** 0.3 · **Why:** Everything social/personalized needs user identity

---

## 🎨 PHASE 1 — UI/UX Overhaul (P0/P1)

### 1.1 🖼️ Visual Design Polish

- [ ] **Glass-morphism cards** — add `backdrop-filter: blur()` to hover states
- [ ] **Micro-interactions:** button press scale(0.96), ripple on click, smooth tab switches
- [ ] **Scroll-triggered parallax** on hero banner (subtle, 10px offset)
- [ ] **Vinyl spin** on player bar album art (not just full-player)
- [ ] **Animated page transitions** — route changes fade/slide between views
- [ ] **Gradient accent borders** on active elements (current track, selected tab)
- [ ] **Tooltips** on all icon-only buttons
- [ ] **Context menus** — right-click or long-press on tracks: "Add to Playlist", "Play Next", "Share"
- [ ] **Toast redesign** — slide-in from bottom, auto-dismiss, stacking

**Effort:** 8-12 hrs · **Dependency:** None · **Why:** Makes the app feel premium immediately, no backend needed

### 1.2 📱 Mini-Player Mode

- [ ] Create draggable floating mini-player when scrolling (like Spotify's)
- [ ] Stick to bottom-right corner, small circular art + title + play/pause
- [ ] Click to expand to full player
- [ ] Animate between mini and full player (shared element transition)

**Effort:** 2-3 hrs · **Dependency:** None · **Why:** Keeps playback accessible while browsing

### 1.3 🎨 Drag-and-Drop Playlist Builder

- [ ] Convert playlist track list to drag-and-drop (HTML5 DnD API or react-dnd)
- [ ] Drag handle icon on each row
- [ ] Animate reordering
- [ ] "Drop here to add" zone in playlist view
- [ ] Drag from search/explore results directly into playlist
- [ ] Persist order to backend/localStorage

**Effort:** 4-6 hrs · **Dependency:** 0.3 (for persistence) · **Why:** Playlists are the core user action — make it tactile

### 1.4 🎤 Synced Lyrics Panel

- [ ] Create lyrics data format (`{timestamp: "MM:SS", text: ""}` array)
- [ ] Build `LyricsPanel.jsx` component
- [ ] Highlight current line in sync with playback
- [ ] Auto-scroll to current line
- [ ] Fetch lyrics from API or local static data
- [ ] Toggle lyrics view in full player

**Effort:** 4-6 hrs · **Dependency:** 0.2 (real audio with accurate timing) · **Why:** Huge engagement feature, keeps users on screen

### 1.5 🌍 RTL / Arabic Language Support

- [ ] Install i18n library (react-i18next or react-intl)
- [ ] Extract all hardcoded strings to translation JSON files
- [ ] Create Arabic translation (`ar.json`)
- [ ] Create French translation (`fr.json`)
- [ ] Create Tamazight translation (`ber.json`) — optional, Tifinagh script
- [ ] Language switcher in user menu
- [ ] Support RTL layout (mirrored sidebar, text alignment)
- [ ] Test with Arabic: everything reads right-to-left

**Effort:** 8-12 hrs · **Dependency:** None · **Why:** Huge audience in Algeria/North Africa — Arabic speakers are the primary market

### 1.6 ♿ Accessibility (WCAG AA)

- [ ] Audit current app with axe DevTools
- [ ] Add `aria-label` to all icon-only buttons
- [ ] Ensure keyboard navigation: Tab order, focus rings, enter/escape handling
- [ ] Add screen-reader announcements for: track changes, play/pause, likes
- [ ] Ensure color contrast ratios ≥ 4.5:1
- [ ] Add `prefers-reduced-motion` support
- [ ] Add focus trap in modals (FullPlayer, Premium)

**Effort:** 4-6 hrs · **Dependency:** None · **Why:** Legal requirement in many regions, and it's the right thing to do

---

## 🔍 PHASE 2 — Discovery & Personalization (P1)

### 2.1 🤖 AI Recommendation Engine

- [ ] Track listening history: store (user_id, track_id, timestamp, duration)
- [ ] Build recommendation logic:
  - **Collaborative filtering:** "Users who liked X also liked Y"
  - **Content-based:** same artist, same genre, same album
  - **Popularity:** trending tracks this week
  - **Fresh:** recently added tracks user hasn't played
- [ ] Create "For You" section on home page
- [ ] Create "Recommended" section in explore view
- [ ] Create "Fans Also Like" section on artist/album/track detail pages
- [ ] Create "Listen Again" — recently played tracks
- [ ] Cache recommendations (they don't change every millisecond)
- [ ] Cold-start: until user has history, show trending + random discovery

**Effort:** 12-16 hrs · **Dependency:** 0.3 (backend for history), 0.4 (auth for user identity) · **Why:** Personalization = retention. Turns a library into a discovery engine

### 2.2 🎧 Smart Radio Generator

- [ ] Create algorithm: given a seed track, find 20+ similar tracks
- [ ] Build "Start Radio" button on every track/artist/album
- [ ] Build infinite-scroll radio queue (adds tracks as you listen)
- [ ] Display "Now Playing: X Radio" in player
- [ ] Allow thumbs up/down to refine radio
- [ ] Save radio session as playlist

**Effort:** 6-8 hrs · **Dependency:** 2.1 (recommendation engine) · **Why:** One of Spotify's most-loved features

### 2.3 🌤️ Mood & Curated Playlists

- [ ] Create mood categories: "Morning ☀️", "Late Night 🌙", "Workout 💪", "Focus 🎯", "Chill 😌"
- [ ] Tag tracks with mood (can be automated by genre/speed)
- [ ] Auto-generate mood playlists from tags
- [ ] Create seasonal playlists: "Ramadan Nights 🌙", "Summer Festival 🎪", "Independence Day 🇩🇿"
- [ ] "New Music Friday" — weekly updated section
- [ ] "Throwback Thursday" — older tracks

**Effort:** 4-6 hrs · **Dependency:** 2.1 · **Why:** Curated discovery reduces choice paralysis

### 2.4 📊 Listening Stats Dashboard

- [ ] "Your Top Artists" — most played this month
- [ ] "Your Top Tracks" — most played
- [ ] "Listening Time" — total minutes this week/month/all-time
- [ ] "Genre Breakdown" — pie chart of listening habits
- [ ] "Day & Time" — when you listen most
- [ ] "Streak" — consecutive days with listening
- [ ] Share stats as image (optional)

**Effort:** 6-8 hrs · **Dependency:** 0.3 (history data) · **Why:** High shareability — users love their stats (see: Spotify Wrapped)

---

## 🌐 PHASE 3 — Community & Social (P1/P2)

### 3.1 👤 Artist Profiles (Expanded)

- [ ] Admin panel to manage artist pages
- [ ] Artist bio editor (rich text)
- [ ] Artist discography (album list with years)
- [ ] Upcoming concerts/events section
- [ ] Artist social links (Instagram, YouTube, Facebook)
- [ ] Follow artist button
- [ ] "New releases from artists you follow" feed

**Effort:** 6-8 hrs · **Dependency:** 0.3 · **Why:** Artists are the stars — give them a home

### 3.2 🤝 Collaborative Playlists

- [ ] "Make Collaborative" toggle on playlist
- [ ] Shareable link (copied to clipboard)
- [ ] Anyone with link can add/remove tracks
- [ ] Real-time sync via WebSockets or polling
- [ ] Show contributor avatars
- [ ] Activity log ("X added Y", "Z removed W")

**Effort:** 6-8 hrs · **Dependency:** 0.3, 3.1 · **Why:** Viral growth mechanic — share playlists with friends

### 3.3 🎧 Listening Parties

- [ ] Create party: pick a playlist, get shareable code
- [ ] Host controls: play, pause, skip, seek
- [ ] Guests sync to host's playback (WebSocket)
- [ ] Built-in chat room per party
- [ ] Party ends when host leaves
- [ ] "Party Mode" indicator in player

**Effort:** 12-16 hrs · **Dependency:** 0.2 (real audio with sync), 0.3 · **Why:** Social listening is sticky — harder to leave when friends are in

### 3.4 ⭐ Fan Reviews & Ratings

- [ ] Star rating (1-5) on albums
- [ ] Written reviews with character limit
- [ ] Upvote/downvote reviews
- [ ] Sort reviews by: most recent, most helpful
- [ ] Rating average displayed on album card
- [ ] Report inappropriate review button

**Effort:** 4-6 hrs · **Dependency:** 0.3 · **Why:** Community content builds engagement and SEO

### 3.5 📤 Share Integration

- [ ] Share track as link (copies to clipboard)
- [ ] Share to WhatsApp (direct `wa.me` link)
- [ ] Share to Facebook / Twitter / Telegram
- [ ] Share to Instagram Stories (if possible via API)
- [ ] Share playlist as link
- [ ] "Listen on Tala" embed card image (OG tags)

**Effort:** 2-4 hrs · **Dependency:** None · **Why:** Free organic growth — every share is a referral

---

## 📱 PHASE 4 — PWA & Mobile Experience (P1)

### 4.1 📲 Progressive Web App

- [ ] Create `manifest.json` with full app metadata
- [ ] Add high-res icons (192x192, 512x512)
- [ ] Add splash screen config
- [ ] Register service worker for offline support
- [ ] Cache static assets (CSS, JS, images) on first load
- [ ] Cache recently played tracks for offline playback
- [ ] Handle online/offline state transitions gracefully
- [ ] Add "Install" prompt for Android/Chrome
- [ ] Test on real mobile devices

**Effort:** 6-8 hrs · **Dependency:** 0.1 · **Why:** PWA = app-store-free distribution. Huge for emerging markets with limited data

### 4.2 📱 Touch Gestures

- [ ] Swipe left/right on player bar → skip track
- [ ] Swipe up on player bar → open full player
- [ ] Swipe down on full player → close to mini
- [ ] Long press on track row → context menu
- [ ] Pinch on album art → fullscreen art
- [ ] Pull-to-refresh on home/explore

**Effort:** 4-6 hrs · **Dependency:** None · **Why:** Mobile-native feel without building a native app

### 4.3 🔊 Background Audio (Mobile)

- [ ] Register audio playback with Media Session API
- [ ] Show track info in notification bar / lock screen
- [ ] Handle "play/pause/next/prev" from notification
- [ ] Handle audio focus (pause when another app plays)
- [ ] Keep playing when screen locks (PWA limitation — explore workarounds)
- [ ] Test on Android Chrome + iOS Safari

**Effort:** 4-6 hrs · **Dependency:** 4.1 · **Why:** Music app that stops when you switch tabs is broken

---

## 🛠️ PHASE 5 — Architecture & Performance (P1/P2)

### 5.1 ⚡ State Management Upgrade

- [x] Current: `useState` + prop drilling through 10+ component levels
- [ ] **Target:** Zustand or Jotai (lightweight, simple)
- [ ] Create stores:
  - `usePlayerStore` — currentTrack, isPlaying, queue, volume, speed
  - `useAuthStore` — user, token, login/logout actions
  - `useLibraryStore` — likes, playlists, history
  - `useUIStore` — theme, activeView, toasts, modals
- [ ] Remove prop drilling — components pull from stores directly
- [ ] Keep local state for UI-only things (hover, animation triggers)

**Effort:** 6-8 hrs · **Dependency:** None · **Why:** Cleaner code, fewer bugs, better performance. Do this before adding features

### 5.2 🧪 Testing

- [ ] Set up Vitest (CRA → Vite migration aligns with this)
- [ ] Unit tests for utility functions (formatDuration, fmt, search filter)
- [ ] Component tests for critical paths: PlayerBar, FullPlayer, Header
- [ ] Integration test: play a track → see it in player → like it → see in library
- [ ] Set up Playwright for E2E tests
- [ ] Add GitHub Actions CI: tests run on every PR

**Effort:** 8-12 hrs · **Dependency:** 0.1 · **Why:** Confidence to refactor. Without tests, every change is risky

### 5.3 📦 Bundle Optimization

- [ ] Analyze bundle with `vite-bundle-visualizer`
- [ ] Lazy-load routes: `React.lazy()` for each view
- [ ] Lazy-load FullPlayer and PremiumView (heavy components)
- [ ] Tree-shake unused dependencies
- [ ] Optimize images: WebP format, responsive srcsets
- [ ] Add `loading="lazy"` to all images below the fold
- [ ] Consider `IntersectionObserver` for viewport-based rendering

**Effort:** 4-6 hrs · **Dependency:** 0.1 · **Why:** Fast load times = better retention, better SEO, better conversion

### 5.4 🚀 Performance Profiling

- [ ] Profile with React DevTools Profiler
- [ ] Fix unnecessary re-renders (use `React.memo`, `useMemo`, `useCallback` wisely)
- [ ] Virtualize long lists (react-window for 1,000+ track lists)
- [ ] Debounce search input (already partially done, make explicit)
- [ ] Add loading states between route transitions
- [ ] Implement pagination for tracks (instead of loading all 1,048 at once)

**Effort:** 6-8 hrs · **Dependency:** None · **Why:** A music app should feel instant. Lag kills the vibe.

---

## 💰 PHASE 6 — Monetization (P2)

### 6.1 💳 Premium Subscription — Live

- [ ] Choose payment provider: Stripe (global) or PayTabs / CIB (Algeria-focused)
- [ ] Build `/api/subscriptions` endpoint
- [ ] Wire up `PremiumView.jsx` to real pricing + checkout
- [ ] Free tier: ad-supported, limited skips, no offline
- [ ] Premium tier ($3.99/mo): no ads, unlimited skips, high quality, offline
- [ ] Family tier ($6.99/mo): 6 accounts
- [ ] Trial period: 30 days free for new users
- [ ] Handle payment success → upgrade user immediately
- [ ] Handle payment failure → downgrade gracefully (no data loss)
- [ ] Premium badge on user avatar

**Effort:** 16-24 hrs · **Dependency:** 0.3, 0.4, 4.1 · **Why:** Revenue to sustain the platform

### 6.2 📢 Ad Integration (Free Tier)

- [ ] Integrate lightweight ad server (e.g., AdSense or custom)
- [ ] Audio ads: play 15-30s ad every 4th track
- [ ] Banner ads: non-intrusive sidebar or bottom banner
- [ ] Skip ad button → prompts upgrade
- [ ] Track ad impressions for reporting

**Effort:** 4-8 hrs · **Dependency:** 6.1 (complementary) · **Why:** Monetize the 90% who won't pay

---

## 🎪 PHASE 7 — Content Expansion (P2/P3)

### 7.1 📻 Live Radio — Real Streaming

- [ ] Integrate real radio streaming URLs (Shoutcast / Icecast)
- [ ] Replace simulated radio with actual live streams
- [ ] Show "Now Playing" metadata from radio stream (if available)
- [ ] Add radio station schedule ("Morning News at 8am", "Music Mix at noon")
- [ ] Record radio shows as podcasts (auto-archive)

**Effort:** 4-6 hrs · **Dependency:** 0.2 · **Why:** Radio is a primary use case in Algeria

### 7.2 🎤 More Content Partnerships

- [ ] Reach out to Algerian artists for official content
- [ ] Create artist submission form (let artists upload their own music)
- [ ] Moderation queue for submitted content
- [ ] Add 50 more tracks from emerging independent artists
- [ ] Add concert/live recordings
- [ ] Add instrumental/karaoke versions of popular tracks
- [ ] Add DJ mixes and continuous playlists

**Effort:** Ongoing · **Dependency:** 0.3 · **Why:** Content is king. More tracks = more engagement

### 7.3 🧑‍🤝‍🧑 User-Generated Content

- [ ] User profile customization (avatar, bio, display name)
- [ ] Public user profiles (see their public playlists)
- [ ] User-created playlists appear in search
- [ ] "Follow" other users
- [ ] User activity feed ("X liked Y", "Z created playlist W")
- [ ] Top listeners leaderboard (optional, gamification)

**Effort:** 8-12 hrs · **Dependency:** 0.3, 0.4 · **Why:** UGC = infinite content without the team creating it

---

## 🧪 PHASE 8 — Experimental / Future (P3)

### 8.1 🎨 Visualizer Modes

- [ ] **Spectrum analyzer** — frequency bars synced to audio
- [ ] **Circular visualizer** — pulsing rings around album art
- [ ] **Album art particle effect** — floating colors from palette
- [ ] **Music video mode** — if videos are available
- [ ] Visualizer selector in full player settings
- [ ] Performance: canvas-based, GPU-accelerated

**Effort:** 8-12 hrs · **Dependency:** 0.2 · **Why:** Visual eye candy — great for parties, screensavers, social sharing

### 8.2 🎧 Spatial Audio / 3D Sound

- [ ] Integrate WebXR or HRTF-based 3D audio
- [ ] "Room" presets: Studio, Hall, Outdoor, Bedroom
- [ ] Head-tracking via device motion API (if available)
- [ ] Bass boost / equalizer presets (already have skeleton for speed toggle)

**Effort:** 6-10 hrs · **Dependency:** 0.2 · **Why:** Differentiation — no other Algerian music app has this

### 8.3 🤖 AI Playlist Generator

- [ ] Text-to-playlist: "I want energetic Rai songs from the 90s"
- [ ] Use LLM (Claude API / OpenAI) to parse intent → search query
- [ ] "Create a playlist like this one" — clone + suggest alternatives
- [ ] "My daily mix" — auto-generated from listening habit

**Effort:** 6-8 hrs · **Dependency:** 2.1, external AI API · **Why:** Magic feature — "Wow, it made the perfect playlist"

### 8.4 🏆 Gamification

- [ ] Listening streaks (consecutive days)
- [ ] Badges: "Early Adopter", "Rai Fanatic", "1000 Tracks Played"
- [ ] Top 1% listener badges (per artist)
- [ ] Shareable "My Tala Year" recap (like Spotify Wrapped)
- [ ] Monthly listening challenge ("Listen to 50 different artists this month")

**Effort:** 6-8 hrs · **Dependency:** 0.3 (history data) · **Why:** Gamification drives daily active users

---

## 🐛 PHASE 9 — Quality & Bug Fixing (P0/P1)

> These are existing issues to fix, not new features.

- [ ] **`athir-data.js` is 44KB** — split into separate files by domain (artists.js, tracks.js, etc.)
- [ ] **Track duplicate IDs** — generator may produce collisions, add uniqueness check
- [ ] **Memory leak:** `audioRef.current` listener cleanup on unmount — verify it works
- [ ] **Sleep timer + queue** — when timer expires mid-track, next track shouldn't play
- [ ] **Header search debounce** — currently uses state, add explicit debounce (300ms)
- [ ] **Skeleton.css is unused** — HomeView doesn't use skeletons yet
- [ ] **Build error prevention** — update `react-scripts` to latest or migrate to Vite (see 0.1)
- [ ] **PlayerBar CSS:** `.player__progress-edge` is 2px — too thin, bump to 4px
- [ ] **QueuePanel.jsx** uses `onPlayItem` but props pass `onPlay` — verify alignment
- [ ] **Keyboard shortcuts** — ArrowLeft skips -15s but ArrowRight skips +30s, make consistent
- [ ] **PremiumView** is a static shell — add at least a price table while real payments are pending
- [ ] **404 fallback** — unknown routes should show a "not found" page, not blank

**Effort:** 4-8 hrs · **Dependency:** None · **Why:** Fixing bugs before adding features = professional software

---

# 📊 SUMMARY: Everything at a Glance

## By Phase

| Phase | Tasks | Est. Total | P0 | P1 | P2 | P3 |
|-------|-------|------------|----|----|----|----|
| **0 — Foundation** | 18 | 32-47 hrs | 18 | — | — | — |
| **1 — UI/UX** | 26 | 30-44 hrs | 8 | 12 | 6 | — |
| **2 — Discovery** | 19 | 28-36 hrs | — | 14 | 5 | — |
| **3 — Social** | 17 | 30-42 hrs | — | 10 | 7 | — |
| **4 — PWA/Mobile** | 13 | 14-20 hrs | — | 9 | 4 | — |
| **5 — Architecture** | 16 | 24-34 hrs | 4 | 8 | 4 | — |
| **6 — Monetization** | 10 | 20-32 hrs | — | 2 | 8 | — |
| **7 — Content** | 12 | 18-24 hrs | — | 2 | 6 | 4 |
| **8 — Experimental** | 14 | 26-38 hrs | — | — | — | 14 |
| **9 — Bug Fixes** | 12 | 4-8 hrs | 8 | 4 | — | — |

**Total:** ~157 actionable tasks · **Estimated effort:** 196-295 hours

## Top 10 Quick Wins (Do These First)

| # | Task | Est. | Impact | Phase |
|---|------|------|--------|-------|
| 1 | Fix 12 existing bugs (Phase 9) | 4-8h | 🐛 Quality | 9 |
| 2 | Drag-and-drop playlists | 4-6h | 🔥🔥🔥🔥 | 1.3 |
| 3 | Mini-player mode | 2-3h | 🔥🔥🔥🔥 | 1.2 |
| 4 | Vinyl spin on player bar art | 1h | 🔥🔥🔥 | 1.1 |
| 5 | Share integration (WhatsApp, etc.) | 2-4h | 🔥🔥🔥🔥 | 3.5 |
| 6 | PWA manifest + install prompt | 2-3h | 🔥🔥🔥🔥 | 4.1 |
| 7 | Touch gestures (swipe skip) | 2-3h | 🔥🔥🔥 | 4.2 |
| 8 | Mood playlists (static, no backend) | 2-3h | 🔥🔥🔥 | 2.3 |
| 9 | Tooltips + context menus | 2-4h | 🔥🔥 | 1.1 |
| 10 | Split athir-data.js into smaller files | 1h | 🔧 Cleanup | 9 |

## Dependencies Map

```
0.1 Vite
  ├── 0.2 Real Audio
  │    ├── 1.4 Lyrics Panel
  │    ├── 3.3 Listening Parties
  │    ├── 7.1 Real Radio
  │    └── 8.1 Visualizer
  ├── 0.3 Backend
  │    ├── 0.4 Auth
  │    │    ├── 2.1 Recommendations
  │    │    │    ├── 2.2 Smart Radio
  │    │    │    └── 2.3 Mood Playlists
  │    │    ├── 2.4 Stats Dashboard
  │    │    ├── 3.1 Artist Profiles
  │    │    │    └── 3.2 Collab Playlists
  │    │    ├── 3.4 Reviews
  │    │    ├── 6.1 Premium
  │    │    │    └── 6.2 Ads
  │    │    ├── 7.2 Content Partners
  │    │    └── 7.3 UGC
  │    ├── 1.3 DnD Playlists
  │    └── 8.4 Gamification
  ├── 4.1 PWA
  │    ├── 4.2 Touch Gestures
  │    └── 4.3 Background Audio
  └── 5.2 Testing
```

---

# 🚦 RECOMMENDED BUILD ORDER

If I were you, here's the exact order I'd build:

## Sprint 1 — Foundation (Week 1-2)
1. Fix all Phase 9 bugs (~4-8h)
2. Split `athir-data.js` into separate files (~1h)
3. Migrate CRA → Vite (~2-3h)
4. Quick wins: mini-player, vinyl spin, tooltips, share buttons (~6-10h)

## Sprint 2 — Real Audio (Week 3-4)
5. Source/host 50 real audio files (~4h)
6. Rewrite audio engine to play real MP3s (~6-8h)
7. Add preloading, crossfade, visualizer (~4-6h)

## Sprint 3 — Backend (Week 5-6)
8. Set up Supabase/PostgreSQL (~4-6h)
9. Build auth system (~4-6h)
10. Move data to database, build API (~8-12h)

## Sprint 4 — Personalization (Week 7-8)
11. Listening history + recommendations (~8-12h)
12. Smart radio + mood playlists (~6-8h)
13. Stats dashboard (~4-6h)

## Sprint 5 — Social (Week 9-10)
14. Collaborative playlists (~4-6h)
15. Listening parties (~8-12h)
16. Reviews, artist profiles, following (~6-8h)

## Sprint 6 — Monetization & Polish (Week 11-12)
17. PWA + offline (~6-8h)
18. Premium subscription (~8-12h)
19. Touch gestures + accessibility (~6-8h)
20. State management refactor + testing (~8-12h)

---

*"Tala" — Peaceful Audio. Built for Algeria, built for the world.* 🇩🇿🎵
