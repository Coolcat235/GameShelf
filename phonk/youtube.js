export function parseYouTubeLink(value) {
  if (typeof value !== 'string') return null;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  const allowedHosts = new Set([
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'music.youtube.com',
    'youtu.be',
    'www.youtube-nocookie.com',
  ]);
  if (url.protocol !== 'https:' || !allowedHosts.has(host) || url.username || url.password || url.port) {
    return null;
  }

  if (url.searchParams.has('list')) {
    const playlistId = url.searchParams.get('list');
    if (playlistId && /^[A-Za-z0-9_-]{10,}$/.test(playlistId)) {
      return { type: 'playlist', id: playlistId };
    }
    return null;
  }

  let videoId = '';
  if (host === 'youtu.be') {
    videoId = url.pathname.split('/').filter(Boolean)[0] ?? '';
  } else if (url.pathname === '/watch') {
    videoId = url.searchParams.get('v') ?? '';
  } else {
    const [, route, id] = url.pathname.split('/');
    if (['embed', 'shorts', 'live'].includes(route)) videoId = id ?? '';
  }
  return /^[A-Za-z0-9_-]{11}$/.test(videoId) ? { type: 'video', id: videoId } : null;
}

export function youtubeEmbedUrl(value) {
  const parsed = parseYouTubeLink(value);
  if (!parsed) return null;
  return parsed.type === 'playlist'
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(parsed.id)}`
    : `https://www.youtube-nocookie.com/embed/${parsed.id}`;
}

export function youtubeSearchApiUrl(query, apiKey, pageToken = '') {
  const search = new URL('https://www.googleapis.com/youtube/v3/search');
  const params = {
    part: 'snippet',
    type: 'video',
    videoEmbeddable: 'true',
    maxResults: '6',
    q: query.trim(),
    key: apiKey.trim(),
  };
  if (pageToken) params.pageToken = pageToken;
  search.search = new URLSearchParams(params);
  return search.toString();
}

export function parseYouTubeChannel(value) {
  if (typeof value !== 'string') return null;
  const input = value.trim();
  const channelIdMatch = input.match(/^UC[A-Za-z0-9_-]{22}$/);
  if (channelIdMatch) return { type: 'id', id: input };

  let url;
  try {
    url = new URL(input.startsWith('@') ? `https://www.youtube.com/${input}` : input);
  } catch {
    return null;
  }
  if (
    url.protocol !== 'https:' ||
    !['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname.toLowerCase()) ||
    url.username ||
    url.password ||
    url.port
  ) return null;

  const [, route, valuePart] = url.pathname.split('/');
  if (route?.startsWith('@') && /^@[A-Za-z0-9._-]{3,30}$/.test(route)) {
    return { type: 'handle', id: route.slice(1) };
  }
  if (route === 'channel' && /^UC[A-Za-z0-9_-]{22}$/.test(valuePart ?? '')) {
    return { type: 'id', id: valuePart };
  }
  return null;
}

export const CHANNEL_QUICK_PICKS = [
  { name: 'MrBeast', id: 'UCX6OQ3DkcsbYNE6H8uQQuVA', handle: 'MrBeast' },
  { name: 'MrBeast Gaming', id: 'UCIPPMRA040LQr5QPyJEbmXA', handle: 'MrBeastGaming' },
  { name: 'DrDonut', id: 'UCPYZ-R5LQGMeU7QikgxmH8Q', handle: 'DrDonutt' },
  { name: 'Camel27' },
  { name: 'METAPCs' },
  { name: 'griffpatch' },
  { name: 'Sur Ronster' },
  { name: 'Mrwhosetheboss' },
  { name: 'TTTpig' },
  { name: 'Nick DiGiovanni' },
  { name: 'CarterPCs' },
  { name: 'NileGreen' },
  { name: 'NileRed' },
  { name: 'MrGreenGuy' },
  { name: 'Max the Meat Guy' },
  { name: 'Mark Rober' },
  { name: 'jmancurly' },
  { name: 'elliot' },
  { name: 'Ryan Trahan' },
  { name: 'Leowook' },
  { name: "Zach's Tech Turf" },
  { name: 'DrDonut Clips' },
  { name: 'Redish' },
  { name: 'Wisp' },
  { name: 'xNestorio' },
  { name: 'mryeester' },
  { name: 'Carvs' },
  { name: '@CoolCats235' },
  { name: 'Dude Perfect' },
  { name: "That's Amazing" },
  { name: "That's Amazing 2" },
  { name: 'Farex' },
  { name: 'Techbrology' },
  { name: 'NileRed Extra' },
  { name: 'John Casterline' },
  { name: 'Addie Bowley' },
  { name: 'Marques Brownlee' },
  { name: 'BasicRedstone' },
  { name: 'Preston' },
  { name: 'PrestonPlayz' },
  { name: 'PrestonReacts' },
  { name: 'FaZe Rug' },
  { name: 'CrunchLabs' },
];

export function youtubeChannelEmbedUrl(value) {
  const parsed = typeof value === 'string' ? parseYouTubeChannel(value) : value;
  if (!parsed) return null;
  const channel = parsed.type === 'handle'
    ? CHANNEL_QUICK_PICKS.find(({ handle }) => handle?.toLowerCase() === parsed.id.toLowerCase())
    : { id: parsed.id };
  if (!channel || !/^UC[A-Za-z0-9_-]{22}$/.test(channel.id)) return null;
  const uploadsPlaylistId = `UU${channel.id.slice(2)}`;
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(uploadsPlaylistId)}`;
}

export function youtubeChannelPlaylistUrl(value) {
  const parsed = typeof value === 'string' ? parseYouTubeChannel(value) : value;
  if (!parsed) return null;
  const channel = parsed.type === 'handle'
    ? CHANNEL_QUICK_PICKS.find(({ handle }) => handle?.toLowerCase() === parsed.id.toLowerCase())
    : { id: parsed.id };
  if (!channel || !/^UC[A-Za-z0-9_-]{22}$/.test(channel.id)) return null;
  return `https://www.youtube.com/playlist?list=UU${channel.id.slice(2)}`;
}

