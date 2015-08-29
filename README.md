frontend-nanodegree-arcade-game
===============================

Welcome to Frogger!
A classic arcade game. Simple yet fun to play.
To start the game, simply right click on index.html and open it with a browser (ex: chrome).

The Goal:
===============================
The goal of the game is to acheive the highest score possible. The score is incremented if the 
player reaches the river or collects a gem. The score is decremented if the player is overrun 
by an enemy.

Gameplay:
===============================
The game starts with the player on the grass. The bottom left corner shows the score, while the
bottom left corner shows the time elapsed. The game can go on forever, to restart it the user needs
to refresh the page.

To increase the socre, the player needs to use the arrow keys to move from the 
grass to the river. Once the player makes it to the river, the score is incremented
 by 10, and the player is returned to the initial location.

Another way to increase the score is to collect gems. Starting the fifth second of the game,
a gem is shown every 10 seconds for a 5 seconds period. If the player manages to collect a gem,
the score is incremented by 5, and the gem is removed. (the player remians in position after a 
gem is collected).

Beware! A group of enemies won't be happy to see you increase your score. At any instant, a maximum
number of 3 enemies will be patroling the road to make sure they catch you. Once an enemy leaves the 
canvas a the right, a new enemy replaces it. Enemies move with random speeds... be careful. If the player
gets caught, the score is decremented by 5 and the player is returned to the original position.


Keys:
===============================
'E': changes the enemy character
'C': changes the player character
Up arrow: moves the player upwards
Down arrow: moves the player downwards
Left arrow: moves the player to the left
Right arrow: moves the player to the right

Scoring system:
===============================
+10 points if the player makes it to the river unharmed
+5 points if the player collects a gem
-5 points if the unfortuante happens and the player gets overrun by an enemy.

ENJOY! 

