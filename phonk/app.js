import { parseYouTubeLink, youtubeEmbedUrl, youtubeSearchApiUrl } from './youtube.js';
import { SPOTIFY_PHONK_TRACKS } from './spotify-phonk-tracks.js';

export const SPEEDS = ['Normal/Clean', 'Slowed', 'Super Slowed', 'Mega Slowed', 'Ultra Slowed'];
export const SPOTIFY_PLAYLIST_TRACKS = SPOTIFY_PHONK_TRACKS.map(([title, artist]) => ({
  key: `spotify-phonk-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
  title,
  artist,
  speed: getTrackSpeed(title),
}));

export function spotifySearchUrl(title, artist = '') {
  const query = `${title.trim()} ${artist.trim()}`.trim();
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}

export const STARTER_TRACKS = [
  { title: 'Vai Sentar (Mega Slowed)', speed: 'Mega Slowed', videoId: 'Z4F8HzeUIqA' },
  { title: 'Montagem Uranium (Ultra Slowed)', speed: 'Ultra Slowed', videoId: 'EYsvBhN0dnc' },
  { title: 'Raya (Slowed)', speed: 'Slowed', videoId: 'rP6MuwT6pu8' },
  { title: 'MTG Diabolica (Ultra Slowed)', speed: 'Ultra Slowed', videoId: 'Yme6ZSHBb7E' },
  { title: 'Funk Mada (Ultra Slowed)', speed: 'Ultra Slowed', videoId: 'jGJAahkJx9o' },
];

const STORAGE_KEY = 'phonk-shelf-youtube-tracks';
const MATCHES_STORAGE_KEY = 'phonk-shelf-youtube-matches';
const API_KEY_STORAGE_KEY = 'gameshelf-youtube-api-key';

function getTrackSpeed(title) {
  const normalized = title.toLowerCase();
  if (normalized.includes('ultra slowed')) return 'Ultra Slowed';
  if (normalized.includes('super slowed')) return 'Super Slowed';
  if (normalized.includes('mega slowed')) return 'Mega Slowed';
  if (normalized.includes('slowed')) return 'Slowed';
  return 'Normal/Clean';
}

function report(message, error = false) {
  const status = document.querySelector('#status');
  status.textContent = message;
  status.classList.toggle('error', error);
}

function openPlayer(title, url) {
  const embed = youtubeEmbedUrl(url);
  if (!embed) {
    report('Unsupported YouTube link. Use a valid YouTube video or playlist URL.', true);
    return;
  }
  document.querySelector('#player-title').textContent = title;
  document.querySelector('#youtube-player').src = embed;
  document.querySelector('.youtube-featured').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function makeCard(track, matchUrls, onSearch) {
  const card = document.createElement('article');
  card.className = 'track';
  const art = document.createElement('div');
  art.className = 'track-art';
  art.setAttribute('aria-hidden', 'true');
  art.textContent = '♫';
  const info = document.createElement('div');
  info.className = 'track-info';
  const title = document.createElement('h3');
  title.textContent = track.title;
  const artist = document.createElement('span');
  artist.className = 'track-artist';
  artist.textContent = track.artist || '';
  const speed = document.createElement('span');
  speed.className = 'speed-tag';
  speed.textContent = track.speed === 'Normal/Clean' ? 'NORMAL / CLEAN' : track.speed.toUpperCase();
  info.append(title);
  if (track.artist) info.append(artist);
  info.append(speed);
  const action = document.createElement('button');
  action.className = 'track-action';
  action.type = 'button';
  action.textContent = track.videoId || track.youtubeUrl ? 'Play here' : 'Find video';
  action.setAttribute('aria-label', `${track.videoId || track.youtubeUrl ? 'Play' : 'Find a YouTube video for'} ${track.title}`);
  action.addEventListener('click', () => {
    const youtubeUrl = track.saved
      ? track.youtubeUrl
      : track.videoId
        ? `https://www.youtube.com/watch?v=${track.videoId}`
        : matchUrls[track.key];
    if (youtubeUrl) openPlayer(track.title, youtubeUrl);
    else onSearch(track);
  });
  const spotifyAction = document.createElement('a');
  spotifyAction.className = 'spotify-track-action';
  spotifyAction.href = spotifySearchUrl(track.title, track.artist);
  spotifyAction.target = '_blank';
  spotifyAction.rel = 'noopener noreferrer';
  spotifyAction.textContent = 'Spotify';
  spotifyAction.setAttribute('aria-label', `Preview ${track.title} on Spotify`);
  const actions = document.createElement('div');
  actions.className = 'track-actions';
  actions.append(action, spotifyAction);
  card.append(art, info, actions);
  return card;
}

