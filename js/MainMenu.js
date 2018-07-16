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

        text.events.onInputDown.add(this.singleplayer, this);


        var text2 = this.add.text(this.game.world.centerX, this.world.centerY+60, "MULTIPLAYER", style);

        text2.anchor.set(0.5);

        text2.inputEnabled = true;

        text2.events.onInputDown.add(this.multiplayer, this);
        

        
        button2 = this.game.add.button(this.game.world.centerX -95, 400, 'settings', this.setting, this );
        button2.scale.setTo(0.4,0.4);
          

        
       
       //
    },
    singleplayer: function() {
        this.state.start('Game');
    },
    multiplayer: function() {

        // TODO SETTARE IL PATH CORRETTO
        // window.location.href = "http://localhost/SP2P/P2P/client.html";
        // window.location.href = "/SP2P/P2P/client.html"; // OK
        // document.write('<iframe src="http://localhost/SP2P/P2P/client.html"></iframe>');
        
        // document.getElementById("connect").display = "hidden";
        // https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp QUESTO QUAA
        // this.state.start('GameMultiplayer');
        // var form_id = "jwdplayer"
        // var lines = `
        // <div id="${form_id}">
        //         PROVAAAAAAAAAAa
        // </div>`
        

        // document.write(lines);
        // document.getElementById(form_id).onclick = function () {   };
        // var form = document.getElementById("ciao");
        // // 
        // var buttonChoice = document.createElement("input");
        // buttonChoice.setAttribute("class", "button");
        // buttonChoice.setAttribute("name", "attributeNameItem");
        // buttonChoice.setAttribute("type", "button");
        // buttonChoice.setAttribute("value", "Choice Peer to Connect");
        // buttonChoice.onclick = function(){
        //     this.state.start('GameMultiplayer');
        // };
        // form.appendChild(buttonChoice);

        // now show again the div for the multiplayer 
        var multipForm = document.getElementById("multiplayer-section");
        multipForm.style.display = "inline-block";

        var divGame = document.getElementById("P2PMaze");
        divGame.style.display = "none";
        // this.state.start('GameMultiplayer');
        console.log(this.state);
        // this div is now visible because in file comunication.js the player has accepted the comunication
        // if (divGame.style.display == "block") {
        //     this.state.start('GameMultiplayer');
        // }else {
        //     alert("NON E NEL BLOCK");
        // }
        
        
        
        
    },
    setting: function() {

        console.log("Adesso spieghimao come si gioca");
    }
};