/*
 * ===========================================================================
 * File: MainMenu.js - 3 
 * Author: Antonio Faienza
 * Desc: TODO 
 * ===========================================================================
 */
var Labyrinth = Labyrinth || {};

Labyrinth.MainMenu = function(){
    console.log("%cStarting MainMenu", "color:white; background:grey");
};

Labyrinth.Boot.prototype = {
    preload: function() {

    }, 
    create: function() {

       //  ...
       
       this.state.start('Game');
    }
};