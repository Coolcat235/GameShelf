# GameShelf

A beginner-friendly game discovery website with thousands of browser games, including racing, sports, arcade, puzzles, and multiplayer. Choose a game and press **Play here** to open it inside the page. The player has a fullscreen button, and the library displays games in batches so large catalogs remain responsive.

Games run in a sandboxed player inside GameShelf. The player allows game pop-ups when needed, but does not allow a game to navigate the main page. A game site can still refuse to load when it does not allow embedding; GameShelf does not bypass those restrictions or send you to another site.

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