export function youtubeChannelApiUrl(channel, apiKey) {
  const parsed = typeof channel === 'string' ? parseYouTubeChannel(channel) : channel;
  if (!parsed || !['id', 'handle'].includes(parsed.type) || !parsed.id || !apiKey.trim()) return null;
  const request = new URL('https://www.googleapis.com/youtube/v3/channels');
  const params = {
    part: 'contentDetails,snippet',
    key: apiKey.trim(),
  };
  if (parsed.type === 'id') {
    if (!/^UC[A-Za-z0-9_-]{22}$/.test(parsed.id)) return null;
    params.id = parsed.id;
  } else {
    params.forHandle = parsed.id;
  }
  request.search = new URLSearchParams(params);
  return request.toString();
}

export function youtubeChannelSearchApiUrl(query, apiKey) {
  if (!query.trim() || !apiKey.trim()) return null;
  const request = new URL('https://www.googleapis.com/youtube/v3/search');
  request.search = new URLSearchParams({
    part: 'snippet',
    type: 'channel',
    maxResults: '10',
    q: query.trim(),
    key: apiKey.trim(),
  });
  return request.toString();
}

export function youtubeChannelVideosApiUrl(uploadsPlaylistId, apiKey, pageToken = '') {
  if (!/^UU[A-Za-z0-9_-]{22}$/.test(uploadsPlaylistId) || !apiKey.trim()) return null;
  const request = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  const params = {
    part: 'snippet,contentDetails',
    playlistId: uploadsPlaylistId,
    maxResults: '50',
    key: apiKey.trim(),
  };
  if (pageToken) params.pageToken = pageToken;
  request.search = new URLSearchParams(params);
  return request.toString();
}

export function youtubeChannelPageUrl(value, name = '') {
  const parsed = typeof value === 'string' ? parseYouTubeChannel(value) : value;
  const channelId = parsed?.type === 'id'
    ? parsed.id
    : parsed?.type === 'handle'
      ? CHANNEL_QUICK_PICKS.find(({ handle }) => handle?.toLowerCase() === parsed.id.toLowerCase())?.id
      : null;
  if (!channelId || !/^UC[A-Za-z0-9_-]{22}$/.test(channelId)) return null;
  const params = new URLSearchParams({ channel: channelId });
  if (name.trim()) params.set('name', name.trim());
  return `channel.html?${params}`;
}

export function youtubeChannelSearchPageUrl(name) {
  const query = typeof name === 'string' ? name.trim() : '';
  if (!query) return null;
  const params = new URLSearchParams({ query, name: query });
  return `channel.html?${params}`;
}

