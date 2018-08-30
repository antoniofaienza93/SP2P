/*
 * ===========================================================================
 * File: GameMultiplayer.js - 4 
 * Author: Antonio Faienza
 * Desc: TODO https://github.com/sugendran/webrtc-tanks/blob/master/js/game.js
 * http://www.html5gamedevs.com/topic/24887-sprite-moving-using-input-coordinates/ 
 * ===========================================================================
 */
var P2PMaze = P2PMaze || {};

// global variable 
var map;
var backgroudLayer;
var blockedLayer;
var player;
var opponentPlayer;
var toOpponentPlayer = [];
var cursor;
var items;
var lives;
var stateText;
var result;
var lastItem;
var dataReceived;
var resultItem;
var movementPlayer = true;

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

// add message box item
var msgBox;

P2PMaze.send = function (data) {
    P2PMaze.peer.send(data);
    // console.log("INVIO " + data + " DA " + P2PMaze.peer.getId() + " A " + P2PMaze.peer.getConnection().peer);
};

P2PMaze.GameMultiplayer = function () {
    console.log("%cStarting Game", "color:black; background:yellow");
};

P2PMaze.GameMultiplayer.prototype = {
    create: function () {

        //  We're going to be using physics, so enable the Arcade Physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        map = this.game.add.tilemap('maze');

        map.addTilesetImage('tiles', 'mazeImage');

        // create the layer 
        backgroudLayer = map.createLayer('backgroudLayer');
        blockedLayer = map.createLayer('blockedLayer');

        // The number between 1 and 2000 is an index range for the tiles for which we want to enable
        // collision (in this case such a big number should include them all which is what I intended).
        // In order to obtain this number open file.json and in “layers” – “data” of the two layers 
        // find the largest number you can find, in this case 3050 so I put 3500 just to be sure I didn’t 
        // miss a slightly larger number. 
        map.setCollisionBetween(1, 3500, true, 'blockedLayer');

        backgroudLayer.resizeWorld();

        this.createLives();

        this.createItems();

        result = this.findObjectsByType('playerStart', map, 'objectLayer');


        // create the player 
        player = this.game.add.sprite(result[0].x, result[0].y, 'player');
        opponentPlayer = this.game.add.sprite(result[0].x + 20, result[0].y, 'opponentPlayer');
        player.frame = 4;
        opponentPlayer.frame = 4;

        player.scale.setTo(0.65, 0.65);
        opponentPlayer.scale.setTo(0.65, 0.65);

        var stylePlayer = { font: "20px Arial", fill: "#ffffff" };
        var label_player = this.game.add.text(-10, -20, P2PMaze.peer._id, stylePlayer);
        player.addChild(label_player);

        var styleOpponentPlayer = { font: "20px Arial", fill: "#ffffff" };
        var label_opponentPlayer = this.game.add.text(-10, -20, P2PMaze.peer._conn.peer, styleOpponentPlayer);
        opponentPlayer.addChild(label_opponentPlayer);

        // player.tint = 0xff00ff; http://www.html5gamedevs.com/topic/6072-change-sprite-color/ CAMBIARE COLORE

        // create the phisics body. Can be a single object (as in this case) or of array of Objects
        this.game.physics.arcade.enable(player);
        this.game.physics.arcade.enable(opponentPlayer);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = PLAYER.GRAVITY_Y;
        player.body.collideWorldBounds = true;

        opponentPlayer.body.bounce.y = 0.2;
        opponentPlayer.body.gravity.y = PLAYER.GRAVITY_Y;
        opponentPlayer.body.collideWorldBounds = true;


        // see image: 0, 1, 2, 3 is the frame for runring to left 
        // see image: 5, 6, 7, 8 is the frame for running to right 
        // 10 = frames per second 
        // the 'true' param tell the animation to loop 
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        opponentPlayer.animations.add('left', [0, 1, 2, 3], 10, true);
        opponentPlayer.animations.add('right', [5, 6, 7, 8], 10, true);

        //the camera will follow the player in the world
        this.game.camera.follow(player);

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

        P2PMaze.peer.enableReceptionData((value) => dataReceived = value);

    },
    update: function () {

        var hitPlatform = this.game.physics.arcade.collide(player, blockedLayer);
        this.game.physics.arcade.collide(opponentPlayer, blockedLayer);


        // player movement   
        // NB: comment these to gain less control over the sprite      
        // the player cab be jump and for this have to not "resize" to 0 the position
        player.body.velocity.x = PLAYER.VELOCITY_X_START;
        opponentPlayer.body.velocity.x = PLAYER.VELOCITY_X_START;

        if (this.game.input.activePointer.justPressed()) {
            // move on the direction of the input 
            this.game.physics.arcade.moveToPointer(player, 150);
            // player.animations.play('left');
        }


        if (cursor.left.isDown && movementPlayer) {
            player.body.velocity.x = PLAYER.VELOCITY_X_LEFT;
            player.animations.play('left');

            // send to opponent player the left position of player
            var updatePos = [];
            var keyupdating = { "key": "left" };
            var updateX = { "updatePosx": player.x };
            var updateY = { "updatePosy": player.y };
            updatePos.push(keyupdating);
            updatePos.push(updateX);
            updatePos.push(updateY);
            P2PMaze.send(updatePos);



        } else if (cursor.right.isDown && movementPlayer) {
            player.body.velocity.x = PLAYER.VELOCITY_X_RIGHT;
            player.animations.play('right');

            // send to opponent player the right position of player
            var updatePos = [];
            var keyupdating = { "key": "right" };
            var updateX = { "updatePosx": player.x };
            var updateY = { "updatePosy": player.y };
            updatePos.push(keyupdating);
            updatePos.push(updateX);
            updatePos.push(updateY);
            P2PMaze.send(updatePos);


        }
        else {
            player.animations.stop();
            player.frame = 4;
        }

        if (cursor.up.isDown && hitPlatform) {
            player.body.velocity.y = -250;
            // send Jump Movement
            var jump = [];
            var keyjump = { "key": "jump" };
            jump.push(keyjump);
            P2PMaze.send(jump);
        }

        // We check if the opponent player is disconnected
        if(P2PMaze.playerDisconnected != "" && P2PMaze.playerDisconnected==P2PMaze.peer._conn.peer) {
            console.log("Player disconnected: " + P2PMaze.playerDisconnected + " " + P2PMaze.peer._conn.peer);
            opponentPlayer.kill();
            document.getElementById("chatbox").style.display = "none";
            P2PMaze.alertMessage("THE PLAYER " + P2PMaze.peer._conn.peer + " HAS DISCONNECTED...", "warning")
            P2PMaze.playerDisconnected = "";
        }

        if (P2PMaze.dataReceived != undefined) {
            if (P2PMaze.dataReceived[0].key == "right") {
                var posx = P2PMaze.dataReceived[1].updatePosx;
                var posy = P2PMaze.dataReceived[2].updatePosy;

                if (Math.floor(opponentPlayer.x) === Math.floor(posx) ||
                    Math.floor(opponentPlayer.x) === (Math.floor(posx) + 1) ||
                    Math.floor(opponentPlayer.x) === (Math.floor(posx) - 1)) {
                    opponentPlayer.animations.stop();
                    opponentPlayer.frame = 4;
                    // P2PMaze.dataReceived = undefined;
                }
                else {
                    this.game.physics.arcade.moveToXY(opponentPlayer, Math.floor(posx), Math.floor(posy), 100);
                    opponentPlayer.animations.play('right');
                }


            }
            else if (P2PMaze.dataReceived[0].key == "left") {
                var posx = P2PMaze.dataReceived[1].updatePosx;
                var posy = P2PMaze.dataReceived[2].updatePosy;



                if (Math.floor(opponentPlayer.x) === Math.floor(posx) ||
                    Math.floor(opponentPlayer.x) === (Math.floor(posx) + 1) ||
                    Math.floor(opponentPlayer.x) === (Math.floor(posx) - 1)) {
                    opponentPlayer.animations.stop();
                    opponentPlayer.frame = 4;
                    // P2PMaze.dataReceived = undefined;
                }
                else {
                    this.game.physics.arcade.moveToXY(opponentPlayer, Math.floor(posx), Math.floor(posy), 100);
                    opponentPlayer.animations.play('left');
                }

            }
            else if (P2PMaze.dataReceived[0].key == "jump") {
                opponentPlayer.frame = 4;
                opponentPlayer.body.velocity.y = -250;
                P2PMaze.dataReceived = undefined;
            }

        }

        // this if is used for correct the precion error of movement of opponent player
        // if () 
        {

            this.game.time.events.add(4000, function () {
                if (P2PMaze.dataReceived != undefined && opponentPlayer.animations.currentAnim.isPlaying === true) {
                    console.log(dataReceived)
                    var posx = P2PMaze.dataReceived[1].updatePosx;
                    var posy = P2PMaze.dataReceived[2].updatePosy;
                    opponentPlayer.kill();
                    opponentPlayer.reset(posx, posy);
                    opponentPlayer.animations.stop();
                    opponentPlayer.frame = 4;
                    P2PMaze.dataReceived = undefined;
                }

            }, this);
        }

        // information life
        if (P2PMaze.dataReceived != undefined && P2PMaze.dataReceived[0].key == "DECREASE_LIFE") {
            // this.explodePlayer(opponentPlayer);
            console.log("decrease life");
            live = lives.getFirstAlive();
            live.kill();
            opponentPlayer.kill();
            opponentPlayer.reset(result[0].x + 20, result[0].y);
            P2PMaze.dataReceived = undefined;


        }
        // died game
        if (P2PMaze.dataReceived != undefined && P2PMaze.dataReceived[0].key == "GAME_OVER") {
            console.log("GameOver");
            live = lives.getFirstAlive();
            live.kill();
            opponentPlayer.kill()
            player.kill();
            lose.play();
            stateText.text = GAME.GAMEOVER;
            stateText.visible = true;

            //the "click to restart" handler
            this.game.input.onTap.addOnce(this.restart, this);
            P2PMaze.dataReceived = undefined;


        }

        // information items
        if (P2PMaze.dataReceived != undefined && P2PMaze.dataReceived[0].key == "ITEM_TAKEN") {
            var colKey = P2PMaze.dataReceived[1].item;
            var o = P2PMaze.dataReceived[2].order;
            var log = P2PMaze.dataReceived[3].logicalOrder;

            P2PMaze.itemTaken(ASSET_PATH.PATH_ITEM_48x48 + colKey + ASSET_PATH.ITEM_48x48, colKey);
            var cToDelete = this.findCollectableToDelete(colKey);

            // set the player Order and logicalOrder
            playerOrder = o;
            logicalOrder = log;

            if (cToDelete != null) {
                cToDelete.destroy();
            }

            P2PMaze.dataReceived = undefined;


        }

        // when one of two player win
        if (P2PMaze.dataReceived != undefined && P2PMaze.dataReceived[0].key == "WIN_GAME") {
            player.kill();
            opponentPlayer.kill();

            win.play();
            wellDone.play();
            this.winParticle();
            stateText.text = GAME.GAMEWIN;
            stateText.visible = true;

            //the "click to restart" handler
            this.game.input.onTap.addOnce(this.restart, this);
            P2PMaze.dataReceived = undefined;

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
        this.game.physics.arcade.overlap(opponentPlayer, items, this.collect, this.choiceItems, this);



    },
    findCollectableToDelete: function (e) {
        // we searc from array the correct items
        var obj = resultItem.find(o => o.properties.sprite === e);

        // we search the Sprite from the Sprite Group
        var sprite = P2PMaze.getBykey(items, obj.properties.sprite);

        return sprite;
    },
    collect: function (player, collectable) {

        console.log("TAKE " + collectable.key);

        P2PMaze.itemTaken(ASSET_PATH.PATH_ITEM_48x48 + collectable.key + ASSET_PATH.ITEM_48x48, collectable.key);

        // remove sprite
        collectable.destroy();

        // send the item taken
        var iTaken = [];
        var keyupdating = { "key": "ITEM_TAKEN" };
        var i = { "item": collectable.key };
        var o = { "order": playerOrder };
        var l = { "logicalOrder": logicalOrder };
        iTaken.push(keyupdating);
        iTaken.push(i);
        iTaken.push(o);
        iTaken.push(l);
        P2PMaze.send(iTaken);

        // we don't want move the player for avoid bug for 1 seconds
        movementPlayer = false;
        this.game.time.events.add(1500, function () {
            console.log("START MOVEMENT NOW");               
            movementPlayer = true;
        }, this);

        // if size of objects are 0 then all items are keep
        if (Object.keys(logicalOrder).length === 0) {
            player.kill();
            opponentPlayer.kill();

            win.play();
            wellDone.play();
            this.winParticle();
            stateText.text = GAME.GAMEWIN;
            stateText.visible = true;

            //the "click to restart" handler
            this.game.input.onTap.addOnce(this.restart, this);

            // send the Win Game
            var iTaken = [];
            var keyupdating = { "key": "WIN_GAME" };
            iTaken.push(keyupdating);
            P2PMaze.send(iTaken);
            
            // we don't want move the player for avoid bug for 1 seconds
            movementPlayer = false;
        }

    },
    // logic game
    choiceItems: function (player, item) {

        // ======================== DEBUG ===============================
        // console.log(" ORDINE DEL GIOCATORE " + playerOrder);
        // console.log(" liSTA ");
        // console.log(logicalOrder);
        // ==============================================================

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

        // ======================== DEBUG ===============================
        // console.log(map);
        // console.log(map.objects);
        // ==============================================================

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
    createItems: function () {

        // create items
        items = this.game.add.group();

        // If true all Sprites created with #create or #createMulitple will have a physics body created on them.
        items.enableBody = true;
        // items.physicsBodyType = Phaser.Physics.ARCADE;

        // result = take all element from tileset with 'item' proprieties
        resultItem = this.findObjectsByType('item', map, 'objectLayer');

        // element = take a specific result with proprieties etc
        resultItem.forEach(function (element) {

            // Creates a new Phaser.Sprite object and adds it to the top of this group.
            // 'x' and 'y' are the coordinates that display the newly created Sprite at.The value is in relation to the group.x/group.y point
            // This is the image or texture used by the Sprite during rendering. 
            // It must matching from proprieties in Tiled and the name of sprite i.e redcup
            var spriteObject = items.create(element.x, element.y, element.properties.sprite);

            spriteObject.scale.setTo(0.5);
            // enable for all sprites of object a physical properties
            this.game.physics.arcade.enable(spriteObject);

            // we increase the dimesion of sprite.
            // REF: http://www.html5gamedevs.com/topic/5171-checking-if-mouse-is-over-a-sprite-hover/
            spriteObject.inputEnabled = true;
            spriteObject.events.onInputOver.add(this.over, this);
            spriteObject.events.onInputOut.add(this.out, this);

            // default = each objects are immovable
            spriteObject.body.immovable = true;

            //  console.log(element.properties.order + " " + element.properties.sprite);

            /*
             * fill the HashMap for the logic of game
             * key = sprite name
             * value = order
            */
            logicalOrder[element.properties.sprite] = element.properties.order;

        }, this);

    },
    createLives: function () {

        // Lives
        lives = this.game.add.group();
        this.game.add.text(this.game.world.width - 220, 5, GAME.LIVES, { font: '34px Arial', fill: '#fff' });

        // creation Life
        for (var i = 0; i < 3; i++) {
            var heart = lives.create(this.game.world.width - 100 + (40 * i), 25, 'heart');
            heart.anchor.setTo(0.5, 0.5);
            // heart.angle = 90;
            // heart.alpha = 0.4;
        }

    },
    render: function () {

        // ================== DEBUG PLAYER ==================
        // this.game.debug.body(player);
        // this.game.debug.spriteInfo(player, 32, 32);
        // ==================================================

        // ================== DEBUG ITEMS ==================
        // this.game.debug.physicsGroup(items);
        // space = 130; 
        // items.forEachAlive(this.renderGroup, this, space);
        // ==================================================       

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
            this.explodePlayer(player);
            player.kill();
        }

        // when the player dies
        if (lives.countLiving() < 1) {
            player.kill();
            opponentPlayer.kill();
            lose.play();
            stateText.text = GAME.GAMEOVER;
            stateText.visible = true;

            //the "click to restart" handler
            this.game.input.onTap.addOnce(this.restart, this);

            // communicate to opponent player the died of player
            var died = [];
            var key = { "key": "GAME_OVER" };
            died.push(key);
            P2PMaze.send(died);

            movementPlayer = false;

        } else {
            itemWrong.play();
            player.reset(result[0].x, result[0].y);

            // communicate to opponent player the died of player
            var died = [];
            var key = { "key": "DECREASE_LIFE" };
            died.push(key);
            P2PMaze.send(died);

            // we don't want move the player for avoid bug for 1 seconds
            movementPlayer = false;
            this.game.time.events.add(1500, function () {
                console.log("START MOVEMENT NOW");               
                movementPlayer = true;
            }, this);


        }
    },
    restart: function () {
        playerOrder = 1;
        P2PMaze.clearItemDiv();

        //hides the text
        stateText.visible = false;

        // refresh
        location.reload();

    },
    explodePlayer: function (player) {
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
    },
    over: function (item) {
        item.scale.setTo(1.9);
        msgBox = this.showMessageBox(item.position.x, item.position.y, item.key);
    },
    out: function (item) {
        item.scale.setTo(0.5);
        if (msgBox != undefined) {
            this.hideBox(msgBox);
        }

    },
    /**
     * 
     * @param {*} x initial pos x 
     * @param {*} y initial pos ys
     * @param {*} text 
     * @param {*} w default value of with
     * @param {*} h default value of height
     */
    showMessageBox(x, y, text, w = 50, h = 20) {
        //just in case the message box already exists destroy it
        if (this.msgBox) {
            this.msgBox.destroy();
        }
        //make a group to hold all the elements
        var msgBox = this.game.add.group();

        // add style 
        var style = { font: "15px Arial", fill: '#ffffff', backgroundColor: 'rgba(205, 166, 10, 0.92)' };
        //make a text field
        var text1 = this.game.add.text(x + 10, y - 20, text, style);

        //set the textfeild to wrap if the text is too long
        text1.wordWrap = true;

        msgBox.add(text1);

        //make a state reference to the messsage box
        this.msgBox = msgBox;

        return this.msgBox;
    },
    hideBox(msgBox) {
        //destroy the box when the button is pressed
        msgBox.destroy();
    }
};