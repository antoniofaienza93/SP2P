/*
 * ===========================================================================
 * File: Preaload.js - 2 
 * Author: Antonio Faienza
 * Desc: TODO  
 * ===========================================================================
 */

var Labyrinth = Labyrinth || {};

Labyrinth.Preload = function(){
    console.log("%cStarting Preload State", "color:white; background:green");
};

Labyrinth.Boot.prototype = {
    preload: function() {

    }, 
    create: function() {

       //  ...
       
       this.state.start('MainMenu');
    }
};