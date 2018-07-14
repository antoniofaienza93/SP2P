


class PeerClient {   

    constructor(id, h, p, pth){
        this._id = id;
        this._host = h;
        this._port = p;
        this._path = pth;
 
        this._peer = new Peer(this._id, {
            host: this._host, // 'localhost',
            port: this._port, //  9000,
            path: this._path // '/peerjs'
        });

    }

    // ===========
    // Getter
    // ===========
    getId() {
        return this._id;
    }

    getHost() {
        return this._host;
    }

    getPort() {
        return this._port;
    }

    getPath() {
        return this._path
    }

    // ===========
    // Setter
    // ===========
    setId(newId) {
        this._id = newId;
    }

    setHost(newHost){
        this._host = newHost;
    }

    setPort(newPort){
        this._port = newPort
    }

    setPath(newPath) {
        this._path = newPath;
    }

    // ===============================================================================================
    // Open Connection with Server. Viene passato come parametro la callback
    // ===============================================================================================
    openConnection(callback) {
        this._peer.on('open', function(id_peer) {
        // DEBUG  console.log('My peer ID is: ' + id_peer);
          callback(id_peer);        
        });
    }

    
    // ===============
    // CONNECT
    // ===============
    conn(id_another_peer) {
        return this._peer.connect(id_another_peer)
    }

    // ===================================================================================================
    // Sharing data among peer. The first param is the value that return from the previusly method (conn)
    // ===================================================================================================
    sendData(conn, data) {
        conn.on('open', function(){
            // conn.send("ciao, sono il clientA e voglio connettermi con te.. ");
            conn.send(data);
          });
    }
    // ===============
    // RECEIVE.
    // ===============
    enableReceptionData(callback) {
        console.log("Sto iniziando a sentire se qualcuno invia i dati....");
        this._peer.on('connection', function(conn) {
            conn.on('data', function(data){
                console.log(data);
                callback(data);
                
            });
        });
    }


    


}