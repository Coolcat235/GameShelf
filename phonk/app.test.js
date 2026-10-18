import test from 'node:test';
import assert from 'node:assert/strict';
import { SPEEDS, SPOTIFY_PLAYLIST_TRACKS, STARTER_TRACKS, spotifySearchUrl } from './app.js';

test('starter list contains the remaining titles and correct speed categories', () => {
  assert.deepEqual(STARTER_TRACKS.map(({ title, speed }) => [title, speed]), [
    ['Vai Sentar (Mega Slowed)', 'Mega Slowed'],
    ['Montagem Uranium (Ultra Slowed)', 'Ultra Slowed'],
    ['Raya (Slowed)', 'Slowed'],
    ['MTG Diabolica (Ultra Slowed)', 'Ultra Slowed'],
    ['Funk Mada (Ultra Slowed)', 'Ultra Slowed'],
  ]);
});

test('every starter track has a YouTube video ID for in-page playback', () => {
  assert.equal(STARTER_TRACKS.length, 5);
  assert.ok(STARTER_TRACKS.every(({ videoId }) => /^[A-Za-z0-9_-]{11}$/.test(videoId)));
  assert.equal(STARTER_TRACKS.find(({ title }) => title === 'Vai Sentar (Mega Slowed)').videoId, 'Z4F8HzeUIqA');
});

test('includes 99 playable tracks from the Spotify Phonk playlist snapshot with speed filters', () => {
  assert.equal(SPOTIFY_PLAYLIST_TRACKS.length, 99);
  assert.ok(SPOTIFY_PLAYLIST_TRACKS.every(({ title, artist, speed, key }) =>
    title && artist && SPEEDS.includes(speed) && /^spotify-phonk-[a-z0-9-]+$/.test(key),
  ));
  assert.ok(SPOTIFY_PLAYLIST_TRACKS.every(({ title }) => !title.includes('ECOS DO ABISMO')));
  assert.equal(SPOTIFY_PLAYLIST_TRACKS[0].title, 'MONTAGEM GUERREIRO - Slowed');
  assert.equal(SPOTIFY_PLAYLIST_TRACKS[6].speed, 'Slowed');
  assert.equal(SPOTIFY_PLAYLIST_TRACKS[16].speed, 'Super Slowed');
  assert.equal(SPOTIFY_PLAYLIST_TRACKS[10].speed, 'Ultra Slowed');
  assert.equal(SPOTIFY_PLAYLIST_TRACKS[82].title, 'Murder In My Mind');
});

test('creates official Spotify search links for track titles and artists', () => {
  assert.equal(
    spotifySearchUrl('MONTAGEM GUERREIRO - Slowed', 'Avenxir, SUNJI'),
    'https://open.spotify.com/search/MONTAGEM%20GUERREIRO%20-%20Slowed%20Avenxir%2C%20SUNJI',
  );
  assert.equal(spotifySearchUrl('Vai Sentar (Mega Slowed)'), 'https://open.spotify.com/search/Vai%20Sentar%20(Mega%20Slowed)');
});
