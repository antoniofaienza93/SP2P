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
P2PMaze.MainMenu = function(){
    console.log("%cStarting MainMenu", "color:white; background:grey");
};

P2PMaze.MainMenu.prototype = {
    preload: function() {
        // Provare a caricare Texture Atlas
    }, 
    create: function() {

        // https://phaser.io/examples/v2/text/text-events
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
        
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "PLAY", style);

        text.anchor.set(0.5);

        text.inputEnabled = true;

        text.events.onInputDown.add(this.over, this);


        var text2 = this.add.text(this.game.world.centerX, this.world.centerY+60, "MULTIPLAYER", style);

        text2.anchor.set(0.5);

        text2.inputEnabled = true;

        text2.events.onInputDown.add(this.over2, this);
        

        
        button2 = this.game.add.button(this.game.world.centerX -95, 400, 'settings', this.actionClickk, this );
        button2.scale.setTo(0.4,0.4);
          

        
       
       //
    },
    over: function() {
        console.log("Adesso iniziamo a giocare");
        this.state.start('Game');
    },
    over2: function() {
        console.log("Adesso iniziamo a giocare MULTIPLAYER ");
    },
    actionClickk: function() {

        console.log("Adesso spieghimao come si gioca");
    }
};