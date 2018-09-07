/**
 * ===========================================================================
 * File: PeerServerExpress.js 
 * Author: Antonio Faienza
 * TODO: make deploy: https://zeit.co/now or Heroku 
 * ERROR: https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
 * DEBUG, FROM CONSOLE RUN:  heroku logs -t
 * ===========================================================================
 */
var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var randomstring = require("randomstring");
const PORT = 7000; // process.env.PORT

var options = {
    debug: true
};

var server = require('http').createServer(app);
var peerserver = ExpressPeerServer(server, options);

// At first the peer are @undefined 
var peer_available = [];


// ========================================
// Create Random String and send to client
// ========================================
app.get('/', function (res, res, next) {


    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    r = randomstring.generate(7);
    res.send(r);

    // Pass to next layer of middleware
    next();

});

// the server send to client the peer available (even himself)
app.get('/available-peer', function (req, res, next) {

    //Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Content-Type', 'application/json');


    // console.log(peer_available.toString()); // DEBUG
    res.send(JSON.stringify(peer_available));
    // Pass to next layer of middleware
    next();

});

/**
 * Callback that increase the array of object
 * @param {*} id 
 */
function increasePlayer(id) {
    var user = { 'key': id };
    peer_available.push(user);
    console.log(peer_available); // DEBUG 
}


/**
 * Callback that decrease the array of object
 * @param {*} id 
 */
function decreasePlayer(id) {
    // https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
    var obj = peer_available.find(o => o.key === id);

    if (obj != undefined) {

        // console.log(obj.key); // DEBUG

        var pos = peer_available.findIndex(x => x.key == obj.key);

        // Remove objects from array when user disconnect at specific position
        peer_available.splice(pos, 1);
    }

    // http://expressjs.com/it/guide/error-handling.html
    // .send('Something broke!');
    console.log(peer_available); // DEBUG 
}

app.use('/peerjs', peerserver);

server.listen(PORT, function () {
    // console.log("Example app listening on port 9000");
    console.log("Listening at PORT: " +PORT);
});


/**
 * Connection to the server. It return as callback that increase the 
 * array of objects
 * @param {*} callback 
 */
function connectPeer(callback) {
    // The 'connection' event is emitted when a peer connects to the server.
    peerserver.on('connection', function (id) {
        // console.log("SERVER - ID_User: " + id);
        callback(id);
    });
}

/**
 * Disconnection to the server. It return the callback that decrease the 
 * array of objects
 * @param {*} callback 
 */
function disconnectPeer(callback) {
    // The 'disconnect' event is emitted when a peer disconnects from the server or when the peer can no longer be reached.
    peerserver.on('disconnect', function (id) {
        console.log("Disconnessione utente " + id);
        callback(id);
    });
}



connectPeer(increasePlayer)


disconnectPeer(decreasePlayer);




