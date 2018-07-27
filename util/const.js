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
  * Background color
  */


/**
 * Width and heiht of screen 
 */
const SCREEN_SIZE = {
    WIDTH: 800, // 800
    HEIGHT: 600 // 600
};

// /**
//  * Constant of the player 
//  */
const PLAYER = {

    GRAVITY_Y: 300,
    VELOCITY_X_START: 0,
    VELOCITY_Y_START: 0,
    VELOCITY_X_RIGHT: +150,
    VELOCITY_X_LEFT: -150
};

/**
 * Global variable for server
 */
const PEER_SERVER = {
    ENROLLMENT: "http://localhost:9000",
    PEER_AVAILABLES: "http://localhost:9000/available-peer/"
    
}

/**
 * Global variable for client
 */
const PEER_CLIENT = {
    HOST: "localhost",
    PORT: 9000,
    PATH: "/peerjs"
}

/**
 * Message log
 */
const COMMUNICATION = {
    PEER_AVAILABILITY: "NO PEER AVAILABLE",
    PEER_SELECTION: "KEEP ATTENTION: NO PEER SELECTED",
    PEER_SELECTED: "WARNING: Select YES or NO if you want (or not) to connect of peer "
}

/**
 * Game field
 */
const GAME = {
    BACKGROUND_COLOR: "#0c0c0c",
    TITLE: "P2PMaze",
    PLAY: "PLAY",
    MULTIPLAYER: "MULTIPLAYER"
}

/**
 * Form field
 */
const FORM = {
    CHOICE_PEER: "Choice Peer to Connect"
}