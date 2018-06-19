/*
 * ===========================================================================
 * File: Boot.js - 1 
 * Author: Antonio Faienza
 * Desc: TODO  
 * ===========================================================================
 */

 var Labyrinth = Labyrinth || {};

 // is the function that is called from state inside main.js
 Labyrinth.Boot = function(){
    console.log("%cStarting Boot State", "color:white; background:red");
 };

 //setting game configuration and loading the assets for the PreloadState
 Labyrinth.Boot.prototype = {
     preload: function() {

     }, 
     create: function() {

        //  ...

        this.state.start('Preload');
     }
 };
