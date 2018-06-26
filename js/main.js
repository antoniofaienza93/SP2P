/*
 * ===========================================================================
 * File: main.js - 0 
 * Author: Antonio Faienza
 * Desc: TODO - https://phaser.io/examples/v2/p2-physics/state-reset
 * ===========================================================================
 */




var config = {
    type: Phaser.AUTO,  // rendering. Automatic choise between PHASER.WEBGL or PHASER.CANVAS
    width:  SCREEN_SIZE.WIDTH,        // View Pixel Tile Map i.e. if width is 20 cells x 16 pixel = 704. IT'S CONTAINED INSIDE GAME CONTAINER 
    height: SCREEN_SIZE.HEIGHT,         // as width 
                        // the other @param are optional - https://phaser.io/docs/2.4.4/Phaser.Game.html
    parent: 'P2PMaze'
    
    
    
};

// namespace for avoid conflicts with other library
// Means that if the object exists already, we’ll use it. Otherwise we’ll use a new object.
var P2PMaze =  P2PMaze || {};

P2PMaze.game = new Phaser.Game(config);

// Add all state to the game. The first @param is unofficial name, the second @param is the official function's name 
// to call inside such state as can be seen for example in Boot.js 
P2PMaze.game.state.add('Boot', P2PMaze.Boot);
P2PMaze.game.state.add('Preload', P2PMaze.Preload);
P2PMaze.game.state.add('MainMenu', P2PMaze.MainMenu);
P2PMaze.game.state.add('Game', P2PMaze.Game);


P2PMaze.game.state.start('Boot'); // After all the states are added, we start the game by calling the boot state


