import {
  parseYouTubeChannel,
  youtubeChannelApiUrl,
  youtubeChannelSearchApiUrl,
  youtubeChannelVideosApiUrl,
} from './youtube.js';

const params = new URLSearchParams(window.location.search);
const channel = parseYouTubeChannel(params.get('channel') ?? '');
const query = params.get('query')?.trim() || '';
let name = params.get('name')?.trim() || 'YouTube channel';
const title = document.querySelector('#channel-title');
const subtitle = document.querySelector('#channel-subtitle');
const form = document.querySelector('#channel-load-form');
const apiKeyInput = document.querySelector('#channel-api-key');
const toggleApiKeyVisibility = document.querySelector('#toggle-api-key-visibility');
const copyApiKey = document.querySelector('#copy-api-key');
const status = document.querySelector('#channel-status');
const results = document.querySelector('#channel-results');
const loadMore = document.querySelector('#load-more-channel-videos');
const loadAll = document.querySelector('#load-all-channel-videos');
const player = document.querySelector('#channel-player');
const videoTitle = document.querySelector('#video-title');
const channelMatches = document.querySelector('#channel-matches');
const channelMatchList = document.querySelector('#channel-match-list');
const submit = form.querySelector('button[type="submit"]');
let activeApiKey = '';
let uploadsPlaylistId = '';
let nextPageToken = '';
let keyStorageWarning = '';

function updateChannelHeading(channelName) {
  name = channelName || 'YouTube channel';
  title.textContent = name;
  subtitle.textContent = `${name} videos`;
  document.title = `${name} videos — GameShelf`;
}

updateChannelHeading(query ? `Find ${name}` : name);

toggleApiKeyVisibility.addEventListener('click', () => {
  const showKey = apiKeyInput.type === 'password';
  apiKeyInput.type = showKey ? 'text' : 'password';
  toggleApiKeyVisibility.textContent = showKey ? 'Hide API key' : 'Show API key';
  toggleApiKeyVisibility.setAttribute('aria-pressed', String(showKey));
});

copyApiKey.addEventListener('click', async () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    status.textContent = 'Paste your own Google API key first, then use “Copy API key.”';
    status.classList.add('error');
    return;
  }
  try {
    await navigator.clipboard.writeText(key);
    status.textContent = 'Your API key was copied to the clipboard.';
    status.classList.remove('error');
  } catch {
    apiKeyInput.type = 'text';
    apiKeyInput.focus();
    apiKeyInput.select();
    status.textContent = 'Clipboard access was blocked. Your API key is selected; copy it with Ctrl+C (or Command+C).';
    status.classList.remove('error');
  }
});

function playVideo(video) {
  player.src = `https://www.youtube.com/embed/${encodeURIComponent(video.id)}`;
  videoTitle.textContent = video.title;
  player.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function makeVideoCard(video) {
  const card = document.createElement('article');
  card.className = 'channel-video-card';

  const button = document.createElement('button');
  button.className = 'video-result';
  button.type = 'button';
  button.setAttribute('aria-label', `Play ${video.title} by ${name}`);

  const thumbnail = document.createElement('img');
  thumbnail.src = video.thumbnail || `https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/mqdefault.jpg`;
  thumbnail.alt = '';
  thumbnail.loading = 'lazy';

  const caption = document.createElement('span');
  const titleText = document.createElement('strong');
  titleText.textContent = video.title;
  const channelText = document.createElement('small');
  channelText.textContent = name;
  const embedStatus = document.createElement('small');
  embedStatus.textContent = video.embeddable === false
    ? 'YouTube may block embedded playback'
    : video.embeddable === true
      ? 'Embeddable'
      : 'Playback availability unknown';
  const videoIdText = document.createElement('small');
  videoIdText.className = 'channel-video-id';
  videoIdText.textContent = `Video ID: ${video.id}`;
  caption.append(titleText, channelText, embedStatus, videoIdText);
  button.append(thumbnail, caption);
  button.addEventListener('click', () => playVideo(video));

  const copyButton = document.createElement('button');
  copyButton.className = 'copy-video-id';
  copyButton.type = 'button';
  copyButton.textContent = 'Copy video ID';
  copyButton.setAttribute('aria-label', `Copy video ID ${video.id} for ${video.title}`);
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(video.id);
      copyButton.textContent = 'Copied!';
    } catch {
      copyButton.textContent = `ID: ${video.id}`;
      status.textContent = `Video ID: ${video.id}. Select and copy it from the card.`;
    }
  });

  card.append(button, copyButton);
  return card;
}

function makeChannelMatch(item) {
  const channelId = item.id?.channelId;
  const channelName = item.snippet?.title;
  if (!/^UC[A-Za-z0-9_-]{22}$/.test(channelId ?? '') || !channelName) return null;

  const button = document.createElement('button');
  button.className = 'channel-match';
  button.type = 'button';
  button.setAttribute('aria-label', `Load videos from ${channelName}`);
  const thumbnail = document.createElement('img');
  thumbnail.src = item.snippet.thumbnails?.default?.url || '';
  thumbnail.alt = '';
  thumbnail.loading = 'lazy';
  const details = document.createElement('span');
  const channelTitle = document.createElement('strong');
  channelTitle.textContent = channelName;
  const channelIdText = document.createElement('small');
  channelIdText.textContent = `Channel ID: ${channelId}`;
  const description = document.createElement('small');
  description.textContent = item.snippet.description || 'Select to load this channel’s videos.';
  details.append(channelTitle, channelIdText, description);
  button.append(thumbnail, details);
  button.addEventListener('click', () => {
    updateChannelHeading(channelName);
    channelMatches.hidden = true;
    loadVideos({ newChannel: true, allRemaining: true, selectedChannelId: channelId });
  });
  return button;
}

