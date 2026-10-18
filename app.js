const games = [
  { name: 'RocketGoal.io', genre: 'Car soccer · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🚙', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #348aca, #263c75)', url: 'https://rocketgoal.io/' },
  { name: 'Smash Karts', genre: 'Kart racing · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🏎️', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #ce7541, #743f4c)', url: 'https://smashkarts.io/' },
  { name: 'Diep.io', genre: 'Arcade · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🛡️', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #5c83c2, #35436d)', url: 'https://diep.io/' },
  { name: 'TagPro', genre: 'Capture the flag · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🚩', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #c26351, #633c5e)', url: 'https://tagpro.koalabeast.com/' },
  { name: 'Drift Hunters', genre: 'Car racing · Drifting', category: ['Browser'], emoji: '🏁', label: 'RACING', colors: 'linear-gradient(135deg, #438da2, #35456e)', url: 'https://drifthunters2.io/' },
  { name: 'Drift Boss', genre: 'Racing · Quick reflexes', category: ['Browser'], emoji: '🚘', label: 'RACING', colors: 'linear-gradient(135deg, #c77b43, #74424b)', url: 'https://drift-boss.com/' },
  { name: 'Moto X3M', genre: 'Motorbike · Stunt racing', category: ['Browser'], emoji: '🏍️', label: 'RACING', colors: 'linear-gradient(135deg, #4d956e, #334a60)', url: 'https://motox3m.io/' },
  { name: 'Slope', genre: 'Arcade · Endless runner', category: ['Browser'], emoji: '🔴', label: 'ARCADE', colors: 'linear-gradient(135deg, #b74f59, #563454)', url: 'https://slopegame.io/slope-game' },
  { name: 'Vex 7', genre: 'Platform · Obstacle course', category: ['Browser'], emoji: '🏃', label: 'PLATFORMER', colors: 'linear-gradient(135deg, #528d91, #384c64)', url: 'https://vex7.io/' },
  { name: 'Stickman Hook', genre: 'Arcade · Swinging', category: ['Browser'], emoji: '🪝', label: 'ARCADE', colors: 'linear-gradient(135deg, #6e75bf, #44395f)', url: 'https://stickmanhook.com/' },
  { name: 'Basketball Stars', genre: 'Sports · Basketball', category: ['Browser', 'Multiplayer'], emoji: '🏀', label: 'SPORTS', colors: 'linear-gradient(135deg, #c77a3d, #70464b)', url: 'https://basketball-stars.io/' },
  { name: 'Basketball Legends', genre: 'Sports · Two-player', category: ['Browser', 'Multiplayer'], emoji: '🏀', label: 'SPORTS', colors: 'linear-gradient(135deg, #d79c43, #875044)', url: 'https://basketballlegends.io/' },
  { name: 'Retro Bowl', genre: 'Sports · Football', category: ['Browser'], emoji: '🏈', label: 'SPORTS', colors: 'linear-gradient(135deg, #55866f, #3a4d5b)', url: 'https://retrobowl.me/' },
  { name: 'Football Legends', genre: 'Sports · Two-player', category: ['Browser', 'Multiplayer'], emoji: '⚽', label: 'SPORTS', colors: 'linear-gradient(135deg, #528d64, #354c59)', url: 'https://footballlegends.io/' },
  { name: 'Soccer Skills World Cup', genre: 'Sports · Soccer', category: ['Browser'], emoji: '🥅', label: 'SPORTS', colors: 'linear-gradient(135deg, #56976a, #34465a)', url: 'https://soccerskillsworldcup.io/' },
  { name: 'Penalty Shooters 2', genre: 'Sports · Soccer', category: ['Browser'], emoji: '🧤', label: 'SPORTS', colors: 'linear-gradient(135deg, #44977e, #334a61)', url: 'https://penaltyshooters2.com/' },
  { name: '8 Ball Pool', genre: 'Sports · Pool', category: ['Browser', 'Multiplayer'], emoji: '🎱', label: 'SPORTS', colors: 'linear-gradient(135deg, #437c6d, #34445a)', url: 'https://www.miniclip.com/games/8-ball-pool-multiplayer/en/' },
  { name: 'Table Tennis World Tour', genre: 'Sports · Table tennis', category: ['Browser'], emoji: '🏓', label: 'SPORTS', colors: 'linear-gradient(135deg, #cb7347, #673e53)', url: 'https://tabletennisworldtour.com/' },
  { name: 'Golf Orbit', genre: 'Sports · Golf', category: ['Browser'], emoji: '⛳', label: 'SPORTS', colors: 'linear-gradient(135deg, #629d63, #3b5860)', url: 'https://golforbit.com/' },
  { name: 'Head Soccer', genre: 'Sports · Soccer', category: ['Browser', 'Multiplayer'], emoji: '⚽', label: 'SPORTS', colors: 'linear-gradient(135deg, #5488c0, #443f70)', url: 'https://headsoccer.io/' },
  { name: 'Run 3', genre: 'Arcade · Space runner', category: ['Browser'], emoji: '👟', label: 'ARCADE', colors: 'linear-gradient(135deg, #7771c1, #41436f)', url: 'https://run3.io/' },
  { name: 'Subway Surfers', genre: 'Arcade · Endless runner', category: ['Browser'], emoji: '🚇', label: 'ARCADE', colors: 'linear-gradient(135deg, #e0a544, #567a8a)', url: 'https://subwaysurfers.com/' },
  { name: 'Temple Run 2', genre: 'Arcade · Endless runner', category: ['Browser'], emoji: '🏃', label: 'ARCADE', colors: 'linear-gradient(135deg, #bc7243, #5d4645)', url: 'https://www.imangi.com/games/temple-run-2/' },
  { name: 'Crossy Road', genre: 'Arcade · Quick reflexes', category: ['Browser'], emoji: '🐔', label: 'ARCADE', colors: 'linear-gradient(135deg, #6d9f62, #405a5d)', url: 'https://www.crossyroad.com/' },
  { name: 'Pac-Man', genre: 'Arcade · Classic', category: ['Browser'], emoji: '🟡', label: 'ARCADE', colors: 'linear-gradient(135deg, #7761bd, #3b3867)', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
  { name: 'Space Invaders', genre: 'Arcade · Classic', category: ['Browser'], emoji: '👾', label: 'ARCADE', colors: 'linear-gradient(135deg, #5d9b75, #334b5e)', url: 'https://www.freeinvaders.org/' },
  { name: 'Asteroids', genre: 'Arcade · Classic', category: ['Browser'], emoji: '☄️', label: 'ARCADE', colors: 'linear-gradient(135deg, #67799c, #34394f)', url: 'https://www.freeasteroids.org/' },
  { name: 'Breakout', genre: 'Arcade · Classic', category: ['Browser'], emoji: '🧱', label: 'ARCADE', colors: 'linear-gradient(135deg, #b46d57, #5d4055)', url: 'https://www.google.com/search?q=play+breakout' },
  { name: 'World’s Hardest Game', genre: 'Arcade · Challenge', category: ['Browser', 'Puzzle'], emoji: '🔴', label: 'CHALLENGE', colors: 'linear-gradient(135deg, #ca5556, #663a55)', url: 'https://www.coolmathgames.com/0-worlds-hardest-game' },
  { name: 'Happy Wheels', genre: 'Physics · Obstacle course', category: ['Browser'], emoji: '🚴', label: 'PHYSICS', colors: 'linear-gradient(135deg, #598b74, #3d4d57)', url: 'https://www.totaljerkface.com/happy_wheels.tjf' },
  { name: 'Fireboy and Watergirl', genre: 'Puzzle · Teamwork', category: ['Browser', 'Puzzle', 'Multiplayer'], emoji: '🔥', label: 'PUZZLE', colors: 'linear-gradient(135deg, #d06f50, #4d6385)', url: 'https://www.coolmathgames.com/0-fireboy-and-water-girl-forest-temple' },
  { name: 'Bob the Robber', genre: 'Puzzle · Sneaking', category: ['Browser', 'Puzzle'], emoji: '🥷', label: 'PUZZLE', colors: 'linear-gradient(135deg, #7776b7, #43435f)', url: 'https://www.bobtherobber.com/' },
  { name: 'OvO', genre: 'Platform · Precision', category: ['Browser'], emoji: '🕴️', label: 'PLATFORMER', colors: 'linear-gradient(135deg, #d3a14d, #71504c)', url: 'https://ovo-game.com/' },
  { name: 'Getaway Shootout', genre: 'Action · Two-player', category: ['Browser', 'Multiplayer'], emoji: '🏃', label: 'ACTION', colors: 'linear-gradient(135deg, #d16a53, #51416a)', url: 'https://www.coolmathgames.com/0-getaway-shootout' },
  { name: 'Duck Life', genre: 'Adventure · Racing', category: ['Browser'], emoji: '🦆', label: 'ADVENTURE', colors: 'linear-gradient(135deg, #6aa576, #405c5e)', url: 'https://www.ducklife.com/' },
  { name: 'Papa’s Pizzeria', genre: 'Cooking · Time management', category: ['Browser'], emoji: '🍕', label: 'COOKING', colors: 'linear-gradient(135deg, #d67c4f, #714c4b)', url: 'https://www.flipline.com/games/papaspizzeria/index.html' },
  { name: 'Papa’s Freezeria', genre: 'Cooking · Time management', category: ['Browser'], emoji: '🍦', label: 'COOKING', colors: 'linear-gradient(135deg, #71a6b3, #4d4a75)', url: 'https://www.flipline.com/games/papasfreezeria/index.html' },
  { name: 'Little Alchemy 2', genre: 'Puzzle · Discovery', category: ['Browser', 'Puzzle'], emoji: '🧪', label: 'PUZZLE', colors: 'linear-gradient(135deg, #7183c1, #44446f)', url: 'https://littlealchemy2.com/' },
  { name: 'Minesweeper', genre: 'Puzzle · Classic', category: ['Browser', 'Puzzle'], emoji: '💣', label: 'PUZZLE', colors: 'linear-gradient(135deg, #6887a8, #3d4b64)', url: 'https://minesweeper.online/' },
  { name: 'Sudoku.com', genre: 'Puzzle · Numbers', category: ['Browser', 'Puzzle'], emoji: '🔢', label: 'PUZZLE', colors: 'linear-gradient(135deg, #548f99, #39476a)', url: 'https://sudoku.com/' },
  { name: 'Chess.com', genre: 'Puzzle · Strategy', category: ['Browser', 'Puzzle', 'Multiplayer'], emoji: '♟️', label: 'STRATEGY', colors: 'linear-gradient(135deg, #629a73, #354c4c)', url: 'https://www.chess.com/' },
  { name: 'Wordle', genre: 'Puzzle · Daily words', category: ['Browser', 'Puzzle'], emoji: '🔤', label: 'PUZZLE', colors: 'linear-gradient(135deg, #759558, #3d594d)', url: 'https://www.nytimes.com/games/wordle/index.html' },
  { name: 'Google Solitaire', genre: 'Puzzle · Cards', category: ['Browser', 'Puzzle'], emoji: '🃏', label: 'PUZZLE', colors: 'linear-gradient(135deg, #588b70, #3b4d5c)', url: 'https://www.google.com/search?q=solitaire' },
  { name: 'Mahjong Solitaire', genre: 'Puzzle · Matching', category: ['Browser', 'Puzzle'], emoji: '🀄', label: 'PUZZLE', colors: 'linear-gradient(135deg, #aa7952, #614855)', url: 'https://www.mahjongsolitaire.com/' },
  { name: 'Hextris', genre: 'Puzzle · Falling blocks', category: ['Browser', 'Puzzle'], emoji: '⬡', label: 'PUZZLE', colors: 'linear-gradient(135deg, #7964c5, #433e70)', url: 'https://hextris.io/' },
  { name: 'Snake', genre: 'Arcade · Classic', category: ['Browser'], emoji: '🐍', label: 'CLASSIC', colors: 'linear-gradient(135deg, #72a65c, #3e5c4c)', url: 'https://playsnake.org/' },
  { name: 'Tetris', genre: 'Puzzle · Classic', category: ['Browser', 'Puzzle'], emoji: '🧱', label: 'PUZZLE', colors: 'linear-gradient(135deg, #8762d0, #493f78)', url: 'https://www.tetris.com/play-tetris' },
  { name: 'Agar.io', genre: 'Arcade · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🔵', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #4e78bd, #33426b)', url: 'https://agar.io/' },
  { name: 'Slither.io', genre: 'Arcade · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🐍', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #6e9d53, #3b5845)', url: 'https://slither.io/' },
  { name: '2v2 LOL', genre: 'Building · Battle royale', category: ['Browser', 'Multiplayer'], emoji: '🧱', label: 'ACTION', colors: 'linear-gradient(135deg, #d26b5e, #69426a)', url: 'https://1v1lol.gg/1v1-lol.embed' },
  { name: '1v1 LOL', genre: 'Building · Battle royale', category: ['Browser', 'Multiplayer'], emoji: '🧱', label: 'ACTION', colors: 'linear-gradient(135deg, #d26b5e, #69426a)', url: 'https://1v1lolunblocked.com/games/1v1-lol/index.html' },
  { name: 'Kour.io', genre: 'FPS · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🎯', label: 'ACTION', colors: 'linear-gradient(135deg, #5b83b8, #3c426f)', url: 'https://kour.io/' },
  { name: 'Venge.io', genre: 'FPS · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🔫', label: 'ACTION', colors: 'linear-gradient(135deg, #698a50, #3b5361)', url: 'https://venge.io/' },
  { name: 'War Brokers', genre: 'FPS · Vehicles · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🚁', label: 'ACTION', colors: 'linear-gradient(135deg, #9e774b, #4b495f)', url: 'https://warbrokers.io/' },
  { name: 'ev.io', genre: 'Sci-fi shooter · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🤖', label: 'ACTION', colors: 'linear-gradient(135deg, #6371b4, #433d70)', url: 'https://ev.io/' },
  { name: 'Shell Shockers', genre: 'Action · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🥚', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #d09e4a, #685048)', url: 'https://shellshock.io/' },
  { name: 'Skribbl.io', genre: 'Drawing · Guessing', category: ['Browser', 'Multiplayer'], emoji: '✏️', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #9571b6, #4b456e)', url: 'https://skribbl.io/' },
  { name: 'Gartic Phone', genre: 'Drawing · Party', category: ['Browser', 'Multiplayer'], emoji: '📞', label: 'PARTY', colors: 'linear-gradient(135deg, #ce7758, #704c72)', url: 'https://garticphone.com/' },
  { name: 'Taming.io', genre: 'Adventure · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🐾', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #76a65c, #405d57)', url: 'https://taming.io/' },
  { name: 'Mope.io', genre: 'Adventure · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🦊', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #cb8752, #67505b)', url: 'https://mope.io/' },
  { name: 'Paper.io 2', genre: 'Arcade · Territory', category: ['Browser', 'Multiplayer'], emoji: '🟦', label: 'ARCADE', colors: 'linear-gradient(135deg, #648fd0, #494575)', url: 'https://paper-io.com/' },
  { name: 'Cookie Clicker', genre: 'Clicker · Cozy', category: ['Browser'], emoji: '🍪', label: 'CLICKER', colors: 'linear-gradient(135deg, #b3794e, #68434a)', url: 'https://orteil.dashnet.org/cookieclicker/' },
  { name: 'Idle Breakout', genre: 'Arcade · Clicker', category: ['Browser'], emoji: '🟠', label: 'CLICKER', colors: 'linear-gradient(135deg, #bd7050, #66455b)', url: 'https://www.coolmathgames.com/0-idle-breakout' },
  { name: 'Tiny Fishing', genre: 'Arcade · Fishing', category: ['Browser'], emoji: '🎣', label: 'ARCADE', colors: 'linear-gradient(135deg, #4c9eaf, #3c4e73)', url: 'https://tinyfishing.com/' },
  { name: 'Eggy Car', genre: 'Racing · Balance', category: ['Browser'], emoji: '🥚', label: 'RACING', colors: 'linear-gradient(135deg, #7ba85c, #45604e)', url: 'https://eggycar.io/' },
  { name: 'Drive Mad', genre: 'Racing · Physics', category: ['Browser'], emoji: '🚗', label: 'RACING', colors: 'linear-gradient(135deg, #568cb5, #3d4c72)', url: 'https://drive-mad.com/' },
  { name: 'Tunnel Rush', genre: 'Arcade · Reflexes', category: ['Browser'], emoji: '🌀', label: 'ARCADE', colors: 'linear-gradient(135deg, #bd5a83, #513d72)', url: 'https://tunnelrush.io/' },
  { name: 'Moto X3M Winter', genre: 'Racing · Stunt', category: ['Browser'], emoji: '❄️', label: 'RACING', colors: 'linear-gradient(135deg, #6fa8bd, #435273)', url: 'https://motox3m.io/' },
  { name: 'Moto X3M Pool Party', genre: 'Racing · Stunt', category: ['Browser'], emoji: '🌊', label: 'RACING', colors: 'linear-gradient(135deg, #52aab0, #41517d)', url: 'https://motox3m.io/' },
  { name: 'Doodle Jump', genre: 'Arcade · Platform', category: ['Browser'], emoji: '👾', label: 'ARCADE', colors: 'linear-gradient(135deg, #70a66a, #465b66)', url: 'https://doodlejump.io/' },
  { name: 'Color Switch', genre: 'Arcade · Reflexes', category: ['Browser'], emoji: '🌈', label: 'ARCADE', colors: 'linear-gradient(135deg, #d06a76, #564e8c)', url: 'https://colorswitch.co/' },
  { name: 'Stack', genre: 'Arcade · Timing', category: ['Browser'], emoji: '📚', label: 'ARCADE', colors: 'linear-gradient(135deg, #5793a0, #3d4c70)', url: 'https://stackgame.io/' },
  { name: 'Solitaire', genre: 'Puzzle · Cards', category: ['Browser', 'Puzzle'], emoji: '🂡', label: 'PUZZLE', colors: 'linear-gradient(135deg, #548f71, #3a4e5d)', url: 'https://www.solitr.com/' },
  { name: 'Checkers', genre: 'Puzzle · Strategy', category: ['Browser', 'Puzzle', 'Multiplayer'], emoji: '🔴', label: 'STRATEGY', colors: 'linear-gradient(135deg, #bc625d, #594363)', url: 'https://www.checkers.online/' },
  { name: 'Master Chess', genre: 'Puzzle · Strategy', category: ['Browser', 'Puzzle', 'Multiplayer'], emoji: '♞', label: 'STRATEGY', colors: 'linear-gradient(135deg, #9a7950, #51455f)', url: 'https://www.coolmathgames.com/0-master-chess' },
  { name: 'Parking Fury', genre: 'Racing · Parking', category: ['Browser'], emoji: '🅿️', label: 'RACING', colors: 'linear-gradient(135deg, #647bb4, #404563)', url: 'https://www.coolmathgames.com/0-parking-fury' },
  { name: 'City Car Driving', genre: 'Racing · Driving', category: ['Browser'], emoji: '🚕', label: 'RACING', colors: 'linear-gradient(135deg, #558b99, #3c4b67)', url: 'https://citycardriving.com/' },
  { name: 'Ducklings.io', genre: 'Arcade · Collecting', category: ['Browser', 'Multiplayer'], emoji: '🐥', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #d8ab50, #65704d)', url: 'https://ducklings.io/' },
  { name: 'Bonk.io', genre: 'Arcade · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🟣', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #806bb7, #424462)', url: 'https://bonk.io/' },
  { name: 'Google Minesweeper', genre: 'Puzzle · Classic', category: ['Browser', 'Puzzle'], emoji: '💣', label: 'PUZZLE', colors: 'linear-gradient(135deg, #6a879d, #404b65)', url: 'https://www.google.com/search?q=minesweeper' },
  { name: 'Google Tic-Tac-Toe', genre: 'Puzzle · Two-player', category: ['Browser', 'Puzzle', 'Multiplayer'], emoji: '⭕', label: 'PUZZLE', colors: 'linear-gradient(135deg, #688eb8, #4b4d7a)', url: 'https://www.google.com/search?q=tic+tac+toe' },
  { name: '2048', genre: 'Number puzzle · Classic', category: ['Browser', 'Puzzle'], emoji: '🔢', label: 'PUZZLE', colors: 'linear-gradient(135deg, #d5a54e, #8d6547)', url: 'https://gabrielecirulli.github.io/2048/' },
  { name: 'Flappy Bird', genre: 'Arcade · Quick reflexes', category: ['Browser'], emoji: '🐤', label: 'ARCADE', colors: 'linear-gradient(135deg, #7cb8c2, #496c83)', url: 'https://flappybird.io/' },
  { name: 'Chrome Dino', genre: 'Arcade · Endless runner', category: ['Browser'], emoji: '🦖', label: 'ARCADE', colors: 'linear-gradient(135deg, #879284, #4b594e)', url: 'https://chromedino.com/' },
  { name: 'Achievement Unlocked 3', genre: 'Platform · Adventure', category: ['Browser'], emoji: '🏆', label: 'ADVENTURE', colors: 'linear-gradient(135deg, #5c9d85, #394d68)', url: 'https://gnhustgames.org/achievementunlocked3-source/', provider: 'GNHUSTGames' },
  { name: 'Flappy Dunk', genre: 'Arcade · Basketball', category: ['Browser'], emoji: '🏀', label: 'ARCADE', colors: 'linear-gradient(135deg, #ca7950, #6b4552)', url: 'https://gnhustgames.org/flappydunk-source/', provider: 'GNHUSTGames' },
  { name: 'Granny 3', genre: 'Horror · Adventure', category: ['Browser'], emoji: '👵', label: 'ADVENTURE', colors: 'linear-gradient(135deg, #62658e, #3e3d57)', url: 'https://gnhustgames.org/granny3-source/', provider: 'GNHUSTGames' },
  { name: 'ClusterTruck', genre: 'Action · Platform', category: ['Browser'], emoji: '🚚', label: 'ACTION', colors: 'linear-gradient(135deg, #c8704d, #55415b)', url: 'https://gnhustgames.org/clustertruck-source/', provider: 'GNHUSTGames' },
  { name: 'Celeste', genre: 'Platform · Adventure', category: ['Browser'], emoji: '🏔️', label: 'PLATFORMER', colors: 'linear-gradient(135deg, #627cba, #454269)', url: 'https://gnhustgames.org/celeste-source/', provider: 'GNHUSTGames' },
  { name: 'Space Waves', genre: 'Arcade · Reflexes', category: ['Browser'], emoji: '🌌', label: 'ARCADE', colors: 'linear-gradient(135deg, #6572ba, #393b69)', url: 'https://gnhustgames.org/spacewaves-source/', provider: 'GNHUSTGames' },
  { name: 'Wrestle Bros', genre: 'Sports · Wrestling', category: ['Browser', 'Multiplayer'], emoji: '🤼', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #c66c50, #66445b)', url: 'https://gnhustgames.org/wrestlebros-source/', provider: 'GNHUSTGames' },
  { name: 'Game Inside a Game Inside a Game...', genre: 'Puzzle · Platform', category: ['Browser', 'Puzzle'], emoji: '🎮', label: 'PUZZLE', colors: 'linear-gradient(135deg, #7669b8, #43436e)', url: 'https://3kh0.github.io/projects/game-inside/', provider: '3kh0' },
  { name: 'Achievement Unlocked', genre: 'Platform · Challenge', category: ['Browser'], emoji: '🏅', label: 'CHALLENGE', colors: 'linear-gradient(135deg, #679b70, #405754)', url: 'https://3kh0.github.io/projects/achievementunlocked/', provider: '3kh0' },
  { name: 'Avalanche', genre: 'Arcade · Survival', category: ['Browser'], emoji: '🏂', label: 'ARCADE', colors: 'linear-gradient(135deg, #5c8faf, #3e4a71)', url: 'https://3kh0.github.io/projects/avalanche/', provider: '3kh0' },
  { name: 'Cannon Basketball 4', genre: 'Sports · Puzzle', category: ['Browser', 'Puzzle'], emoji: '🏀', label: 'PUZZLE', colors: 'linear-gradient(135deg, #c87949, #71504b)', url: 'https://3kh0.github.io/projects/cannon-basketball-4/', provider: '3kh0' },
  { name: 'Factory Balls Forever', genre: 'Puzzle · Logic', category: ['Browser', 'Puzzle'], emoji: '🎨', label: 'PUZZLE', colors: 'linear-gradient(135deg, #6a88b7, #49456b)', url: 'https://3kh0.github.io/projects/factoryballs/', provider: '3kh0' },
  { name: 'Madalin Stunt Cars 2', genre: 'Racing · Driving', category: ['Browser', 'Multiplayer'], emoji: '🏎️', label: 'RACING', colors: 'linear-gradient(135deg, #4c91a1, #41456e)', url: 'https://3kh0.github.io/projects/madalin-stunt-cars-2/', provider: '3kh0' },
  { name: 'Super Mario 64', genre: 'Platform · Adventure', category: ['Browser'], emoji: '🍄', label: 'ADVENTURE', colors: 'linear-gradient(135deg, #d17b4c, #63507a)', url: 'https://3kh0.github.io/projects/sm64/', provider: '3kh0' },
  { name: 'Red Ball 4', genre: 'Platform · Adventure', category: ['Browser'], emoji: '🔴', label: 'PLATFORMER', colors: 'linear-gradient(135deg, #c75457, #583b60)', url: 'https://mc0825.github.io/g22/class-491', provider: 'Classroom 6x' },
  { name: 'Idle Digging Tycoon', genre: 'Simulation · Clicker', category: ['Browser'], emoji: '⛏️', label: 'SIMULATION', colors: 'linear-gradient(135deg, #bc9a53, #5d514b)', url: 'https://mc0825.github.io/g72/class-581', provider: 'Classroom 6x' },
  { name: '2 Minute Football', genre: 'Sports · Football', category: ['Browser'], emoji: '🏈', label: 'SPORTS', colors: 'linear-gradient(135deg, #548c68, #3c5261)', url: 'https://mc0825.github.io/g22/class-370', provider: 'Classroom 6x' },
  { name: 'Stickman Archero Fight', genre: 'Action · Fighting', category: ['Browser'], emoji: '🥷', label: 'ACTION', colors: 'linear-gradient(135deg, #7371ae, #414260)', url: 'https://mc0825.github.io/g50/class-6', provider: 'Classroom 6x' },
  { name: 'Shady Bears', genre: 'Arcade · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🐻', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #6f9c5a, #405b50)', url: 'https://mc0825.github.io/g22/class-379', provider: 'Classroom 6x' },
  { name: 'Bullet Bro', genre: 'Action · Shooting', category: ['Browser'], emoji: '🎯', label: 'ACTION', colors: 'linear-gradient(135deg, #9d674d, #4c4263)', url: 'https://mc0825.github.io/g50/class-29', provider: 'Classroom 6x' },
  { name: 'Bloxd.io', genre: 'Sandbox · Multiplayer', category: ['Browser', 'Multiplayer'], emoji: '🧱', label: 'MULTIPLAYER', colors: 'linear-gradient(135deg, #478c9b, #374a6b)', url: 'https://www.crazygames.com/embed/bloxdhop-io', provider: 'CrazyGames', sourceRank: 4 }
];

const gameIndexes = new Map();

function normalizedGameName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function registerGame(game) {
  const normalizedName = normalizedGameName(game.name);
  const existingIndex = gameIndexes.get(normalizedName);
  if (existingIndex === undefined) {
    gameIndexes.set(normalizedName, games.length);
    games.push(game);
    return;
  }

  const existingGame = games[existingIndex];
  const currentRank = existingGame.sourceRank ?? 2;
  if ((game.sourceRank ?? 2) > currentRank) {
    const categories = [...new Set([...existingGame.category, ...game.category])];
    games[existingIndex] = {
      ...existingGame,
      ...game,
      category: categories,
      genre: existingGame.genre || game.genre,
      emoji: existingGame.emoji || game.emoji,
      colors: existingGame.colors || game.colors,
      label: categories.includes('Multiplayer') ? 'MULTIPLAYER' : categories.includes('Puzzle') ? 'PUZZLE' : existingGame.label || game.label
    };
  }
}

games.forEach((game, index) => gameIndexes.set(normalizedGameName(game.name), index));

const onlineGameColors = [
  'linear-gradient(135deg, #478c9b, #374a6b)',
  'linear-gradient(135deg, #9b6bc0, #49416f)',
  'linear-gradient(135deg, #6f9c5a, #405b50)',
  'linear-gradient(135deg, #ca7950, #6b4552)',
  'linear-gradient(135deg, #5a7fc0, #3e426e)',
  'linear-gradient(135deg, #b2954e, #60504c)'
];

const onlineGameEmojis = [
  ['car', '🏎️'], ['racing', '🏁'], ['drift', '🚘'], ['football', '🏈'],
  ['soccer', '⚽'], ['basket', '🏀'], ['ball', '🎮'], ['shoot', '🎯'],
  ['gun', '🎯'], ['flying', '✈️'], ['airplane', '✈️'], ['flight', '✈️'],
  ['parkour', '🏃'], ['running', '🏃'], ['stickman', '🏃'], ['snake', '🐍'],
  ['puzzle', '🧩'], ['word', '🔤'], ['chess', '♟️'], ['cooking', '🍳'],
  ['food', '🍔'], ['fish', '🎣'], ['dress', '👗'], ['beauty', '💄'],
  ['love', '💖'], ['zombie', '🧟'], ['monster', '👾'], ['space', '🚀']
];

function addOnlineGames() {
  const catalog = Array.isArray(window.onlineGamesCatalog) ? window.onlineGamesCatalog : [];

  catalog.forEach((entry) => {
    const name = typeof entry.title === 'string' ? entry.title.trim() : '';
    let url;
    let imageUrl;
    try {
      url = new URL(entry.embed);
      imageUrl = new URL(entry.image);
    } catch {
      return;
    }

    const allowedHosts = ['www.onlinegames.io', 'cloud.onlinegames.io'];
    if (!name || !allowedHosts.includes(url.hostname) || url.protocol !== 'https:' ||
        !allowedHosts.includes(imageUrl.hostname) || imageUrl.protocol !== 'https:') {
      return;
    }

    const tags = typeof entry.tags === 'string' ? entry.tags.toLowerCase().split(',') : [];
    const categories = ['Browser'];
    if (tags.includes('multiplayer') || tags.includes('2-player')) categories.push('Multiplayer');
    if (tags.some((tag) => ['puzzle', 'logic', 'chess', 'mahjong', 'sudoku', 'word', 'brain'].includes(tag))) {
      categories.push('Puzzle');
    }
    const emoji = onlineGameEmojis.find(([keyword]) => tags.some((tag) => tag.includes(keyword)))?.[1] ?? '🎮';
    const colorIndex = [...name].reduce((total, character) => total + character.charCodeAt(0), 0) % onlineGameColors.length;

    const catalogGame = {
      name,
      genre: tags.filter((tag) => !['1-player', '2-player', '3d', '2d', 'free', 'unity', 'html5', 'mobile', 'mouse'].includes(tag)).slice(0, 2).join(' · ') || 'Browser game',
      category: categories,
      emoji,
      label: categories.includes('Multiplayer') ? 'MULTIPLAYER' : categories.includes('Puzzle') ? 'PUZZLE' : 'BROWSER',
      colors: onlineGameColors[colorIndex],
      url: url.href,
      image: imageUrl.href,
      provider: 'OnlineGames.io',
      sourceRank: 4
    };
    registerGame(catalogGame);
  });
}

function addPartnerGames() {
  const catalog = Array.isArray(window.partnerGames) ? window.partnerGames : [];

  catalog.forEach((entry) => {
    const name = typeof entry.title === 'string' ? entry.title.trim() : '';
    let url;
    let imageUrl;
    try {
      url = new URL(entry.url);
      if (entry.image) imageUrl = new URL(entry.image);
    } catch {
      return;
    }

    if (!name || url.protocol !== 'https:' ||
        (imageUrl && imageUrl.protocol !== 'https:')) {
      return;
    }

    const description = `${entry.category || ''} ${name}`.toLowerCase();
    const categories = ['Browser'];
    if (/\b(multiplayer|2[- ]player|io games)\b/.test(description)) categories.push('Multiplayer');
    if (/\b(puzzle|logic|chess|mahjong|sudoku|word|brain|board|math)\b/.test(description)) categories.push('Puzzle');
    const emoji = onlineGameEmojis.find(([keyword]) => description.includes(keyword))?.[1] ?? '🎮';
    const colorIndex = [...name].reduce((total, character) => total + character.charCodeAt(0), 0) % onlineGameColors.length;
    const descriptiveCategory = entry.category?.split(/[,&|]/)[0]?.trim();

    registerGame({
      name,
      genre: descriptiveCategory || 'Browser game',
      category: categories,
      emoji,
      label: categories.includes('Multiplayer') ? 'MULTIPLAYER' : categories.includes('Puzzle') ? 'PUZZLE' : 'BROWSER',
      colors: onlineGameColors[colorIndex],
      url: url.href,
      ...(imageUrl ? { image: imageUrl.href } : {}),
      provider: entry.provider,
      sourceRank: Number.isFinite(entry.rank) ? entry.rank : 2
    });
  });
}

const grid = document.getElementById('game-grid');
const searchInput = document.getElementById('game-search');
const resultCount = document.getElementById('results-count');
const loadMoreButton = document.getElementById('load-more-games');
const emptyState = document.getElementById('empty-state');
const playerPanel = document.getElementById('player-panel');
const playerFrame = document.getElementById('game-frame');
const playerTitle = document.getElementById('player-title');
const playerStatus = document.getElementById('player-status');
let selectedCategory = 'All';
const pageSize = 60;
let visibleGameCount = pageSize;

function openGame(game) {
  playerTitle.textContent = game.name;
  playerFrame.title = `${game.name} game`;
  playerFrame.src = game.url;
  playerStatus.textContent = game.provider
    ? `Loading the ${game.provider} embed inside GameShelf.`
    : 'This game is loading inside GameShelf. If the player stays blank, the game site may not allow embedding.';
  playerPanel.hidden = false;
  playerPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeGame() {
  playerFrame.src = 'about:blank';
  playerPanel.hidden = true;
}

function createGameCard(game) {
  const card = document.createElement('article');
  card.className = 'game-card';

  const art = document.createElement('div');
  art.className = 'game-art';
  art.style.setProperty('--card-bg', game.colors);

  const label = document.createElement('span');
  label.className = 'game-label';
  label.textContent = game.label;

  const emoji = document.createElement('span');
  emoji.className = 'game-emoji';
  emoji.setAttribute('aria-hidden', 'true');
  emoji.textContent = game.emoji;
  if (game.image) {
    const image = document.createElement('img');
    image.className = 'game-cover';
    image.src = game.image;
    image.alt = '';
    image.loading = 'lazy';
    image.addEventListener('error', () => image.remove(), { once: true });
    art.append(label, image);
    emoji.hidden = true;
  } else {
    art.append(emoji);
  }
  art.prepend(label);

  const details = document.createElement('div');
  details.className = 'game-details';
  const name = document.createElement('h3');
  name.className = 'game-name';
  name.textContent = game.name;
  const genre = document.createElement('p');
  genre.className = 'game-genre';
  genre.textContent = game.genre;
  if (game.provider) {
    const provider = document.createElement('p');
    provider.className = 'game-provider';
    provider.textContent = `Embedded from ${game.provider}`;
    details.append(name, genre, provider);
  } else {
    details.append(name, genre);
  }

  const link = document.createElement('a');
  link.className = 'play-link';
  link.href = '#game-player';
  link.setAttribute('aria-label', `Play ${game.name} here`);
  link.innerHTML = 'Play here <span aria-hidden="true">▶</span>';
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openGame(game);
  });
  details.append(link);
  card.append(art, details);
  return card;
}

function renderGames() {
  const search = searchInput.value.trim().toLowerCase();
  const filteredGames = games.filter((game) => {
    const matchesCategory = selectedCategory === 'All' || game.category.includes(selectedCategory);
    const matchesSearch = `${game.name} ${game.genre} ${game.label}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  const visibleGames = filteredGames.slice(0, visibleGameCount);
  grid.replaceChildren(...visibleGames.map(createGameCard));
  resultCount.textContent = `${filteredGames.length} ${filteredGames.length === 1 ? 'game' : 'games'}`;
  loadMoreButton.hidden = visibleGameCount >= filteredGames.length;
  loadMoreButton.textContent = `Show more games (${visibleGames.length} of ${filteredGames.length})`;
  emptyState.hidden = filteredGames.length > 0;
  grid.hidden = filteredGames.length === 0;
}

function selectCategory(category) {
  selectedCategory = category;
  visibleGameCount = pageSize;
  document.querySelectorAll('[data-category]').forEach((button) => {
    const isSelected = button.dataset.category === category;
    button.classList.toggle('active', isSelected && button.classList.contains('nav-link'));
    button.classList.toggle('selected', isSelected && button.classList.contains('filter-chip'));
    button.setAttribute('aria-pressed', String(isSelected));
  });
  renderGames();
}

document.querySelectorAll('[data-category]').forEach((button) => {
  button.addEventListener('click', () => selectCategory(button.dataset.category));
});

searchInput.addEventListener('input', () => {
  visibleGameCount = pageSize;
  renderGames();
});
loadMoreButton.addEventListener('click', () => {
  visibleGameCount += pageSize;
  renderGames();
});
document.getElementById('reset-search').addEventListener('click', () => {
  searchInput.value = '';
  selectCategory('All');
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

document.getElementById('close-player').addEventListener('click', closeGame);
document.getElementById('fullscreen-button').addEventListener('click', () => {
  playerFrame.parentElement.requestFullscreen().catch((error) => {
    playerStatus.textContent = 'Fullscreen is not available in this browser. You can still play in the window above.';
    console.error('Could not enter fullscreen:', error);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

addPartnerGames();
addOnlineGames();
renderGames();
