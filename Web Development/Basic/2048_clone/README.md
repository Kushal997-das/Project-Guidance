# 2048

Introduction
2048 is a sliding block puzzle where the player uses arrow keys (or swipe gestures in mobile versions) to combine tiles with the same number. The game starts with two randomly placed tiles, each containing either 2 or 4, and players slide the tiles on a 4x4 grid to sum them up to reach 2048.

This implementation includes the basic mechanics of the 2048 game, score tracking, and a simple UI to make it easy to play.

How to Play
Use the arrow keys to slide all tiles in the desired direction.
When two tiles with the same number touch, they merge into one (e.g., 2 + 2 = 4, 4 + 4 = 8, etc.).
The goal is to create a tile with the number 2048.
The game ends if there are no more valid moves left (either no more empty spaces or no adjacent tiles with the same value).
Features
Classic 4x4 grid with sliding and combining tiles.
Score tracker that updates as you combine tiles.
Random placement of new tiles after each move.
Simple and intuitive interface for gameplay.
Game over detection when no more moves are possible.