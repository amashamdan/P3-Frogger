// Enemies our player must avoid

// counterEnemy is a varialbe used to determine how many times 'e' has been pressed to decide which
// image to use to draw the enemy: rocks or bugs.
var counterEnemy = 0;

// choice is also a variable which specifies the image to be chosen for the enemy character
// The choice is made from an array (this.sprites) which contains urls of enemy images.
var choice = 0;

// instant variable is used in the Time class to display time, and in Gem class to calculate
// the time duration of showing and hiding the gem.
var instant = 0;

// Enemy class, it has the methods update(), render() and checkCollision()
var Enemy = function() {
    // The array (yLocations) contains all possible y positions for enemies.
    this.yLocations = [60,145,230];
    // This is a call to the dynamics() method which will give the enemy
    // an initial position and speed.
    this.dynamics();
    // The array containing images for enemy sprites: bugs or rocks.
    this.sprites = ['images/enemy-bug.png', 'images/Rock.png'];
};

Enemy.prototype.dynamics = function() {
    // The initial x location for all enemy instances are constant, while the y location is
    // chosen randomly from the array (yLocations)
    this.x = -100;
    this.y = this.yLocations[Math.floor(Math.random()*this.yLocations.length)];
    // The speed of each enemy is specified randomly using Math.random() function and then scaled
    // to acheive the desired speed.
    this.speed = ((Math.random() * 3) + 1)*100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // x position for all enemies is updated in the line below
    this.x = (this.x + (this.speed)*dt);
    // the following call of Enemy.checkCollision method checks if an enemy has collided
    // with the player.
    this.checkCollision();
    // This statement checks for enemies leaving the canvas on the right edge, if an enemy
    // leaves the canvas, it's assigned a new position (at the left of the canvas) and speed.
    if (this.x > 600) {
        this.dynamics();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // the index choice determines which image to choose from this.sprites array before the enemy
    // image is drawn on the canvas.
    this.sprite = this.sprites[choice];
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The following functions checks collisions between enemies and the player
// by comparing their locations.
Enemy.prototype.checkCollision = function() {
    if (Math.abs(this.x - player.x) < 65 && this.y - 10 == player.y) {
        // If a collision is detected, the score is reduced by 5 points,
        // and the player is returned to the inital location.
        score.update(-5);
        player.x = 201;
        player.y = 390;
    }
};

// This is a helper function to change the image of the enemies' character
// once 'e' is pressed. The reason why it wasn't made a method of Enemy is explained later on.
var enemyChanger = function(key) {
    if (key == 'e') {
        counterEnemy ++;
        // after the counter is increased, the counter is checked to determnie
        // whether its odd or even, odd counter will display a rock, while an
        // even number will display a bug (which gives a toggle effect).
        if (counterEnemy % 2 == 1) {
            for (var enemy in allEnemies) {
                this.choice = 1;
            }
        } else {
            for (enemy in allEnemies) {
                this.choice = 0;
            }
        }
    }
};

// This is Player class, it has an update(), render() and
// handleInput() methods.
var Player = function() {
    // Initial position of the player
    this.x = 201;
    this.y = 390;
    // Array containing all images of the player character.
    this.sprites = ['images/char-boy.png',
                    'images/char-cat-girl.png',
                    'images/char-horn-girl.png',
                    'images/char-pink-girl.png',
                    'images/char-princess-girl.png'];
    // spriteCounter is a variable holding the index of the player's image
    // to be shown. It is then used to load the image for the player.
    this.spriteCounter = 0;
    this.sprite = this.sprites[this.spriteCounter];
};

// The update method checks if the player reached the river, is so,
// the score is incremented by 10, and the player is returned to the initial location.
Player.prototype.update = function() {
    if (this.y <= -35) {
        this.y = 390;
        // A call to the update method of class Score.
        score.update(10);
    }
};

// Render method of the Player class
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The event handler for 'keydown' event. it decides whether to move the
// player up, left, right, or down.
Player.prototype.handleInput = function(key) {
    if (key == 'up' && this.y > -35) {
        this.y = this.y - 85;
    } else if (key == 'down' && this.y < 390) {
        this.y = this.y + 85;
    } else if (key == 'left' && this.x > 1) {
        this.x = this.x - 100;
    } else if (key == 'right' && this.x < 400) {
        this.x = this.x + 100;
    // If the key 'c' is pressed, the player image is changed by increasing
    // spriteCounter variable which determines the image to be loaded.
    } else if (key == 'c') {
        // spriteCounter is reset every time is exceeds the length of the sprites array.
        if (this.spriteCounter + 1 == 5) {
            this.spriteCounter = -1;
        }
        this.spriteCounter ++;
        // The new player image is saved.
        this.sprite = this.sprites[this.spriteCounter];
    }
};

// Score class, its methods are render() and update()
var Score = function() {
    // The score is saved in the variable result and initialized to 0
    this.result = 0;
};

Score.prototype.render = function() {
    // The font type is specified and the result is then displayed.
    ctx.font = "36pt impact";
    ctx.fillText("Score "+this.result, 10, 580);
};

Score.prototype.update = function(increment) {
    // The update method is called by Player upon reaching the river,
    // or by Enemy once a collision occur, or by Gems once a gem is collected.
    // The score is updated by the 'increment' parameter.
    this.result = this.result + increment;
};

// Time class with a render() method.
var Time = function() {
    // time is a variable in SECONDS, initialized to zero
    this.time = 0;
};

Time.prototype.render = function() {
    // instant is a variable incremented once every time render() is called
    // (60 times per second.)
    instant ++;
    // time in seconds is calculated by dividing instant by 60 and flooring
    // the result.
    this.time = Math.floor(instant/60);
    // time in seconds is drawn on the canvas
    ctx.fillText("Time "+this.time, 320, 580);
};

// Gems class, has the methods update(), render() and gemCheckCollision().
var Gems = function() {
    // The gem image is loaded
    this.sprite = 'images/Gem Green.png';
    // All possible corrdinates for x and y locations of the gem are stored
    // in xLocations and yLocaitons
    this.xLocations = [1, 101, 201, 301, 401];
    this.yLocations = [50, 135, 220];
};

Gems.prototype.update = function() {
    // Starting from second 5 and very 10 seconds, a new gem is shown for 5 seconds.
    // The instant variable with the modulus operator is used to determine the time
    // lapsed and the show a gem at the specified time.
    if (instant % 300 === 0 && (instant / 100) % 2 == 1) {
        this.x = this.xLocations[Math.floor(Math.random()*this.xLocations.length)];
        this.y = this.yLocations[Math.floor(Math.random()*this.yLocations.length)];
    // If a gem is not collected by the player, it disappears 5 seconds after it was displayed.
    // The gem is drawn outside the canvas
    } else if (instant % 300 === 0 && (instant / 100) % 2 === 0) {
        this.x = -100;
        this.y = -100;
    }
    // A call to gemCheckCollision to check if the player has collected a gem or not.
    this.gemCheckCollision();
};

Gems.prototype.render = function() {
    // A gem is drawn according to the position specified in the update method.
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// gemCheckCollision method, it is checked to see if the player collected a gem by
// comparing the positions of the gem and the player.
Gems.prototype.gemCheckCollision = function() {
    if (this.x == player.x && this.y == player.y) {
        // If the player collects the gem, the score is increaed by 5,
        // and the gem is removed from te canvas.
        score.update(5);
        this.x = -100;
        this.y = -100;
    }
};

// Objects are instantiated.
var player = new Player();
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}
var score = new Score();
var time = new Time();
var gem = new Gems();

// This listens for key presses and sends the keys to Player.handleInput()
// and enemyChanger().
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        // 'c' is added to change the player image. while 'e' changed the enemy image
        67: 'c',
        69: 'e'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    // Finally, enemyChanger() is called to check if the user wants to chenge the enemy image.
    // I didn't make this a method of Enemy because I didn't want to call it multiple
    // times for each enemy object whenever a key is pressed.
    enemyChanger(allowedKeys[e.keyCode]);
});
