/*
 * ===========================================================================
 * File: main.js - 0 
 * Author: Antonio Faienza
 * Desc: TODO 
 * ===========================================================================
 */


// namespace for avoid conflicts with other library
// Means that if the object exists already, we’ll use it. Otherwise we’ll use a new object.
var Labyrinth =  Labyrinth || {};

var config = {
    type: Phaser.AUTO,  // rendering. Automatic choise between PHASER.WEBGL or PHASER.CANVAS
    width:  800,        // View Pixel Tile Map i.e. if width is 20 cells x 16 pixel = 704. IT'S CONTAINED INSIDE GAME CONTAINER 
    height: 600         // as width 
                        // the other @param are optional - https://phaser.io/docs/2.4.4/Phaser.Game.html
    
};

Labyrinth.game = new Phaser.Game(config);

// Add all state to the game. The first @param is unofficial name, the second @param is the official function's name 
// to call inside such state as can be seen for example in Boot.js 
Labyrinth.game.state.add('Boot', Labyrinth.Boot);
Labyrinth.game.state.add('Preload', Labyrinth.Preload);
Labyrinth.game.state.add('MainMenu', Labyrinth.MainMenu);
Labyrinth.game.state.add('Game', Labyrinth.Game);


Labyrinth.game.state.start('Boot'); // After all the states are added, we start the game by calling the boot state