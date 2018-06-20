/*
 * ===========================================================================
 * File: MainMenu.js - 3 
 * Author: Antonio Faienza
 * Desc: TODO 
 * ===========================================================================
 */
var P2PMaze = P2PMaze || {};

P2PMaze.MainMenu = function(){
    console.log("%cStarting MainMenu", "color:white; background:grey");
};

P2PMaze.MainMenu.prototype = {
    preload: function() {

    }, 
    create: function() {

       //  ...
       
       this.state.start('Game');
    }
};