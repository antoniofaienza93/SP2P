    /*
     * ===========================================================================
     * File: Preaload.js - 2 
     * Author: Antonio Faienza
     * Desc: TODO  
     * ===========================================================================
     */

     var P2PMaze = P2PMaze || {};

     P2PMaze.Preload = function(game){
         this.ready = false;
        console.log("%cStarting Preload State", "color:white; background:green");
    };

    
    var button; 
    var logo; 
    var name_project;
    var progress;
    var percentDone = 1;
    P2PMaze.Preload.prototype = {
        // in this function we can load all the asset for the game. 
        preload: function() {

             // TODO - spostare tutto nel Preload 
            

             // settings button
            this.load.spritesheet('settings', 'assets/buttons/settings.png'); 
            this.load.onLoadComplete.add(this.loadComplete, this);

          }, 
          loadComplete: function() {  
            this.ready = true;
        },
          create: function() {

            // LOGO 
            logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY-60, 'logoPhaser');
            logo.scale.setTo(0.4,0.4);
            logo.anchor.setTo(0.5);


            // TITOLO 
            name_project = this.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'desyrel', 'P2PMaze', 64); // default 400  - 270
            name_project.anchor.x = 0.5;

            
            button = this.game.add.button(this.game.world.centerX -95, 400, 'button_play', this.actionClick, this );
            button.scale.setTo(0.3,0.3);
            button.onInputOver.add(this.over, this);
            button.onInputOut.add(this.out, this);
            

            
        }, 
        over: function() {
            button.scale.setTo(0.33,0.33);
        }, 
        out:  function() {
            button.scale.setTo(0.3,0.3);
        },
        actionClick: function(){
            
            this.state.start('MainMenu');
        }

    };