function getSavedTracks() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(stored)) throw new Error('Stored tracks must be a list.');
    return stored.filter((track) =>
      track && typeof track.title === 'string' && track.title.trim() &&
      SPEEDS.includes(track.speed) && typeof track.youtubeUrl === 'string' &&
      parseYouTubeLink(track.youtubeUrl),
    );
  } catch {
    report('Saved tracks could not be read. The starter playlist is still available.', true);
    return [];
  }
}

function init() {
  const grid = document.querySelector('#tracks');
  if (!grid) return;
  let savedTracks = getSavedTracks();
  let trackMatchUrls = getVideoMatches();
  let youtubeApiKey = '';
  let activeSpeed = 'All';
  const search = document.querySelector('#search');
  const count = document.querySelector('#count');
  const empty = document.querySelector('#empty');
  const filters = [...document.querySelectorAll('.filter')];
  const searchResults = document.querySelector('#youtube-track-search-results');
  const searchStatus = document.querySelector('#youtube-track-search-status');
  const apiKeyInput = document.querySelector('#phonk-api-key');

  function getVideoMatches() {
    try {
      const matches = JSON.parse(localStorage.getItem(MATCHES_STORAGE_KEY) ?? '{}');
      if (!matches || typeof matches !== 'object' || Array.isArray(matches)) throw new Error('Saved video matches must be an object.');
      return Object.fromEntries(Object.entries(matches).filter(([, url]) =>
        typeof url === 'string' && parseYouTubeLink(url)?.type === 'video',
      ));
    } catch {
      report('Saved YouTube matches could not be read. Search results can still be selected.', true);
      return {};
    }
  }

  function showSearchStatus(message, error = false) {
    searchStatus.textContent = message;
    searchStatus.classList.toggle('error', error);
  }

  function makeVideoMatchCard(video, track) {
    const button = document.createElement('button');
    button.className = 'youtube-match';
    button.type = 'button';
    button.setAttribute('aria-label', `Play ${video.title} by ${video.channel}`);
    if (video.thumbnail) {
      const thumbnail = document.createElement('img');
      thumbnail.src = video.thumbnail;
      thumbnail.alt = '';
      thumbnail.loading = 'lazy';
      button.append(thumbnail);
    }
    const details = document.createElement('span');
    const title = document.createElement('strong');
    title.textContent = video.title;
    const channel = document.createElement('small');
    channel.textContent = video.channel;
    details.append(title, channel);
    button.append(details);
    button.addEventListener('click', () => {
      const youtubeUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`;
      const nextMatches = { ...trackMatchUrls, [track.key]: youtubeUrl };
      try {
        localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(nextMatches));
        trackMatchUrls = nextMatches;
      } catch {
        showSearchStatus('This browser could not save the selected video. It will play now, but you may need to find it again later.', true);
      }
      searchResults.replaceChildren();
      openPlayer(track.title, youtubeUrl);
    });
    return button;
  }

  async function searchYouTubeTrack(track) {
    if (!youtubeApiKey) {
      showSearchStatus('Enter your YouTube Data API key above to search for videos.', true);
      apiKeyInput.focus();
      return;
    }
    searchResults.replaceChildren();
    searchResults.hidden = false;
    showSearchStatus(`Searching YouTube for “${track.title}”${track.artist ? ` by ${track.artist}` : ''}…`);
    const query = `${track.title} ${track.artist ?? ''}`.trim();
    try {
      const response = await fetch(youtubeSearchApiUrl(query, youtubeApiKey));
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `YouTube search failed (${response.status}).`);
      const videos = (data.items ?? [])
        .filter((item) => /^[A-Za-z0-9_-]{11}$/.test(item.id?.videoId ?? ''))
        .map((item) => ({
          id: item.id.videoId,
          title: item.snippet?.title ?? 'Untitled video',
          channel: item.snippet?.channelTitle ?? 'YouTube channel',
          thumbnail: item.snippet?.thumbnails?.medium?.url,
        }));
      if (!videos.length) {
        showSearchStatus('No embeddable video results were found. Try again later or search the title on YouTube.', true);
        return;
      }
      searchResults.replaceChildren(...videos.map((video) => makeVideoMatchCard(video, track)));
      showSearchStatus(`Choose the YouTube version for “${track.title}”.`);
    } catch (error) {
      showSearchStatus(`Could not search YouTube: ${error.message} Check the API key, YouTube Data API v3 access, and key restrictions.`, true);
    }
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const visible = [
      ...STARTER_TRACKS.map((track) => ({ ...track, saved: false })),
      ...SPOTIFY_PLAYLIST_TRACKS.map((track) => ({ ...track, saved: false })),
      ...savedTracks.map((track) => ({ ...track, saved: true })),
    ].filter((track) =>
      (activeSpeed === 'All' || track.speed === activeSpeed) &&
      (!query || `${track.title} ${track.artist ?? ''}`.toLowerCase().includes(query)),
    );
    grid.replaceChildren(...visible.map((track) => makeCard(track, trackMatchUrls, searchYouTubeTrack)));
    count.textContent = `${visible.length} ${visible.length === 1 ? 'track' : 'tracks'}`;
    empty.hidden = visible.length > 0;
  }

  filters.forEach((button) => button.addEventListener('click', () => {
    activeSpeed = button.dataset.speed;
    filters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    render();
  }));
  search.addEventListener('input', render);
  document.querySelector('#phonk-api-key-form').addEventListener('submit', (event) => {
    event.preventDefault();
    youtubeApiKey = apiKeyInput.value.trim();
    if (!youtubeApiKey) {
      showSearchStatus('Paste your YouTube Data API key first.', true);
      return;
    }
    try {
      sessionStorage.setItem(API_KEY_STORAGE_KEY, youtubeApiKey);
    } catch {
      showSearchStatus('The key is ready for this page, but this browser could not keep it for the tab. You may need to paste it again after navigating away.', true);
      return;
    }
    showSearchStatus('YouTube search is ready. Choose a song above to find matching videos.');
  });
  document.querySelector('#add-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const speed = document.querySelector('#speed').value;
    const youtubeUrl = document.querySelector('#youtube-url').value.trim();
    if (!title || !SPEEDS.includes(speed)) {
      report('Enter a title and choose a speed/style.', true);
      return;
    }
    if (!parseYouTubeLink(youtubeUrl)) {
      report('Enter a valid YouTube video or playlist URL.', true);
      return;
    }
    const next = [...savedTracks, { title, speed, youtubeUrl }];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      report('This browser could not save your track. Check local storage settings and try again.', true);
      return;
    }
    savedTracks = next;
    render();
    document.querySelector('#add-form').reset();
    report(`Added “${title}” to your playlist.`);
    openPlayer(title, youtubeUrl);
  });
  try {
    youtubeApiKey = sessionStorage.getItem(API_KEY_STORAGE_KEY) ?? '';
    apiKeyInput.value = youtubeApiKey;
    if (youtubeApiKey) showSearchStatus('Your tab’s saved API key is ready. Choose a song to search for YouTube videos.');
  } catch {
    showSearchStatus('Paste your YouTube Data API key to search for matching videos in this page.', true);
  }
  render();
}

if (typeof document !== 'undefined') init();
