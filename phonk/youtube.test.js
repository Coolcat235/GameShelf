import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseYouTubeLink,
  parseYouTubeChannel,
  youtubeEmbedUrl,
  youtubeSearchApiUrl,
  youtubeChannelEmbedUrl,
  youtubeChannelPlaylistUrl,
  youtubeChannelPageUrl,
  youtubeChannelApiUrl,
  youtubeChannelSearchApiUrl,
  youtubeChannelSearchPageUrl,
  youtubeChannelVideosApiUrl,
  CHANNEL_QUICK_PICKS,
  SUGGESTED_VIDEOS,
} from './youtube.js';

const videoId = 'GygMMKqNWSY';
const playlistId = 'PLoHmsrA6CSevZEf6Jrs75u390-_GWWtJ2';
const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';

test('parses supported YouTube video URL formats', () => {
  assert.deepEqual(parseYouTubeLink(`https://www.youtube.com/watch?v=${videoId}&feature=share`), { type: 'video', id: videoId });
  assert.deepEqual(parseYouTubeLink(`https://youtu.be/${videoId}`), { type: 'video', id: videoId });
  assert.deepEqual(parseYouTubeLink(`https://www.youtube.com/shorts/${videoId}`), { type: 'video', id: videoId });
  assert.deepEqual(parseYouTubeLink(`https://www.youtube.com/embed/${videoId}`), { type: 'video', id: videoId });
});

test('parses YouTube playlists and creates privacy-enhanced embed URLs', () => {
  assert.deepEqual(parseYouTubeLink(`https://www.youtube.com/playlist?list=${playlistId}`), { type: 'playlist', id: playlistId });
  assert.equal(youtubeEmbedUrl(`https://youtu.be/${videoId}`), `https://www.youtube-nocookie.com/embed/${videoId}`);
  assert.equal(
    youtubeEmbedUrl(`https://www.youtube.com/playlist?list=${playlistId}`),
    `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`,
  );
});

test('rejects non-YouTube hosts, unsupported paths, and malformed IDs', () => {
  assert.equal(parseYouTubeLink(`https://youtube.com.attacker.example/watch?v=${videoId}`), null);
  assert.equal(parseYouTubeLink(`http://www.youtube.com/watch?v=${videoId}`), null);
  assert.equal(parseYouTubeLink(`https://www.youtube.com/channel/${videoId}`), null);
  assert.equal(parseYouTubeLink('https://youtu.be/short'), null);
  assert.equal(youtubeEmbedUrl('https://example.com/video'), null);
});

test('builds a YouTube Data API search URL with encoded query and key', () => {
  const url = new URL(youtubeSearchApiUrl('phonk mix', 'test-key'));
  assert.equal(url.origin + url.pathname, 'https://www.googleapis.com/youtube/v3/search');
  assert.equal(url.searchParams.get('q'), 'phonk mix');
  assert.equal(url.searchParams.get('key'), 'test-key');
  assert.equal(url.searchParams.get('type'), 'video');
  assert.equal(url.searchParams.get('videoEmbeddable'), 'true');
  assert.equal(url.searchParams.get('maxResults'), '6');
  assert.equal(url.searchParams.has('pageToken'), false);
  assert.equal(new URL(youtubeSearchApiUrl('gaming', 'test-key', 'next-page')).searchParams.get('pageToken'), 'next-page');
});

test('parses channel handles and canonical channel URLs but rejects unsupported hosts', () => {
  assert.deepEqual(parseYouTubeChannel('@markiplier'), { type: 'handle', id: 'markiplier' });
  assert.deepEqual(parseYouTubeChannel('https://www.youtube.com/@markiplier/videos'), { type: 'handle', id: 'markiplier' });
  assert.deepEqual(parseYouTubeChannel(`https://youtube.com/channel/${channelId}`), { type: 'id', id: channelId });
  assert.deepEqual(parseYouTubeChannel(channelId), { type: 'id', id: channelId });
  assert.equal(parseYouTubeChannel('https://youtube.com.attacker.example/@markiplier'), null);
  assert.equal(parseYouTubeChannel('http://youtube.com/@markiplier'), null);
  assert.equal(parseYouTubeChannel('https://youtube.com/c/markiplier'), null);
});

