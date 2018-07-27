    /*
     * ===========================================================================
     * File: Preaload.js - 2 
     * Author: Antonio Faienza
     * Desc: https://www.youtube.com/watch?v=Q08CXexdn7c
     *       https://phaser.io/examples/v2/loader/load-events 
     *       http://www.html5gamedevs.com/topic/12168-adding-a-real-time-level-progress-bar/ -- REAL TIME PROGRESS BAR 
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

           
           // this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
           // this.splash.anchor.setTo(0.5);

           // QUESTA E' LA BAR CHE CONSIGLIA PHASER STESSO 
           this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
           this.preloadBar.anchor.setTo(0.5);
       
           this.load.setPreloadSprite(this.preloadBar);
              

           // this.load.spritesheet('maze_button', 'assets/buttons/maze_button.png');
             

            // settings button
           this.load.spritesheet('settings', 'assets/buttons/settings.png'); 
           this.load.onLoadComplete.add(this.loadComplete, this);


         }, 
         loadComplete: function() {  
           this.ready = true;
       },
         create: function() {

           logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY-60, 'logoPhaser');
           logo.scale.setTo(0.4,0.4);
           logo.anchor.setTo(0.5);

           name_project = this.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'desyrel', 'P2PMaze', 64); // default 400  - 270
           name_project.anchor.x = 0.5;

           // http://www.html5gamedevs.com/topic/12168-adding-a-real-time-level-progress-bar/ - PROGRESS BAR 
           progress = this.game.add.graphics(0,0);
           progress.lineStyle(2, '0x000000');
           progress.beginFill('0x000000',1);
           progress.drawRoundedRect(100,500,300,27,10);
           progress.endFill();
           progress.beginFill('0x999999',1) //For drawing progress
           
           // this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
           // this.preloadBar.anchor.setTo(0.5);

           // this.load.setPreloadSprite(this.preloadBar, 0);           

           //show percentage  
           // this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY-30, '0%', {fill: 'white'});  
           // this.progress.anchor.setTo(.5,.5);        

           //   //show progress bar    
           // var progressBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');  
           // progressBar.anchor.setTo(0.5, 0.5);  
           // this.game.load.setPreloadSprite(progressBar);   
           // this.game.load.onFileComplete.add(this.fileComplete, this); 

           // this = P2PMaze
           button = this.game.add.button(this.game.world.centerX -95, 400, 'button_play', this.actionClick, this );
           button.scale.setTo(0.3,0.3);
           button.onInputOver.add(this.over, this);
           button.onInputOut.add(this.out, this);
           

           
       },
       update: function(){
          var percentDone= 0; 
          for(var i = 0; i < 1; i+=0.1){
              console.log("percentuale di incremento" + i);
               percentDone+=0.1;
          }
          progress.drawRoundedRect(101,501,298*percentDone,25,10);
         // progress.clear();
       },
    //    update: function(){
           
    //    }, 
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