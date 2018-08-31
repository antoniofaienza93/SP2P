# Peer-To-Peer System
## Second cycle degree in Computer Science <br> University of Bologna - Alma Mater Studiorum <br> A.A. 2017/2018
Antonio Faienza | 
------------ | 
0000798822 | 
antonio.faienza@studio.unibo.it | 

## Objectives
The aim of the project is to test the peer to peer functionalities offerted by PeerJs Library. PeerJS wraps the browser's WebRTC implementation to provide a complete, configurable, and easy-to-use peer-to-peer connection API. 
For this, I have created a new Game. In particular the focus of analysis is the Multiplayer section that use and tests the PeerJs functionality.
If you want try the game [PLAY NOW](https://antoniofaienza93.github.io/SP2P/).

## Run in localhost 
### SetUp
* Clone project 

`git clone https://github.com/antoniofaienza93/SP2P.git`

`cd SP2P`

* Install npm 

`npm install`

* Install Peer Server 

`npm install express --save`

* Install Peer Server 

`npm install peer --save`

* Install Random String

`npm install randomstring --save`

## Change the file

Change this
```javascript
// P2P/PeerServerExpress.js
const PORT = process.env.PORT;

// util/const.js
const PEER_SERVER = {
    ENROLLMENT: "https://project-p2p.herokuapp.com/",
    PEER_AVAILABLES: "https://project-p2p.herokuapp.com/available-peer/",
    POLLING: "https://project-p2p.herokuapp.com/updates/"
    
}

const PEER_CLIENT = {
    HOST: "project-p2p.herokuapp.com",
    PORT: 443,
    PATH: "/peerjs"
}
```
with this:
```javascript
// P2P/PeerServerExpress.js
const PORT = 9000;

// util/const.js
const PEER_SERVER = {
    ENROLLMENT: "http://localhost:9000",
    PEER_AVAILABLES: "http://localhost:9000/available-peer/",
    POLLING: "http://localhost:9000/updates/"
    
}


const PEER_CLIENT = {
    HOST: "localhost",
    PORT: 9000,
    PATH: "/peerjs"
}
```

## Run the Local Server
* `cd P2P`

* `node PeerServerExpress.js`

