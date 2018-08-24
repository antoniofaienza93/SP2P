/*
 * ===========================================================================
 * File: Boot.js - 1 
 * Author: Antonio Faienza
 * Desc: Boot is our special state: it just adjusts stage size and scale.  
 * ===========================================================================
 */


var P2PMaze = P2PMaze || {};

// is the function that is called from state inside main.js
P2PMaze.Boot = function () {
    console.log("%cStarting Boot State", "color:white; background:red");
};


//setting game configuration and loading the assets for the PreloadState
P2PMaze.Boot.prototype = {

    /*
    * assets we'll use in the Preloading Screen
    */
    preload: function () {

        // this.load.image('logo', 'assets/images/zenvalogo.png');
        this.load.image('logoPhaser', 'assets/images/logo/phaser_big.png');

        

        // Preloader Bar - TODO Da Cambiare forse
        // this.load.image('preloadbar', 'assets/images/preloader-bar.png');

        // load Button Play -  https://www.iconfinder.com/icons/3049265/audio_button_control_multimedia_play_video_icon 
        this.load.spritesheet('button_play', 'assets/buttons/play-3-512.png');


        // load FONT 
        // this.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');

        // load sound start play
        this.load.audio('startMenu', 'assets/sounds/FX243.mp3');

    },
    create: function () {

        // background color 
        this.game.stage.backgroundColor = GAME.BACKGROUND_COLOR;  

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
