/*
 * ===========================================================================
 * File: Const.js 
 * Author: Antonio Faienza
 * Desc: This scritp is module that define the constant that can be called 
 * from other file 
 * https://stackoverflow.com/questions/130396/are-there-constants-in-javascript 
 * ===========================================================================
 */

/**
 * Width and heiht of screen. 
 * This current map has 16x16 - 70 tile x 40 tile = 1120 x 640
 * Default value: 800 x 600
 */
const SCREEN_SIZE = {
    WIDTH: 1120, 
    HEIGHT: 640 
};


/**
 * Constant of the player
 */
const PLAYER = {

    GRAVITY_Y: 300,
    VELOCITY_X_START: 0,
    VELOCITY_Y_START: 0,
    VELOCITY_X_RIGHT: +150,
    VELOCITY_X_LEFT: -150
};

/**
 * Global variable for server. 
 * LOCALHOST: http://localhost:9000
 */
const PEER_SERVER = {
    ENROLLMENT: "https://project-p2p.herokuapp.com/",
    PEER_AVAILABLES: "https://project-p2p.herokuapp.com/available-peer/"    
}

/**
 * Global variable for client
 * 
 * Local: 
 *      HOST: "localhost",
 *      PORT: 9000,
 *      PATH: "/peerjs"
 */
const PEER_CLIENT = {
    HOST: "project-p2p.herokuapp.com",
    PORT: 9000,
    PATH: "/peerjs"
}

/**
 * Message log
 */
const COMMUNICATION = {
   
    PEER_AVAILABILITY: "NO PEER AVAILABLE",
    PEER_SELECTION: "KEEP ATTENTION: NO PEER SELECTED",
    PEER_SELECTED: "WARNING: Select YES or NO if you want (or not) to connect to the peer "
}

/**
 * Message connection
 */
const PEER = {
    CONNECTION_ACCEPTED: "CONNECTION_ACCEPTED",
    CONNECTION_REFUSED: "CONNECTION_REFUSED",
    CONNECTION_CLOSED: "THE CONNECTION WAS NOT ACCEPTED BY THE PEER"
}

/**
 * Game field
 */
const GAME = {
    BACKGROUND_COLOR: "#0c0c0c",
    TITLE: "P2PMaze",
    PLAY: "PLAY",
    MULTIPLAYER: "MULTIPLAYER",
    SETTING: "INSTRUCTIONS",
    LIVES: 'Lives : ',
    GAMEOVER: 'GAME OVER,\nCLICK TO GO TO THE MAIN MENU',
    GAMEWIN: 'CONGRATULATIONS, \n YOU HAVE WON'  
}

/**
 * Path images
 */
const ASSET_PATH = {
    PATH_ITEM_16x16: 'assets/images/item_16x16/',
    ITEM_16x16: '_16x16.png',

    PATH_ITEM_32x32: 'assets/images/item_32x32/',
    ITEM_32x32: '_32x32.png',

    PATH_ITEM_48x48: 'assets/images/item_48x48/',
    ITEM_48x48: '_48x48.png',
}

/**
 * Form field
 */
const FORM = {
    CHOICE_PEER: "CHOICE PEER TO CONNECT",
    FILL: "PLEASE, INSERT ID",
    MESSAGE_SEND: "WE SEND MESSAGE TO",
    SEE_PEER_AVAILABLE: "SEE PEER AVAILABLE"
}