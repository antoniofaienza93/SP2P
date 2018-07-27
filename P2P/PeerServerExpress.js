/**
 * ===========================================================================
 * File: PeerServerExpress.js 
 * Author: Antonio Faienza
 * TODO: make deploy: https://zeit.co/now or Heroku 
 * ERROR: https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
 * ===========================================================================
 */
var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var randomstring = require("randomstring")

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
app.get('/', function(res, res, next) { 
	

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
app.get('/available-peer', function(req, res, next) { 	

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

function increasePlayer(id){
    var user ={'key': id};
    peer_available.push(user);
    console.log(peer_available); // DEBUG 
}

function decreasePlayer(id) {
    // https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
    var obj = peer_available.find(o => o.key === id);
    // console.log(obj); // DEBUG

    // Remove objects from array when user disconnect 
    peer_available.splice(obj, 1); 
       
    console.log(peer_available); // DEBUG 
}







app.use('/peerjs', peerserver);

server.listen(9000, function(){
	console.log("Example app listening on port 9000");
});



function addPeerAvailable(callback) {
    // The 'connection' event is emitted when a peer connects to the server.
    peerserver.on('connection', function(id) {    
        // console.log("SERVER - ID_User: " + id);
        callback(id);
    });
}


function disconnectPeer(callback){
    // The 'disconnect' event is emitted when a peer disconnects from the server or when the peer can no longer be reached.
    peerserver.on('disconnect', function(id){
        console.log("Disconnessione utente " + id);
        callback(id);
    });
}

addPeerAvailable(increasePlayer)

// TODO fare che quando un peer si disconnette, viene tolto dall'array 
disconnectPeer(decreasePlayer);