export const SUGGESTED_VIDEOS = [
  { id: 'KRr0i2akDlk', title: 'Beat This Game, Win $250,000', channel: 'MrBeast Gaming' },
  { id: 'flgwsL1wAcE', title: "The World's Hardest Video Game!", channel: 'MrBeast Gaming' },
  { id: 'h8VE9_aHd94', title: '$10,000 Every Day You Survive in Minecraft', channel: 'MrBeast Gaming' },
  { id: 'npNmyb-qqGw', title: 'Survive 1000 Days, Win $100,000', channel: 'MrBeast Gaming' },
  { id: 'Vo6QTBMdUfU', title: '1 Day vs 50,000 Day Build Challenge', channel: 'MrBeast Gaming' },
  { id: 'BdyAkaHniAw', title: '100 YouTuber Battle Royale', channel: 'MrBeast Gaming' },
  { id: 'SxNn1AjvMzM', title: 'Build It, Go There!', channel: 'MrBeast Gaming' },
];

function makeVideoCard(video, player, title) {
  const button = document.createElement('button');
  button.className = 'video-result';
  button.type = 'button';
  button.setAttribute('aria-label', `Play ${video.title} by ${video.channel}`);
  const thumbnail = document.createElement('img');
  thumbnail.src = video.thumbnail || `https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/mqdefault.jpg`;
  thumbnail.alt = '';
  thumbnail.loading = 'lazy';
  const caption = document.createElement('span');
  const videoTitle = document.createElement('strong');
  videoTitle.textContent = video.title;
  const channel = document.createElement('small');
  channel.textContent = video.channel;
  caption.append(videoTitle, channel);
  button.append(thumbnail, caption);
  button.addEventListener('click', () => {
    player.src = `https://www.youtube.com/embed/${encodeURIComponent(video.id)}`;
    title.textContent = video.title;
    player.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  return button;
}

if (typeof document !== 'undefined') {
  const player = document.querySelector('#youtube-player');
  const linkForm = document.querySelector('#youtube-link-form');
  if (player && linkForm) {
    const playerTitle = document.querySelector('#video-title');
    const linkStatus = document.querySelector('#youtube-link-status');
    linkForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = document.querySelector('#youtube-url').value.trim();
      const embedUrl = youtubeEmbedUrl(value);
      if (!embedUrl) {
        linkStatus.textContent = 'That link is not supported. Use a valid YouTube video link.';
        linkStatus.classList.add('error');
        return;
      }
      const parsed = parseYouTubeLink(value);
      if (parsed.type !== 'video') {
        linkStatus.textContent = 'Paste a link to one video, not a playlist.';
        linkStatus.classList.add('error');
        return;
      }
      player.src = `https://www.youtube.com/embed/${encodeURIComponent(parsed.id)}`;
      playerTitle.textContent = 'Your selected YouTube video';
      linkStatus.textContent = 'Loaded in the player above.';
      linkStatus.classList.remove('error');
      linkForm.reset();
      player.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  const searchForm = document.querySelector('#youtube-search-form');
  if (player && searchForm) {
    const title = document.querySelector('#video-title');
    const status = document.querySelector('#youtube-status');
    const results = document.querySelector('#youtube-results');
    const loadMore = document.querySelector('#load-more-results');
    const suggestions = document.querySelector('#suggested-videos');
    const suggestionSearch = document.querySelector('#suggestion-search');
    let nextPageToken = '';
    let activeQuery = '';
    let activeApiKey = '';
    function renderSuggestions() {
      const query = suggestionSearch.value.trim().toLowerCase();
      const matches = SUGGESTED_VIDEOS.filter((video) =>
        `${video.title} ${video.channel}`.toLowerCase().includes(query),
      );
      suggestions.replaceChildren(...matches.map((video) => makeVideoCard(video, player, title)));
    }
    suggestionSearch.addEventListener('input', renderSuggestions);
    renderSuggestions();
    async function loadResults({ newSearch }) {
      if (newSearch) {
        activeApiKey = document.querySelector('#api-key').value.trim();
        activeQuery = document.querySelector('#youtube-query').value.trim();
        if (!activeApiKey || !activeQuery) {
          status.textContent = 'Enter your API key and a search phrase.';
          status.classList.add('error');
          return;
        }
        nextPageToken = '';
        results.replaceChildren();
        loadMore.hidden = true;
      }
      const submit = searchForm.querySelector('button[type="submit"]');
      submit.disabled = true;
      loadMore.disabled = true;
      status.textContent = newSearch ? 'Searching YouTube...' : 'Loading more videos...';
      status.classList.remove('error');
      try {
        const response = await fetch(youtubeSearchApiUrl(activeQuery, activeApiKey, nextPageToken));
        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || `YouTube search failed (${response.status}).`);
        const items = data.items ?? [];
        if (!Array.isArray(items) || items.length === 0) {
          status.textContent = newSearch ? 'No videos found. Try another search.' : 'There are no more results for this search.';
          nextPageToken = '';
          loadMore.hidden = true;
          return;
        }
        const cards = items
          .filter((item) => /^[A-Za-z0-9_-]{11}$/.test(item.id?.videoId ?? ''))
          .map((item) => makeVideoCard({
            id: item.id.videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails?.medium?.url,
          }, player, title));
        if (cards.length === 0) {
          status.textContent = newSearch ? 'No playable videos found. Try another search.' : 'No playable videos in this batch.';
        } else {
          results.append(...cards);
          status.textContent = `${results.children.length} videos shown.`;
        }
        nextPageToken = data.nextPageToken ?? '';
        loadMore.hidden = !nextPageToken;
      } catch (error) {
        status.textContent = `Could not search YouTube: ${error.message} Check that your API key is valid, the YouTube Data API v3 is enabled, and the key allows this site.`;
        status.classList.add('error');
      } finally {
        submit.disabled = false;
        loadMore.disabled = false;
      }
    }

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      loadResults({ newSearch: true });
    });
    loadMore.addEventListener('click', () => loadResults({ newSearch: false }));
  }

  const channelForm = document.querySelector('#youtube-channel-form');
  if (player && channelForm) {
    const channelInput = document.querySelector('#youtube-channel-url');
    const status = document.querySelector('#youtube-channel-status');
    const channelPicks = document.querySelector('#channel-picks');
    const channelPickFilter = document.querySelector('#channel-pick-filter');

    function showChannel(value, name = 'YouTube channel') {
      const parsed = parseYouTubeChannel(value);
      const knownHandle = parsed?.type === 'handle'
        ? CHANNEL_QUICK_PICKS.find(({ handle }) => handle?.toLowerCase() === parsed.id.toLowerCase())
        : null;
      const looksLikeUnsupportedUrl = /^https?:\/\//i.test(value) && !parsed;
      if (looksLikeUnsupportedUrl) {
        status.textContent = 'That URL is not a supported YouTube channel link. Use a YouTube channel URL, @handle, or channel name.';
        status.classList.add('error');
        return;
      }
      const pageUrl = parsed?.type === 'id'
        ? youtubeChannelPageUrl(parsed, name)
        : knownHandle
          ? youtubeChannelPageUrl(knownHandle.id, name)
          : youtubeChannelSearchPageUrl(parsed?.type === 'handle' ? `@${parsed.id}` : value);
      if (!pageUrl) {
        status.textContent = 'Enter a channel ID, @handle, or channel name.';
        status.classList.add('error');
        return;
      }
      window.location.href = pageUrl;
    }

    function renderChannelPicks() {
      const query = channelPickFilter.value.trim().toLowerCase();
      const picks = CHANNEL_QUICK_PICKS.filter(({ name }) => name.toLowerCase().includes(query));
      if (!picks.length) {
        channelPicks.innerHTML = '<p class="channel-picks-empty">No channel names match that filter.</p>';
        return;
      }
      channelPicks.replaceChildren(...picks.map((pick) => {
        const button = document.createElement('button');
        button.className = 'channel-pick';
        button.type = 'button';
        button.textContent = pick.name;
        button.addEventListener('click', () => {
          const pageUrl = pick.id
            ? youtubeChannelPageUrl(pick.id, pick.name)
            : youtubeChannelSearchPageUrl(pick.name);
          if (pageUrl) window.location.href = pageUrl;
        });
        return button;
      }));
    }

    channelForm.addEventListener('submit', (event) => {
      event.preventDefault();
      showChannel(channelInput.value.trim(), channelInput.value.trim());
    });
    channelPickFilter.addEventListener('input', renderChannelPicks);
    renderChannelPicks();
  }
}
