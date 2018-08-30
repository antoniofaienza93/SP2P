/*
 * ===========================================================================
 * File: MainMenu.js - 3 
 * Author: Antonio Faienza
 * Desc: It display the main menu 
 * ===========================================================================
 */
var P2PMaze = P2PMaze || {};
var multiplayer;
var selectMenu;
var choiceSelection;


P2PMaze.MainMenu = function () {
    console.log("%cStarting MainMenu", "color:white; background:grey");
};

P2PMaze.MainMenu.prototype = {
    create: function () {

        // https://phaser.io/examples/v2/text/text-events
        var style = { font: "65px Arial", fill: "#ffff", align: "center" };

        // Single player
        var textSinglePlayer = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, GAME.PLAY, style);
        textSinglePlayer.anchor.set(0.5);
        textSinglePlayer.inputEnabled = true;
        textSinglePlayer.events.onInputOver.add(this.over, this);
        textSinglePlayer.events.onInputOut.add(this.out, this);
        textSinglePlayer.events.onInputDown.add(this.singleplayer, this);


        // MULTIPLAYER
        var textMultiplayer = this.add.text(this.game.world.centerX, this.world.centerY, GAME.MULTIPLAYER, style);
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


        // AUDIO
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
        var multiplayerForm = document.getElementById("multiplayer-form");
        multiplayerForm.style.display = "inline-block";

        // hidden the div game
        var divGame = document.getElementById("P2PMaze");
        divGame.style.display = "none";

    },
    setting: function () {
        choiceSelection.play();
        
        var modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    },
    over: function (item) {
        selectMenu.play();
        item.scale.setTo(1.2);
    },
    out: function (item) {
        item.scale.setTo(1);

    },
};