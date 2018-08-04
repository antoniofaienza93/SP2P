/*
 * ===========================================================================
 * File: Game.js - 4 
 * Author: Antonio Faienza
 * Desc: QUESTO Eé SOLO PER PRESERVARE LA COPIA DEL FILE
 * ===========================================================================
 */
var P2PMaze = P2PMaze || {};

// global variable 
var map;
var backgroudLayer;
var blockedLayer;
var player;
var cursor;
var items;
var lives;
var stateText;
var result;

var lastItem;

// sounds
var itemCorrect;
var itemWrong;
var win;
var lose;
var wellDone;

// logical order
var logicalOrder = {};

// the player starts to 1 for compare the item to take 
var playerOrder = 1;





P2PMaze.Game = function () {
    console.log("%cStarting Game", "color:black; background:yellow");
};

P2PMaze.Game.prototype = {
    preload: function () {
        // TODO da togliere il preload che qui non dovrebbe servire 
        this.game.load.tilemap('temp', 'assets/tilemaps/temp.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tempImage', 'assets/images/tiles.png');
        this.game.load.image('heart', 'assets/images/heart.png');

        // TODO CANCELLARE - vedere la grandezza dell'immagine        
        // 37x45 is the size of each frame
        //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
        //  blank frames at the end, so we tell the loader how many to load
        this.load.spritesheet('player', 'assets/images/dude.png', 32, 48);        // Quello che vorrei usare 
        // this.load.image('player', 'assets/images/player.png'); // Personaggio singolo importato da Tiled
        // this.load.image('player', 'assets/images/phaser-dude.png'); // Personaggio singolo 

        // TODO carichiamo le immagini
        this.load.image('redcup', 'assets/images/estintore_piccolo.png');
        this.load.image('greycup', 'assets/images/greencup.png');
        this.load.image('bluecup', 'assets/images/bluecup.png');

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
    },
    create: function () {

        //  We're going to be using physics, so enable the Arcade Physics system
        // TODO - mettere questo nel Boot
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        map = this.game.add.tilemap('temp');

        map.addTilesetImage('tiles', 'tempImage');

        // create the layer 
        backgroudLayer = map.createLayer('backgroudLayer');
        blockedLayer = map.createLayer('blockedLayer');

        // TODO verificare per la nuova mappa che ciò avvenga

        // The number between 1 and 2000 is an index range for the tiles for which we want to enable
        // collision (in this case such a big number should include them all which is what I intended).
        // In order to obtain this number open file.json and in “layers” – “data” of the two layers 
        // find the largest number you can find, in this case 1896 so I put 2000 just to be sure I didn’t 
        // miss a slightly larger number. 
        map.setCollisionBetween(1, 200, true, 'blockedLayer');

        backgroudLayer.resizeWorld();

        this.createLives();

        this.createItems();

        result = this.findObjectsByType('playerStart', map, 'objectLayer');


        // create the player 
        player = this.game.add.sprite(result[0].x, result[0].y, 'player');

        //  Set the scale of the sprite to the random value
        player.scale.setTo(0.6, 0.6);

        // create the phisics body. Can be a single object (as in this case) or of array of Objects
        this.game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = PLAYER.GRAVITY_Y;
        player.body.collideWorldBounds = true;

        // see image: 0, 1, 2, 3 is the frame for runring to left 
        // see image: 5, 6, 7, 8 is the frame for running to right 
        // 10 = frames per second 
        // the 'true' param tell the animation to loop 
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        // TODO deve esse qualcosa nell'update

        //the camera will follow the player in the world
        this.game.camera.follow(player); // TODO forse questo non serve


        // move player with cursor key 
        cursor = this.game.input.keyboard.createCursorKeys();

        //  Text
        stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', { font: '30px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        itemCorrect = this.game.add.audio('itemCorrect');
        itemWrong = this.game.add.audio('itemWrong');
        lose = this.game.add.audio('lose');
        win = this.game.add.audio('win');
        wellDone = this.game.add.audio('wellDone');



    },
    update: function () {

        //  Collide the player and the stars with the platforms


        // collisio to do 
        // https://phaser.io/docs/2.4.4/Phaser.Physics.Arcade.html#collide
        var hitPlatform = this.game.physics.arcade.collide(player, blockedLayer);

        // player movement   
        // NB: comment these to gain less control over the sprite      
        // player.body.velocity.y = 0; // the player cab be jump and for this have to not "resize" to 0 the position
        player.body.velocity.x = PLAYER.VELOCITY_X_START;

        if (this.game.input.activePointer.justPressed()) {
            // move on the direction of the input 
            this.game.physics.arcade.moveToPointer(player, 150);
            // player.animations.play('left');
        }

        // if(cursor.up.isDown) {
        //     player.body.velocity.y = -50;            
        // }else if(cursor.down.isDown){
        //     player.body.velocity.y = +50;
        // }else
        if (cursor.left.isDown) {
            player.body.velocity.x = PLAYER.VELOCITY_X_LEFT;
            player.animations.play('left');
        } else if (cursor.right.isDown) {
            player.body.velocity.x = PLAYER.VELOCITY_X_RIGHT;
            player.animations.play('right');
        }
        else {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        // if(cursor.up.isDown && player.body.touching.down){
        if (cursor.up.isDown && hitPlatform) {
            player.body.velocity.y = -250;  // TODO se si vuole aumentare l'altezza vedere esempio index9.html         

        }

        // Checks for overlaps between two game objects.
        // - The first object or array of objects to check. 
        // - The second object or array of objects to check.
        // - An optional callback function that is called if the objects overlap. 
        //      The two objects will be passed to this function in the same order in which you specified them, 
        //      unless you are checking Group vs. Sprite, in which case Sprite will always be the first parameter.
        // - A callback function that lets you perform additional checks against the two objects if 
        //     they overlap. If this is set then overlapCallback will only be called if 
        //     this callback returns true
        // - The context in which to run the callbacks.
        // DECOMMENTARE 
        // check overlapping between players and items. If the callback from the fourth param is true then, it will call the thirth param 
        this.game.physics.arcade.overlap(player, items, this.collect, this.choiceItems, this);



    },
    collect: function (player, collectable) {

        // TODO aggiungere il suono 

        console.log("PRESO " + collectable.key);
        // remove sprite
        collectable.destroy();
        if (Object.keys(logicalOrder).length === 0) {
            player.kill();
            win.play();
            wellDone.play();
            this.winParticle();
            stateText.text = GAME.GAMEWIN;
            stateText.visible = true;
            playerOrder = 1;

            //the "click to restart" handler
            this.game.input.onTap.addOnce(this.restart, this);
        }

    },
    // logic game
    choiceItems: function (player, item) {

        // TODO delete
        // BODY ENABLE https://phaser.io/examples/v2/arcade-physics/body-enable
        // console.log(" ORDINE DEL GIOCATORE " + playerOrder);
        // console.log(" liSTA ");
        // console.log(logicalOrder);

        // if exist inside the hashmap a key with the same name of the sprite
        // and the value is equal of playerOrder then return true
        if ((item.key in logicalOrder) && logicalOrder[item.key] === playerOrder) {
            itemCorrect.play();
            playerOrder++;                  // icrease the order of player 
            delete logicalOrder[item.key];  // delete key-value            
            return true;
        } else {
            this.game.physics.arcade.collide(player, items);
            this.decreaseLive();
            return false;
        }


    },
    findObjectsByType: function (type, map, layer) {

        // DEBUG
        // console.log(map);
        // console.log(map.objects);

        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if (element.properties.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust the y position
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact pixel position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });

        return result;
    },
    // createItems: function(){
    //     // create items
    //     this.items = this.game.add.group();

    //     // If true all Sprites created with #create or #createMulitple will have a physics body created on them.
    //     this.items.enableBody = true;
    //     var item; 
    //     result = this.findObjectsByType('item', map, 'objectLayer');

    //     // result = take all element from tileset with specific proprieties
    //     //    |--> element = take a specific result with proprieties etc
    //     result.forEach(function(element){            
    //         this.createFromTiledObject(element, this.items);
    //       }, this);
    // },
    createItems: function () {

        // create items
        items = this.game.add.group();

        // If true all Sprites created with #create or #createMulitple will have a physics body created on them.
        items.enableBody = true;
        // items.physicsBodyType = Phaser.Physics.ARCADE;

        // result = take all element from tileset with 'item' proprieties
        var resultItem = this.findObjectsByType('item', map, 'objectLayer');

        // element = take a specific result with proprieties etc
        resultItem.forEach(function (element) {

            // Creates a new Phaser.Sprite object and adds it to the top of this group.
            // 'x' and 'y' are the coordinates that display the newly created Sprite at.The value is in relation to the group.x/group.y point
            // This is the image or texture used by the Sprite during rendering. 
            // It must matching from proprieties in Tiled and the name of sprite i.e redcup
            var spriteObject = items.create(element.x, element.y, element.properties.sprite);

            // enable for all sprites of object a physical properties
            this.game.physics.arcade.enable(spriteObject);

            // default = each objects are immovable
            spriteObject.body.immovable = true;

            // DEBUG
            //  console.log(element.properties.order + " " + element.properties.sprite);

            // fill the HashMap for the logic of game
            // key = sprite name
            // value = order  
            logicalOrder[element.properties.sprite] = element.properties.order;



            //this.createFromTiledObject(element, items);
        }, this);

    },
    createLives: function () {

        // Lives
        lives = this.game.add.group();
        this.game.add.text(this.game.world.width - 100, 50, GAME.LIVES, { font: '34px Arial', fill: '#fff' });

        // creation Life
        for (var i = 0; i < 3; i++) {
            var heart = lives.create(this.game.world.width - 100 + (40 * i), 100, 'heart');
            heart.anchor.setTo(0.5, 0.5);
            // heart.angle = 90;
            // heart.alpha = 0.4;
        }

    },
    render: function () {

        // ===== DEBUG PLAYER 
        // this.game.debug.body(player);
        // this.game.debug.spriteInfo(player, 32, 32);

        // ===== DEBUG ITEMS
        // this.game.debug.physicsGroup(items);
        // space = 130; 
        // items.forEachAlive(this.renderGroup, this, space);       

    },
    renderGroup: function (member, number) {

        this.game.debug.body(member);
        this.game.debug.spriteInfo(member, 32, number);
        space = number + 130;
    },
    decreaseLive: function () {
        live = lives.getFirstAlive();

        if (live) {
            live.kill();
            this.explodePlayer();
            player.kill();
        }

        // when the player dies
        if (lives.countLiving() < 1) {
            player.kill();

            lose.play();
            stateText.text = GAME.GAMEOVER;
            stateText.visible = true;

            //the "click to restart" handler
            this.game.input.onTap.addOnce(this.restart, this);
        } else {
            itemWrong.play();
            player.reset(result[0].x, result[0].y);
        }
    },
    restart: function () {
        // A new level starts

        // reset the life count 
        // lives.callAll('revive');
        // this.createItems();

        // //revives the player
        // player.revive();
        this.state.start('MainMenu');

        //hides the text
        stateText.visible = false;

    },
    explodePlayer: function () {
        //make the player explode
        var emitter = this.game.add.emitter(player.x, player.y, 100);
        emitter.makeParticles('playerParticle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
        emitter.start(true, 1000, null, 100);
    },
    winParticle: function () {
        // https://phaser.io/examples/v2/particles/random-sprite
        var emitter = this.game.add.emitter(this.game.world.centerX, 400, 200);

        //  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
        emitter.makeParticles(['blacklight', 'bluelight', 'brownlight',
                                'greenlight', 'orangelight', 'redlight',
                                'violelight', 'yellowlight', 'star_particle']);

        emitter.start(false, 5000, 20);
    }
    // createFromTiledObject: function(element, group) {

    //     // Creates a new Phaser.Sprite object and adds it to the top of this group.
    //     // 'x' and 'y' are the coordinates that display the newly created Sprite at.The value is in relation to the group.x/group.y point
    //     // This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache Image entry, or other. See documentation for more detail.        
    //     var sprite = group.create(element.x, element.y, element.properties.sprite);

    //     // TODO - Capire perchè stava messo sto codice
    //     //copy all properties to the sprite
    //     // Object.keys(element.properties).forEach(function(key){
    //     //     sprite[key] = element.properties[key];
    //     //     // console.log(" --------------> " + sprite[key]);
    //     // });
    // }
};