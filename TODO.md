# 🎧 Tala — Platform Roadmap

> **Current version:** v0.4 — 1k+ tracks, 20 artists, detail pages, full player
> **Stack:** React 19, react-scripts, CSS (no frameworks)
> **Content:** 20 artists · 200+ albums · **1,048 tracks** · 20 radio stations · 20 podcasts · 8 genres

---

## ✅ Phase 1 — Core Audio & Navigation (Complete)

### 1.1 Real Audio Playback
- [x] Audio engine with real `<audio>` element + simulated fallback
- [x] Auto-play next from queue on track end
- [x] Volume control + mute toggle
- [x] Keyboard shortcuts: Space, ←, →, M, Escape

### 1.2 Artist Detail Page
- [x] `ArtistDetail.jsx` — hero image, bio, stats, tracks, albums, related artists
- [x] Click any artist from Home → full detail page
- [x] Back button in header to return

### 1.3 Album Detail Page
- [x] `AlbumDetail.jsx` — cover art, year, tracklist, artist link
- [x] "Play Album" button
- [x] Artist name navigates to artist page

### 1.4 Full-Screen Player
- [x] `FullPlayer.jsx` — overlay with spinning art, big controls, skip 15/30, speed toggle
- [x] Volume slider + mute
- [x] Queue panel with upcoming tracks + remove
- [x] Triggered by clicking player bar left section
- [x] Escape key / X button closes
- [x] Backdrop blur effect

---

## 🟡 Phase 2 — Polish & UX (Complete ✅)

### 2.1 Loading Skeletons
- [x] Created `Skeleton.jsx` with `SkeletonCard`, `SkeletonRow`, `SkeletonHero`, `SkeletonGrid`
- [x] Animated with shimmer CSS keyframes
- [x] Ready to wrap any component

### 2.2 Responsive Layout
- [x] Breakpoints at 1024px, 768px, 480px
- [x] `< 1024px`: sidebar collapses to icon-only
- [x] `< 768px`: sidebar hidden, cards smaller, player simplified
- [x] `< 480px`: compact controls, hide non-essential UI

### 2.3 Dedicated Search Results
- [x] `SearchResults.jsx` — tabs: "Tracks | Artists | Podcasts"
- [x] Debounce via state, highlight matching text
- [x] "No results" illustration
- [x] Search in header navigates to search view on type

### 2.4 Queue Panel
- [x] `QueuePanel.jsx` — current track + upcoming list
- [x] Remove button per item
- [x] "Clear queue" button
- [x] "Play now" per item

---

## 🟢 Phase 3 — Features (Complete ✅)

### 3.1 Playlist System
- [x] Create playlist modal with name input
- [x] localStorage persistence
- [x] `PlaylistView.jsx` — view, open, delete playlists
- [x] Playlist cards on the home screen
- [x] Sidebar link to playlists

### 3.2 Sleep Timer
- [x] 15/30/45/60 min options in full-screen player
- [x] Countdown in player bar
- [x] Auto-pause when timer hits 0
- [x] Cancel button

### 3.3 Image Error Fallback
- [x] `SafeImage.jsx` wrapper component
- [x] Fallback to gradient + initials on error
- [x] Color hash from alt text

### 3.4 Like / History Persistence
- [x] `useLocalStorage` hook — saves likes across sessions
- [x] Used for `likedTracks` state

---

## 📦 Phase 4 — Content (Complete)

### 4.1 Content Library
- [x] 20 artists (Rai, Chaabi, Kabyle, Rap Dz, Diwan, Targui)
- [x] **1,048 tracks** across all genres (auto-generated from title pools)
- [x] **200+ albums** (6-12 per artist)
- [x] 20 radio stations (national, regional, music, youth, cultural)
- [x] 20 podcasts (culture, news, stories, music, tech, sports, education, business)
- [x] 8 genres with color coding

---

## 📁 Files Summary

| File | Status | Purpose |
|------|--------|---------|
| `src/App.jsx` | ✅ Built | Core state, audio, keyboard shortcuts |
| `src/App.css` | ✅ Built | Design system variables, layout |
| `src/data/athir-data.js` | ✅ Built | All content data with generators |
| `src/components/Sidebar.jsx` | ✅ Built | Right nav with stats, recent, footer |
| `src/components/Header.jsx` | ✅ Built | Search bar, page title, user avatar |
| `src/components/HomeView.jsx` | ✅ Built | Hero + trending + cards layout |
| `src/components/ExploreView.jsx` | ✅ Built | Genre filter + browse |
| `src/components/RadioView.jsx` | ✅ Built | Live radio stations |
| `src/components/PodcastView.jsx` | ✅ Built | Podcast browser + episode drill-down |
| `src/components/LibraryView.jsx` | ✅ Built | Favorites / Podcasts / Recent tabs |
| `src/components/PlayerBar.jsx` | ✅ Built | Bottom player with controls |
| `src/components/ArtistDetail.jsx` | ✅ Built | Artist bio, tracks, albums, related |
| `src/components/AlbumDetail.jsx` | ✅ Built | Album track listing |
| `src/components/FullPlayer.jsx` | ✅ Built | Full-screen overlay player |
| `src/components/Skeleton.jsx` | ❌ Todo | Loading skeletons |
| `src/components/SearchResults.jsx` | ❌ Todo | Dedicated search page |
| `src/components/QueuePanel.jsx` | ❌ Todo | Upcoming tracks panel |
| `src/components/PlaylistView.jsx` | ❌ Todo | User playlists |
| `src/components/SafeImage.jsx` | ❌ Todo | Image error fallback |
| `src/hooks/useLocalStorage.js` | ❌ Todo | Persistent state hook |

---

## 🎯 Recommended Build Order

```
Phase 2 first → Skeleton → Responsive → Search → Queue
then
Phase 3 → Playlists → SleepTimer → SafeImage → Persistence
```

**Next best win:** Loading skeletons (2.1) — makes the app feel instantly polished.
