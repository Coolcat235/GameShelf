# GameShelf

A beginner-friendly game discovery website with thousands of browser games, including racing, sports, arcade, puzzles, and multiplayer. Choose a game and press **Play here** to open it inside the page. The player has a fullscreen button, and the library displays games in batches so large catalogs remain responsive.

Games run in a sandboxed player inside GameShelf. The player allows game pop-ups when needed, but does not allow a game to navigate the main page. A game site can still refuse to load when it does not allow embedding; GameShelf does not bypass those restrictions or send you to another site.

## Phonk Shelf

A separate Phonk Shelf lives in [`phonk/`](phonk/) and will be available on GitHub Pages at `https://coolcat235.github.io/GameShelf/phonk/`. Use its navigation to switch between the [Phonk music page](phonk/index.html) and a separate [general YouTube videos page](phonk/youtube.html). The music page includes 99 tracks from the Spotify [Phonk playlist](https://open.spotify.com/playlist/37i9dQZF1DWWY64wDtewQt), captured as a static catalog, plus the original starter songs. Each track has a Spotify search button and the page includes Spotify's official playlist embed for quick samples; the embed is controlled by Spotify and may include tracks removed from the GameShelf list. Filter or search titles and artists; user-added YouTube links and selected video matches are saved in this browser. To play a track with YouTube, choose **Find video**, then select the correct YouTube result; this requires a restricted YouTube Data API v3 key shared in session storage across pages in the current tab. YouTube search results are limited to videos marked embeddable, but playback can still be blocked by YouTube. The YouTube page also searches videos through the YouTube Data API; results appear six at a time and selected results play in its embedded player. The channel picker includes MrBeast, MrBeast Gaming, DrDonut (`@DrDonutt`), and the additional channels listed by the site owner. Known channels open directly, while other names use YouTube channel search; choose the intended result if a name is ambiguous. Channel pages fetch uploads in 50-video pages and list each title and ID with a copy button. YouTube may restrict playback by age, region, account, or other conditions; Shorts are included when returned but are not labeled separately. Restrict the key to the site’s HTTP referrer and YouTube Data API v3 in Google Cloud Console. Browser API keys are visible to site visitors, so do not add an unrestricted key to the source code. GameShelf does not host or download music or videos.

The project includes the public embeddable-game feed provided by OnlineGames.io in `onlinegames-catalog.js` and locally bundled game indexes from GNHUSTGames, 3kh0, Classroom 6x, Lagged, and Bloxd.io in `partner-games.js`. The Bloxd.io card uses the supplied CrazyGames embed. Catalogs load locally without cross-origin data requests. Games open in GameShelf's sandboxed player, so selecting a game does not navigate the main page away.

Lagged's direct game files can display a "Website Not Approved" message outside Lagged. GameShelf therefore embeds Lagged's individual game pages instead of bypassing that restriction or loading those direct game files.

GameDistribution and GamePix require separate approved publisher/partner integrations. No partner credentials are configured in this project.

## Open the website

Double-click `index.html`, or serve the folder locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Make changes

- `index.html` contains the page structure and game player.
- `styles.css` controls colors, layout, and mobile styling.
- `app.js` contains the game list and the search/filter/player behavior.
- `onlinegames-catalog.js` contains the bundled OnlineGames.io embeddable-game catalog.
- `partner-games.js` contains bundled game indexes collected from the additional game sites.

Each item in the `games` list in `app.js` is one game. Change its `name`, `genre`, `emoji`, `colors`, or `url` to customize the card and the embedded game.
