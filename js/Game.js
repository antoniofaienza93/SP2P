/*
 * ===========================================================================
 * File: Game.js - 4 
 * Author: Antonio Faienza
 * Desc: TODO 
 * ===========================================================================
 */
var P2PMaze = P2PMaze || {};

var map;
var backgroudLayer; 
var blockedLayer;
var player;  
var cursor;  



P2PMaze.Game = function(){
    console.log("%cStarting Game", "color:black; background:yellow");
};

P2PMaze.Game.prototype = {
    preload: function() {
        // TODO da togliere il preload che qui non dovrebbe servire 
        this.game.load.tilemap('temp', 'assets/tilemaps/temp.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tempImage', 'assets/images/tiles.png');

        // TODO CANCELLARE - vedere la grandezza dell'immagine        
        // 37x45 is the size of each frame
        //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
        //  blank frames at the end, so we tell the loader how many to load
        this.load.spritesheet('player', 'assets/images/dude.png',32,48);        // Quello che vorrei usare 
        // this.load.image('player', 'assets/images/player.png'); // Personaggio singolo importato da Tiled
        // this.load.image('player', 'assets/images/phaser-dude.png'); // Personaggio singolo 
    }, 
    create: function() {

        //  We're going to be using physics, so enable the Arcade Physics system
        // TODO - mettere questo nel Boot
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

       map = this.game.add.tilemap('temp'); 

       map.addTilesetImage('tiles','tempImage');

       // create the layer 
       backgroudLayer = map.createLayer('backgroudLayer');
       blockedLayer = map.createLayer('blockedLayer');

        // The number between 1 and 2000 is an index range for the tiles for which we want to enable
        // collision (in this case such a big number should include them all which is what I intended).
        // In order to obtain this number open file.json and in “layers” – “data” of the two layers 
        // find the largest number you can find, in this case 1896 so I put 2000 just to be sure I didn’t 
        // miss a slightly larger number. 
       map.setCollisionBetween(1, 200, true, 'blockedLayer'); 

       backgroudLayer.resizeWorld();


       
       var result = this.findObjectsByType('playerStart', map, 'objectLayer');


       // create the player 
       player = this.game.add.sprite(result[0].x, result[0].y, 'player');

       // create the phisics body. Can be a single object (as in this case) or of array of Objects
       this.game.physics.arcade.enable(player);

       //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

       // see image: 0, 1, 2, 3 is the frame for runring to left 
       // see image: 5, 6, 7, 8 is the frame for running to right 
       // 10 = frames per second 
       // the 'true' param tell the animation to loop 
       player.animations.add('left', [0, 1, 2, 3], 10, true);
       player.animations.add('right', [5, 6, 7, 8], 10, true);

       // TODO deve esse qualcosa nell'update
       
       
       

       //the camera will follow the player in the world
       this.game.camera.follow(player);


       // move player with cursor key 
       cursor = this.game.input.keyboard.createCursorKeys();
                
       



       
       
    },
    findObjectsByType: function(type, map, layer){

        // DEBUG
        // console.log(map);
        // console.log(map.objects);

        var result = new Array();
        map.objects[layer].forEach(function(element){
                if(element.properties.type === type ){
                    //Phaser uses top left, Tiled bottom left so we have to adjust the y position
                    //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                    //so they might not be placed in the exact pixel position as in Tiled
                    element.y -= map.tileHeight;
                    result.push(element);
                }
        });

        return result;
    }, 
    update: function(){

        //  Collide the player and the stars with the platforms
         

        // collisio to do 
        // https://phaser.io/docs/2.4.4/Phaser.Physics.Arcade.html#collide
        var hitPlatform = this.game.physics.arcade.collide(player, blockedLayer);

        // player movement   
        // NB: comment these to gain less control over the sprite      
        // player.body.velocity.y = 0; // the player cab be jump and for this have to not "resize" to 0 the position
        player.body.velocity.x = 0;

        // if(cursor.up.isDown) {
        //     player.body.velocity.y = -50;            
        // }else if(cursor.down.isDown){
        //     player.body.velocity.y = +50;
        // }else
         if(cursor.left.isDown){
            player.body.velocity.x = -150;
            player.animations.play('left');
        }else if(cursor.right.isDown){
            player.body.velocity.x = +150;
            player.animations.play('right');
        }
        else{
            //  Stand still
            player.animations.stop();    
            player.frame = 4;
        }

        // if(cursor.up.isDown && player.body.touching.down){
        if(cursor.up.isDown && hitPlatform){
            console.log("VEDIAMO SE SALTA");
            player.body.velocity.y = -250;           
        }
        
    }
};