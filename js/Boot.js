/*
 * ===========================================================================
 * File: Boot.js - 1 
 * Author: Antonio Faienza
 * Desc: Boot is our special state: it just adjusts stage size and scale.  
 * ===========================================================================
 */

 var P2PMaze = P2PMaze || {};


 // is the function that is called from state inside main.js
 P2PMaze.Boot = function(){
    console.log("%cStarting Boot State", "color:white; background:red");
 };


 //setting game configuration and loading the assets for the PreloadState
 P2PMaze.Boot.prototype = {
     preload: function() {
        // http://www.emanueleferonato.com/2014/08/28/phaser-tutorial-understanding-phaser-states/
        //assets we'll use in the loading screen
        this.load.image('logo', 'assets/images/zenvalogo.png');
        this.load.image('preloadbar', 'assets/images/preloader-bar.png');
            
     }, 
     create: function() {

        
        this.game.stage.backgroundColor ="#4488AA";
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.minWidth = 240;
        // this.scale.minHeight = 170;
        // this.scale.maxWidth = 2880;
        // this.scale.maxHeight = 1920;

        this.scale.pageAlignHorizontally = true;


        //have the game centered horizontally
        this.scale.pageAlignHorizontaly = true; 

        this.state.start('Preload');
        
        
     }
 };
