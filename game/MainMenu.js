/*
 * ===========================================================================
 * File: MainMenu.js - 3 
 * Author: Antonio Faienza
 * Desc: TODO 
 * ===========================================================================
 */
var P2PMaze = P2PMaze || {};
var multiplayer;
var button2;
var selectMenu;
var choiceSelection; 

P2PMaze.MainMenu = function () {
    console.log("%cStarting MainMenu", "color:white; background:grey");
};

P2PMaze.MainMenu.prototype = {
    preload: function () {
        // Provare a caricare Texture Atlas

    },
    create: function () {

        // TITLE 
        // name_project = this.add.bitmapText(this.game.world.centerX, this.game.world.centerY-300, 'desyrel', GAME.TITLE, 64); // default 400  - 270
        // name_project.anchor.x = 0.5;

        // https://phaser.io/examples/v2/text/text-events
        var style = { font: "65px Arial", fill: "#ffff", align: "center" };

        // Single player
        var textSinglePlayer = this.game.add.text(this.game.world.centerX, this.game.world.centerY-100, GAME.PLAY, style);
        textSinglePlayer.anchor.set(0.5);
        textSinglePlayer.inputEnabled = true;
        textSinglePlayer.events.onInputOver.add(this.over, this);
        textSinglePlayer.events.onInputOut.add(this.out, this);
        textSinglePlayer.events.onInputDown.add(this.singleplayer, this);


        // MULTIPLAYER
        var textMultiplayer = this.add.text(this.game.world.centerX, this.world.centerY , GAME.MULTIPLAYER, style);
        textMultiplayer.anchor.set(0.5);
        textMultiplayer.inputEnabled = true;
        textMultiplayer.events.onInputOver.add(this.over, this);
        textMultiplayer.events.onInputOut.add(this.out, this);
        textMultiplayer.events.onInputDown.add(this.multiplayer, this);


        // SETTING
        var setting = this.add.text(this.game.world.centerX, this.world.centerY + 100, GAME.SETTING, style);
        setting.anchor.set(0.5);
        setting.inputEnabled = true;
        setting.events.onInputOver.add(this.over, this);
        setting.events.onInputOut.add(this.out, this);
        setting.events.onInputDown.add(this.setting, this);

        selectMenu = this.game.add.audio('selectMenu'); 
        choiceSelection = this.game.add.audio('choiceSelection'); 
    },
    singleplayer: function () {
        choiceSelection.play();
        this.state.start('Game');
    },
    multiplayer: function () {

        choiceSelection.play();

        // now show again the div for the multiplayer 
        var multiplayerForm = document.getElementById("multiplayer-section");
        multiplayerForm.style.display = "inline-block";

        // hidden the div game
        var divGame = document.getElementById("P2PMaze");
        divGame.style.display = "none";

    },
    setting: function () {
        choiceSelection.play();
        console.log("Adesso spieghimao come si gioca");
        // https://phasergames.com/adding-message-box-phaser-games/
    },
    over: function (item) {
        selectMenu.play();
        item.scale.setTo(1.2);
    },
    out: function (item) {
        item.scale.setTo(1);
        
    },
};