/*
 * ===========================================================================
 * File: Game.js - 4 
 * Author: Antonio Faienza
 * Desc: TODO 
 * ===========================================================================
 */
var P2PMaze = P2PMaze || {};

var map;
var backgroudLayer; 
var blockedLayer;
var cursor;  


P2PMaze.Game = function(){
    console.log("%cStarting Game", "color:black; background:yellow");
};

P2PMaze.Game.prototype = {
    preload: function() {
        // TODO da togliere il preload che qui non dovrebbe servire 
        this.game.load.tilemap('temp', 'assets/tilemaps/temp.json', null,Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tempImage', 'assets/images/tiles.png');
    }, 
    create: function() {

       map = this.game.add.tilemap('temp'); 

       map.addTilesetImage('tiles','tempImage');

       // create the layer 
       backgroudLayer = map.createLayer('backgroudLayer');
       blockedLayer = map.createLayer('blockedLayer');


       
       
    }
};