test('creates API-key-free channel uploads embeds for the male gaming quick picks', () => {
  assert.equal(
    youtubeChannelEmbedUrl('https://www.youtube.com/@MrBeast'),
    'https://www.youtube-nocookie.com/embed/videoseries?list=UUX6OQ3DkcsbYNE6H8uQQuVA',
  );
  assert.equal(
    youtubeChannelEmbedUrl(`https://www.youtube.com/channel/${channelId}`),
    `https://www.youtube-nocookie.com/embed/videoseries?list=UU${channelId.slice(2)}`,
  );
  assert.equal(
    youtubeChannelPlaylistUrl('https://www.youtube.com/@DrDonutt'),
    'https://www.youtube.com/playlist?list=UUPYZ-R5LQGMeU7QikgxmH8Q',
  );
  assert.equal(
    youtubeChannelPlaylistUrl(`https://www.youtube.com/channel/${channelId}`),
    `https://www.youtube.com/playlist?list=UU${channelId.slice(2)}`,
  );
  assert.equal(
    youtubeChannelPageUrl(`https://www.youtube.com/channel/${channelId}`, 'My Channel'),
    `channel.html?channel=${channelId}&name=My+Channel`,
  );
  assert.equal(
    youtubeChannelPageUrl('@DrDonutt', 'DrDonut'),
    'channel.html?channel=UCPYZ-R5LQGMeU7QikgxmH8Q&name=DrDonut',
  );
  assert.equal(youtubeChannelEmbedUrl('https://www.youtube.com/@unknownchannel'), null);
  assert.equal(youtubeChannelEmbedUrl('https://example.com/channel'), null);
  assert.equal(youtubeChannelPlaylistUrl('https://example.com/channel'), null);
  assert.equal(youtubeChannelPageUrl('https://example.com/channel'), null);
  assert.deepEqual(CHANNEL_QUICK_PICKS.slice(0, 3).map(({ name }) => name), ['MrBeast', 'MrBeast Gaming', 'DrDonut']);
  assert.equal(CHANNEL_QUICK_PICKS.length, 43);
  const requestedChannels = [
    'Camel27', 'METAPCs', 'griffpatch', 'Sur Ronster', 'Mrwhosetheboss', 'TTTpig',
    'Nick DiGiovanni', 'CarterPCs', 'NileGreen', 'NileRed', 'MrGreenGuy',
    'Max the Meat Guy', 'Mark Rober', 'jmancurly', 'elliot', 'Ryan Trahan',
    'Leowook', "Zach's Tech Turf", 'DrDonut Clips', 'Redish', 'Wisp', 'xNestorio',
    'mryeester', 'Carvs', '@CoolCats235', 'Dude Perfect', "That's Amazing",
    "That's Amazing 2", 'Farex', 'Techbrology', 'NileRed Extra', 'John Casterline',
    'Addie Bowley', 'Marques Brownlee', 'BasicRedstone', 'Preston', 'PrestonPlayz',
    'PrestonReacts', 'FaZe Rug', 'CrunchLabs',
  ];
  assert.deepEqual(CHANNEL_QUICK_PICKS.slice(3).map(({ name }) => name), requestedChannels);
  assert.equal(CHANNEL_QUICK_PICKS.find(({ name }) => name === 'MrBeast')?.id, 'UCX6OQ3DkcsbYNE6H8uQQuVA');
  assert.equal(CHANNEL_QUICK_PICKS.find(({ name }) => name === 'DrDonut')?.id, 'UCPYZ-R5LQGMeU7QikgxmH8Q');
  assert.equal(CHANNEL_QUICK_PICKS.find(({ name }) => name === '@CoolCats235')?.name, '@CoolCats235');
  assert.equal(youtubeChannelPageUrl('@unknownchannel', 'Unknown'), null);
  assert.equal(youtubeChannelSearchPageUrl('NileRed'), 'channel.html?query=NileRed&name=NileRed');
});

test('builds channel upload-list API requests using one site API key', () => {
  const channelRequest = new URL(youtubeChannelApiUrl(channelId, 'site-key'));
  assert.equal(channelRequest.origin + channelRequest.pathname, 'https://www.googleapis.com/youtube/v3/channels');
  assert.equal(channelRequest.searchParams.get('id'), channelId);
  assert.equal(channelRequest.searchParams.get('key'), 'site-key');
  assert.equal(youtubeChannelApiUrl('invalid-channel', 'site-key'), null);
  assert.equal(youtubeChannelApiUrl(channelId, ''), null);

  const handleRequest = new URL(youtubeChannelApiUrl('@MrBeast', 'site-key'));
  assert.equal(handleRequest.searchParams.get('forHandle'), 'MrBeast');
  assert.equal(handleRequest.searchParams.has('id'), false);

  const searchRequest = new URL(youtubeChannelSearchApiUrl('Nile Red', 'site-key'));
  assert.equal(searchRequest.pathname, '/youtube/v3/search');
  assert.equal(searchRequest.searchParams.get('q'), 'Nile Red');
  assert.equal(searchRequest.searchParams.get('type'), 'channel');
  assert.equal(searchRequest.searchParams.get('maxResults'), '10');
  assert.equal(searchRequest.searchParams.get('key'), 'site-key');
  assert.equal(youtubeChannelSearchApiUrl('', 'site-key'), null);

  const uploadsRequest = new URL(youtubeChannelVideosApiUrl(`UU${channelId.slice(2)}`, 'site-key', 'page-two'));
  assert.equal(uploadsRequest.origin + uploadsRequest.pathname, 'https://www.googleapis.com/youtube/v3/playlistItems');
  assert.equal(uploadsRequest.searchParams.get('playlistId'), `UU${channelId.slice(2)}`);
  assert.equal(uploadsRequest.searchParams.get('maxResults'), '50');
  assert.equal(uploadsRequest.searchParams.get('pageToken'), 'page-two');
  assert.equal(uploadsRequest.searchParams.get('key'), 'site-key');
  assert.equal(youtubeChannelVideosApiUrl('bad-playlist', 'site-key'), null);
});

test('provides only MrBeast Gaming suggestions playable by video ID', () => {
  assert.ok(SUGGESTED_VIDEOS.length >= 6);
  assert.ok(SUGGESTED_VIDEOS.some(({ channel }) => channel === 'MrBeast Gaming'));
  assert.ok(SUGGESTED_VIDEOS.every(({ channel }) => channel === 'MrBeast Gaming'));
  assert.ok(SUGGESTED_VIDEOS.every(({ title }) => !/minecraft for kids|family friendly minecraft/i.test(title)));
  assert.ok(SUGGESTED_VIDEOS.every(({ id }) => /^[A-Za-z0-9_-]{11}$/.test(id)));
});