async function searchChannels(apiKey) {
  activeApiKey = apiKey;
  channelMatches.hidden = false;
  channelMatchList.replaceChildren();
  status.textContent = `Searching YouTube for “${query}”…`;
  status.classList.remove('error');
  submit.disabled = true;
  try {
    const response = await fetch(youtubeChannelSearchApiUrl(query, activeApiKey));
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || `Channel search failed (${response.status}).`);
    const matches = (data.items ?? []).map(makeChannelMatch).filter(Boolean);
    if (!matches.length) {
      status.textContent = `No channels found for “${query}”. Try a different name or enter a channel ID/@handle.`;
      return;
    }
    channelMatchList.append(...matches);
    status.textContent = `Choose the correct channel for “${query}” from the results below.`;
  } catch (error) {
    status.textContent = `Could not search for the channel: ${error.message} Check that the key is valid, YouTube Data API v3 is enabled, and the key allows this site.`;
    status.classList.add('error');
  } finally {
    submit.disabled = false;
  }
}

async function loadVideos({ newChannel, allRemaining = false, selectedChannelId = '' }) {
  if (!channel && !selectedChannelId) {
    status.textContent = 'This channel link is invalid. Return to YouTube Videos and choose a channel again.';
    status.classList.add('error');
    return;
  }

  if (newChannel) {
    activeApiKey = apiKeyInput.value.trim();
    if (!activeApiKey) {
      status.textContent = 'Enter your one YouTube Data API key above. GameShelf will then load every video title and ID for this channel.';
      status.classList.add('error');
      return;
    }
    keyStorageWarning = '';
    try {
      sessionStorage.setItem('gameshelf-youtube-api-key', activeApiKey);
    } catch {
      keyStorageWarning = ' This browser could not remember the key for other channels in this tab.';
    }
    uploadsPlaylistId = '';
    nextPageToken = '';
    results.replaceChildren();
    results.setAttribute('aria-busy', 'true');
    loadMore.hidden = true;
    loadAll.hidden = true;
  }

  submit.disabled = true;
  loadMore.disabled = true;
  loadAll.disabled = true;
  status.textContent = newChannel
    ? 'Loading channel videos…'
    : allRemaining
      ? 'Loading the rest of the channel…'
      : 'Loading more videos…';
  status.classList.remove('error');

  try {
    if (newChannel) {
      const channelReference = selectedChannelId || channel;
      const response = await fetch(youtubeChannelApiUrl(channelReference, activeApiKey));
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `Channel lookup failed (${response.status}).`);
      const found = data.items?.[0];
      uploadsPlaylistId = found?.contentDetails?.relatedPlaylists?.uploads ?? '';
      if (!uploadsPlaylistId) throw new Error('YouTube did not return an uploads list for this channel.');
      if (found.id) selectedChannelId = found.id;
      if (found.snippet?.title && !params.get('name')) updateChannelHeading(found.snippet.title);
    }

    do {
      const response = await fetch(youtubeChannelVideosApiUrl(uploadsPlaylistId, activeApiKey, nextPageToken));
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `Could not load videos (${response.status}).`);
      const items = Array.isArray(data.items) ? data.items : [];
      const uploadVideos = items
        .map((item) => ({
          id: item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId,
          title: item.snippet?.title,
          thumbnail: item.snippet?.thumbnails?.medium?.url,
        }))
        .filter((video) => /^[A-Za-z0-9_-]{11}$/.test(video.id ?? '') && video.title);
      const cards = uploadVideos.map(makeVideoCard);
      results.append(...cards);
      nextPageToken = data.nextPageToken ?? '';
      status.textContent = `${results.children.length} video IDs loaded for ${name}${nextPageToken ? '…' : '.'}${keyStorageWarning}`;
    } while (allRemaining && nextPageToken);

    loadMore.hidden = !nextPageToken;
    loadAll.hidden = !nextPageToken;
    if (!results.children.length) status.textContent = `No videos were returned for this channel.${keyStorageWarning}`;
    else if (!nextPageToken) status.textContent = `Loaded all ${results.children.length} video IDs for ${name}.${keyStorageWarning}`;
    results.removeAttribute('aria-busy');
  } catch (error) {
    status.textContent = `Could not load channel videos: ${error.message} Check that the key is valid, YouTube Data API v3 is enabled, and the key allows this site.`;
    status.classList.add('error');
    loadMore.hidden = !nextPageToken;
    loadAll.hidden = !nextPageToken;
  } finally {
    results.removeAttribute('aria-busy');
    submit.disabled = false;
    loadMore.disabled = false;
    loadAll.disabled = false;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (query) searchChannels(apiKeyInput.value.trim());
  else loadVideos({ newChannel: true, allRemaining: true });
});
loadMore.addEventListener('click', () => loadVideos({ newChannel: false }));
loadAll.addEventListener('click', () => loadVideos({ newChannel: false, allRemaining: true }));

try {
  const savedKey = sessionStorage.getItem('gameshelf-youtube-api-key');
  if (savedKey) {
    apiKeyInput.value = savedKey;
    if (query) searchChannels(savedKey);
    else if (channel) loadVideos({ newChannel: true, allRemaining: true });
  }
} catch {
  status.textContent = 'This browser blocks temporary key storage. Paste your YouTube Data API key and press “Load all videos + IDs.”';
}
