/*
 * ===========================================================================
 * File: Preaload.js - 2 
 * Author: Antonio Faienza
 * Desc: TODO  
 * ===========================================================================
 */

var P2PMaze = P2PMaze || {};

var button;
var logo;
var loadText;

// sounds
var startMenu;

P2PMaze.Preload = function (game) {
    this.ready = false;
    console.log("%cStarting Preload State", "color:white; background:green");
};



P2PMaze.Preload.prototype = {
    // in this function we can load all the asset for the game. 
    preload: function () {

        // TODO - spostare tutto nel Preload 


        
    },
    create: function () {


        //	You can listen for each of these events from Phaser.Loader
        // REF: https://phaser.io/examples/v2/loader/load-events
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);

        // text = this.game.add.text(32, 32, 'Click to start load', { fill: '#ffffff' });
        loadText = this.game.add.text(this.game.world.centerX - 95, 400, '', { font: '30px Arial', fill: '#fff' });

        // map
        this.game.load.tilemap('maze', 'assets/tilemaps/maze_level1.json', null, Phaser.Tilemap.TILED_JSON);

        // tile
        this.game.load.image('mazeImage', 'assets/images/tiles.png');

        // life
        this.game.load.image('heart', 'assets/images/heart.png');

        // TODO CANCELLARE - vedere la grandezza dell'immagine        
        // 37x45 is the size of each frame
        //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
        //  blank frames at the end, so we tell the loader how many to load
        this.load.spritesheet('player', 'assets/images/player/dude.png', 32, 48);        
        this.load.spritesheet('opponentPlayer', 'assets/images/player/opponentdude.png', 32, 48); 
        // this.load.image('player', 'assets/images/player.png'); // Personaggio singolo importato da Tiled
        // this.load.image('player', 'assets/images/phaser-dude.png'); // Personaggio singolo 

        // TODO carichiamo le immagini
        // this.load.image('redcup', 'assets/images/estintore_piccolo.png');
        // this.load.image('greycup', 'assets/images/greencup.png');
        // this.load.image('bluecup', 'assets/images/bluecup.png');

        this.load.image('playerParticle', 'assets/images/particles/player-particle.png');

        // win particles
        this.load.image('blacklight', 'assets/images/particles/blacklight.png');
        this.load.image('bluelight', 'assets/images/particles/bluelight.png');
        this.load.image('brownlight', 'assets/images/particles/brownlight.png');
        this.load.image('greenlight', 'assets/images/particles/greenlight.png');
        this.load.image('orangelight', 'assets/images/particles/orangelight.png');
        this.load.image('redlight', 'assets/images/particles/redlight.png');
        this.load.image('violelight', 'assets/images/particles/violetlight.png');
        this.load.image('yellowlight', 'assets/images/particles/yellowlight.png');
        this.load.image('star_particle', 'assets/images/particles/star_particle.png');

        // sound
        this.load.audio('itemWrong', 'assets/sounds/itemWrong.wav');
        this.load.audio('itemCorrect', 'assets/sounds/itemCorrect.mp3');
        this.load.audio('win', 'assets/sounds/winSound.wav');
        this.load.audio('lose', 'assets/sounds/loseSound.wav');
        this.load.audio('wellDone', 'assets/sounds/wellDone.ogg');
        this.load.audio('selectMenu', 'assets/sounds/menu_switch.mp3');
        this.load.audio('choiceSelection', 'assets/sounds/FX241.mp3');


        // item
        this.load.image('Banana', ASSET_PATH.PATH_ITEM_48x48 + 'Banana' + ASSET_PATH.ITEM_48x48);
        this.load.image('Gorilla', ASSET_PATH.PATH_ITEM_48x48 + 'Gorilla' + ASSET_PATH.ITEM_48x48);
        this.load.image('Maschera', ASSET_PATH.PATH_ITEM_48x48 + 'Maschera' + ASSET_PATH.ITEM_48x48);
        this.load.image('RifiutiTossici', ASSET_PATH.PATH_ITEM_48x48 + 'RifiutiTossici' + ASSET_PATH.ITEM_48x48);
        this.load.image('Arpa', ASSET_PATH.PATH_ITEM_48x48 + 'Arpa' + ASSET_PATH.ITEM_48x48);
        this.load.image('Cerbero', ASSET_PATH.PATH_ITEM_48x48 + 'Cerbero' + ASSET_PATH.ITEM_48x48);
        this.load.image('Cesoie', ASSET_PATH.PATH_ITEM_48x48 + 'Cesoie' + ASSET_PATH.ITEM_48x48);
        this.load.image('Rovi', ASSET_PATH.PATH_ITEM_48x48 + 'Rovi' + ASSET_PATH.ITEM_48x48);
        this.load.image('Estintore', ASSET_PATH.PATH_ITEM_48x48 + 'Estintore' + ASSET_PATH.ITEM_48x48);
        this.load.image('Fuoco', ASSET_PATH.PATH_ITEM_48x48 + 'Fuoco' + ASSET_PATH.ITEM_48x48);
        this.load.image('Cuffie', ASSET_PATH.PATH_ITEM_48x48 + 'Cuffie' + ASSET_PATH.ITEM_48x48);
        this.load.image('Sirena', ASSET_PATH.PATH_ITEM_48x48 + 'Sirena' + ASSET_PATH.ITEM_48x48);
        this.load.image('BandieraRossa', ASSET_PATH.PATH_ITEM_48x48 + 'BandieraRossa' + ASSET_PATH.ITEM_48x48);
        this.load.image('Toro', ASSET_PATH.PATH_ITEM_48x48 + 'Toro' + ASSET_PATH.ITEM_48x48);
        this.load.image('Aglio', ASSET_PATH.PATH_ITEM_48x48 + 'Aglio' + ASSET_PATH.ITEM_48x48);
        this.load.image('Vampiro', ASSET_PATH.PATH_ITEM_48x48 + 'Vampiro' + ASSET_PATH.ITEM_48x48);
        this.load.image('Lampada', ASSET_PATH.PATH_ITEM_48x48 + 'Lampada' + ASSET_PATH.ITEM_48x48);
        this.load.image('Genio', ASSET_PATH.PATH_ITEM_48x48 + 'Genio' + ASSET_PATH.ITEM_48x48);
        this.load.image('Foglio', ASSET_PATH.PATH_ITEM_48x48 + 'Foglio' + ASSET_PATH.ITEM_48x48);
        this.load.image('Roccia', ASSET_PATH.PATH_ITEM_48x48 + 'Roccia' + ASSET_PATH.ITEM_48x48);
        this.load.image('Spinaci', ASSET_PATH.PATH_ITEM_48x48 + 'Spinaci' + ASSET_PATH.ITEM_48x48);
        this.load.image('Spada', ASSET_PATH.PATH_ITEM_48x48 + 'Spada' + ASSET_PATH.ITEM_48x48);
        this.load.image('Drago', ASSET_PATH.PATH_ITEM_48x48 + 'Drago' + ASSET_PATH.ITEM_48x48);
        this.load.image('Tesoro', ASSET_PATH.PATH_ITEM_48x48 + 'Tesoro' + ASSET_PATH.ITEM_48x48);

        // LOGO 
        logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 60, 'logoPhaser');
        logo.scale.setTo(0.45, 0.45);
        logo.anchor.setTo(0.5);


        // BUTTON
        button = this.game.add.button(this.game.world.centerX - 95, 450, 'button_play', this.actionClick, this);
        button.scale.setTo(0.3, 0.3);
        button.onInputOver.add(this.over, this);
        button.onInputOut.add(this.out, this);
        button.visible = false;

        // AUDIO
        startMenu = this.game.add.audio('startMenu'); 
        

        this.game.load.start();

    },
    loadStart: function(){
        loadText.setText("Loading ...");
        // console.log("Loading ...");
        
    },
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles){
        // loadText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles); // ORIGINAL
        loadText.setText("File Complete: " + progress + "%");
        // console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

    },
    loadComplete: function () {
        loadText.setText("Load Complete");
        // console.log("Load Complete");
        button.visible = true;
        this.ready = true;
    },
    over: function () {
        button.scale.setTo(0.33, 0.33);
    },
    out: function () {
        button.scale.setTo(0.3, 0.3);
    },
    actionClick: function () {

        startMenu.play();
        this.state.start('MainMenu');
    }

};