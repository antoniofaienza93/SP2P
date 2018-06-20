/*
 * ===========================================================================
 * File: Preaload.js - 2 
 * Author: Antonio Faienza
 * Desc: TODO  
 * ===========================================================================
 */

var P2PMaze = P2PMaze || {};

P2PMaze.Preload = function(game){
    console.log("%cStarting Preload State", "color:white; background:green");
};

P2PMaze.Preload.prototype = {
    preload: function() {
       
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);
    }, 
    create: function() {
        // this.game.stage.backgroundColor ="#4488AA";
        
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // // this.scale.minWidth = 240;
        // // this.scale.minHeight = 170;
        // // this.scale.maxWidth = 2880;
        // // this.scale.maxHeight = 1920;

        // this.scale.pageAlignHorizontally = true;


        // //have the game centered horizontally
        // this.scale.pageAlignHorizontaly = true;
       //  ...
      
       this.state.start('MainMenu');
    }
};