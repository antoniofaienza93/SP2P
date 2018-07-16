


class PeerClient {   

    constructor(id, h, p, pth){
        this._id = id;
        this._host = h;
        this._port = p;
        this._path = pth;
        this._peerToConnect = undefined;
 
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

    getConnectTo() {
        return this._peerToConnect;
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

    setConnectTo(peerToConnect){
        this._peerToConnect = peerToConnect;
    }

    
    /**
     * Make the peer avilable for the connection 
     */
    openConnection() {
        this._peer.on('open', function(id_peer) {
        // DEBUG  console.log('My peer ID is: ' + id_peer);
        // callback(id_peer);        
        });
    }

    /**
     * Make the peer NOT-avilable for the connection. TODO test it 
     */
    closeConnection(callback) {
        this._peer.on('close', function(id_peer) {
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
        this._peer.on('connection', function(conn) {
            conn.on('data', function(data){
                callback(data);                
            });
        });
    }


    


}